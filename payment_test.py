#!/usr/bin/env python3
"""
Payment API Tests for Saint-Georges Academy
Tests Stripe payment integration
"""
import requests
import sys
from datetime import datetime

class PaymentAPITester:
    def __init__(self, base_url="https://preview-demo-54.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {name}: {details}")

    def test_payment_endpoints(self):
        """Test all payment endpoints"""
        print("\n🔍 Testing Payment API...")
        
        # Test get products
        try:
            response = requests.get(f"{self.base_url}/api/payments/products", timeout=10)
            success = response.status_code == 200
            if success:
                products = response.json().get('products', [])
                self.log_test("GET /api/payments/products", True, f"Found {len(products)} products")
                
                # Check for specific products
                product_ids = [p['id'] for p in products]
                expected_products = ['ccna1_online', 'ccna1_inclass', 'ccna_videos', 'unreal_inclass', 'cyberops_online']
                
                for product_id in expected_products:
                    found = product_id in product_ids
                    self.log_test(f"Product {product_id} exists", found, "✓" if found else "✗")
            else:
                self.log_test("GET /api/payments/products", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /api/payments/products", False, f"Error: {str(e)}")
        
        # Test checkout session creation (without actually completing payment)
        checkout_data = {
            "product_id": "ccna_videos",
            "origin_url": "https://preview-demo-54.preview.emergentagent.com"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/payments/checkout",
                json=checkout_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            if success:
                checkout_response = response.json()
                session_id = checkout_response.get('session_id')
                stripe_url = checkout_response.get('url')
                self.log_test("POST /api/payments/checkout", True, f"Session created: {session_id[:20]}...")
                
                # Validate Stripe URL format
                stripe_url_valid = stripe_url and 'stripe.com/pay/cs_' in stripe_url
                self.log_test("Stripe URL format", stripe_url_valid, "Valid Stripe checkout URL" if stripe_url_valid else "Invalid URL format")
                
            else:
                error_detail = response.text[:100] if response.text else "No details"
                self.log_test("POST /api/payments/checkout", False, f"Status: {response.status_code} - {error_detail}")
                
        except Exception as e:
            self.log_test("POST /api/payments/checkout", False, f"Error: {str(e)}")
        
        # Test invalid product ID
        invalid_checkout_data = {
            "product_id": "invalid_product",
            "origin_url": "https://preview-demo-54.preview.emergentagent.com"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/payments/checkout",
                json=invalid_checkout_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 400  # Should return 400 for invalid product
            self.log_test("Invalid product handling", success, f"Status: {response.status_code} (Expected 400)")
                
        except Exception as e:
            self.log_test("Invalid product handling", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all payment tests"""
        print("🚀 Starting Saint-Georges Academy Payment Tests")
        print(f"Testing against: {self.base_url}")
        
        self.test_payment_endpoints()
        
        # Print summary
        print(f"\n📊 Payment Test Results:")
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        # Print failed tests
        failed_tests = [t for t in self.test_results if not t['success']]
        if failed_tests:
            print(f"\n❌ Failed tests ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"   - {test['name']}: {test['details']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = PaymentAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())