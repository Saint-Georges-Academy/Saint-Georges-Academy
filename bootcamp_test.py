#!/usr/bin/env python3
"""
Backend API Tests for Saint-Georges Academy - Bootcamp Course and Meal Features
Specific tests for the new Extreme CCNA Boot Camp and meal features
"""
import requests
import sys
from datetime import datetime

class BootcampTester:
    def __init__(self, base_url="https://sga-preview.preview.emergentagent.com"):
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

    def test_bootcamp_course(self):
        """Test the new Extreme CCNA Boot Camp course"""
        print("\n🔍 Testing Extreme CCNA Boot Camp Course...")
        
        # Test get all courses and check for bootcamp
        try:
            response = requests.get(f"{self.base_url}/api/courses", timeout=10)
            success = response.status_code == 200
            
            if success:
                courses = response.json()
                self.log_test("GET /api/courses", True, f"Found {len(courses)} courses")
                
                # Check if bootcamp course exists
                bootcamp_course = next((c for c in courses if c['id'] == 'extreme-ccna-bootcamp'), None)
                if bootcamp_course:
                    self.log_test("Extreme CCNA Boot Camp exists", True, f"Title: {bootcamp_course['title']}")
                    
                    # Verify bootcamp course details
                    expected_price = 3990
                    actual_price = bootcamp_course.get('inClassPrice')
                    price_correct = actual_price == expected_price
                    self.log_test("Bootcamp price validation", price_correct, f"Expected: {expected_price}€, Got: {actual_price}€")
                    
                    # Check duration
                    expected_duration = "35 hours"
                    actual_duration = bootcamp_course.get('duration')
                    duration_correct = actual_duration == expected_duration
                    self.log_test("Bootcamp duration validation", duration_correct, f"Expected: {expected_duration}, Got: {actual_duration}")
                    
                    # Check category
                    category_correct = bootcamp_course.get('category') == 'CCNA'
                    self.log_test("Bootcamp category validation", category_correct, f"Category: {bootcamp_course.get('category')}")
                    
                    # Check if it's in-class only (no online price)
                    no_online_price = bootcamp_course.get('onlinePrice') is None
                    self.log_test("Bootcamp is in-class only", no_online_price, f"Online price: {bootcamp_course.get('onlinePrice')}")
                    
                else:
                    self.log_test("Extreme CCNA Boot Camp exists", False, "Bootcamp course not found in courses list")
            else:
                self.log_test("GET /api/courses", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /api/courses", False, f"Error: {str(e)}")
    
    def test_bootcamp_specific_endpoint(self):
        """Test the specific bootcamp endpoint"""
        print("\n🔍 Testing Bootcamp Specific Endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/api/courses/extreme-ccna-bootcamp", timeout=10)
            success = response.status_code == 200
            
            if success:
                bootcamp = response.json()
                self.log_test("GET /api/courses/extreme-ccna-bootcamp", True, f"Status: {response.status_code}")
                
                # Validate key bootcamp features
                features_to_check = [
                    "75 labs pratiques sur Packet Tracer",
                    "Petit-déjeuner continental inclus",
                    "Déjeuner inclus"
                ]
                
                in_class_features = bootcamp.get('inClassFeatures', [])
                for feature in features_to_check:
                    feature_exists = any(feature in f for f in in_class_features)
                    self.log_test(f"Bootcamp feature: {feature[:30]}...", feature_exists, f"Found: {feature_exists}")
                
                # Check objectives mentions intensive training
                objectives = bootcamp.get('objectives', [])
                has_intensive_objective = any('intensif' in obj.lower() for obj in objectives)
                self.log_test("Bootcamp has intensive objectives", has_intensive_objective, f"Objectives count: {len(objectives)}")
                
            else:
                self.log_test("GET /api/courses/extreme-ccna-bootcamp", False, f"Status: {response.status_code} - {response.text[:100]}")
                
        except Exception as e:
            self.log_test("GET /api/courses/extreme-ccna-bootcamp", False, f"Error: {str(e)}")
    
    def test_meal_features_in_courses(self):
        """Test that in-class courses now include meal features"""
        print("\n🔍 Testing Meal Features in In-Class Courses...")
        
        # Courses that should have meal features
        courses_to_check = ['ccna1', 'ccna2', 'ccna3', 'cyberops', 'unreal']
        meal_features = [
            "Petit-déjeuner continental inclus",
            "Déjeuner inclus"
        ]
        
        for course_id in courses_to_check:
            try:
                response = requests.get(f"{self.base_url}/api/courses/{course_id}", timeout=10)
                success = response.status_code == 200
                
                if success:
                    course = response.json()
                    in_class_features = course.get('inClassFeatures', [])
                    
                    if in_class_features:  # Only check if course has in-class option
                        for meal_feature in meal_features:
                            has_meal_feature = any(meal_feature in feature for feature in in_class_features)
                            self.log_test(f"{course_id} has {meal_feature[:20]}...", has_meal_feature, f"In-class features count: {len(in_class_features)}")
                    else:
                        self.log_test(f"{course_id} meal features", False, "No inClassFeatures found")
                else:
                    self.log_test(f"GET /api/courses/{course_id}", False, f"Status: {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"GET /api/courses/{course_id}", False, f"Error: {str(e)}")
    
    def test_stripe_products(self):
        """Test Stripe products include bootcamp"""
        print("\n🔍 Testing Stripe Products...")
        
        try:
            response = requests.get(f"{self.base_url}/api/payments/products", timeout=10)
            success = response.status_code == 200
            
            if success:
                products_data = response.json()
                products = products_data.get('products', [])
                self.log_test("GET /api/payments/products", True, f"Found {len(products)} products")
                
                # Check for bootcamp product
                bootcamp_product = next((p for p in products if p['id'] == 'extreme-ccna-bootcamp_inclass'), None)
                if bootcamp_product:
                    self.log_test("Bootcamp Stripe product exists", True, f"Name: {bootcamp_product['name']}")
                    
                    # Verify price matches
                    expected_amount = 3990.0
                    actual_amount = bootcamp_product.get('amount')
                    price_correct = actual_amount == expected_amount
                    self.log_test("Bootcamp Stripe price", price_correct, f"Expected: {expected_amount}€, Got: {actual_amount}€")
                else:
                    self.log_test("Bootcamp Stripe product exists", False, "extreme-ccna-bootcamp_inclass not found")
            else:
                self.log_test("GET /api/payments/products", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("GET /api/payments/products", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all bootcamp-specific tests"""
        print("🚀 Starting Saint-Georges Academy Bootcamp Tests")
        print(f"Testing against: {self.base_url}")
        
        self.test_bootcamp_course()
        self.test_bootcamp_specific_endpoint()
        self.test_meal_features_in_courses()
        self.test_stripe_products()
        
        # Print summary
        print(f"\n📊 Bootcamp Test Results:")
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
    tester = BootcampTester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())