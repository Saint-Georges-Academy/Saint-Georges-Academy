import requests
import sys
from datetime import datetime

class CheckoutAPITester:
    def __init__(self, base_url="https://sga-preview-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Status: {response.status_code}")
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed")
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.content:
                    print(f"Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_products_api(self):
        """Test products API"""
        success, response = self.run_test(
            "Products API",
            "GET",
            "payments/products",
            200
        )
        if success and 'products' in response:
            products = response['products']
            print(f"Found {len(products)} products")
            for product in products[:3]:  # Show first 3
                print(f"  - {product['name']}: €{product['amount']}")
            return True
        return False

    def test_checkout_creation(self, product_id, session_date=None):
        """Test checkout session creation"""
        data = {
            "product_id": product_id,
            "origin_url": "https://sga-preview-1.preview.emergentagent.com"
        }
        if session_date:
            data["session_date"] = session_date
            
        success, response = self.run_test(
            f"Checkout Creation ({product_id})",
            "POST",
            "payments/checkout",
            200,
            data=data
        )
        if success and 'url' in response:
            print(f"Checkout URL created: {response['url'][:50]}...")
            return True
        return False

def main():
    print("=== Saint-Georges Academy Checkout API Tests ===")
    tester = CheckoutAPITester()

    # Test 1: Products API
    if not tester.test_products_api():
        print("❌ Products API failed, stopping tests")
        return 1

    # Test 2: Course checkouts that require sessions
    course_tests = [
        ("ccna1_online", "CCNA 1 Online"),
        ("edge-computing_online", "Edge Computing Online"), 
        ("unreal_inclass", "Unreal Engine In-class")
    ]
    
    for product_id, name in course_tests:
        if not tester.test_checkout_creation(product_id, "Test Session April 2026"):
            print(f"❌ {name} checkout failed")

    # Test 3: Videos checkout (no session required)
    if not tester.test_checkout_creation("ccna_videos"):
        print("❌ Videos checkout failed")

    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"Success rate: {success_rate:.1f}%")
    
    return 0 if success_rate >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())