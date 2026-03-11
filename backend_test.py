#!/usr/bin/env python3
"""
Backend API Tests for Saint-Georges Academy
Tests all authentication, courses, and dashboard endpoints
"""
import requests
import sys
from datetime import datetime
import uuid

class SimpleAPITester:
    def __init__(self, base_url="https://preview-demo-54.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
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

    def run_test(self, name, method, endpoint, expected_status, data=None, auth_required=True):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if auth_required and self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if not success:
                details += f" (Expected {expected_status})"
                if response.text:
                    details += f" - {response.text[:100]}"

            self.log_test(name, success, details)
            return success, response.json() if response.content else {}

        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request failed: {str(e)}")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, {}

    def test_courses_endpoints(self):
        """Test all courses endpoints"""
        print("\n🔍 Testing Courses API...")
        
        # Test get all courses
        success, courses = self.run_test(
            "GET /api/courses - List all courses",
            "GET",
            "api/courses",
            200,
            auth_required=False
        )
        
        if success and isinstance(courses, list):
            print(f"   Found {len(courses)} courses")
            self.log_test("Courses count validation", len(courses) >= 5, f"Expected 5+ courses, got {len(courses)}")
            
            # Check if Edge Computing course exists
            edge_course = None
            for course in courses:
                if course.get('id') == 'edge-computing':
                    edge_course = course
                    break
            
            if edge_course:
                self.log_test("Edge Computing in courses list", True, f"Found: {edge_course.get('title')}")
            else:
                self.log_test("Edge Computing in courses list", False, "Edge Computing course not found")
        
        # Test get Edge Computing course specifically
        success, edge_course = self.run_test(
            "GET /api/courses/edge-computing - Edge Computing course",
            "GET",
            "api/courses/edge-computing",
            200,
            auth_required=False
        )
        
        if success and edge_course.get('id') == 'edge-computing':
            # Validate Edge Computing course data
            validations = [
                (edge_course.get('title') == "Edge Computing for Smart Towns", "Title validation"),
                (edge_course.get('category') == "Infrastructure", "Category validation"),
                (edge_course.get('duration') == "3 months", "Duration validation"),
                (edge_course.get('onlinePrice') == 3000, "Individual price validation"),
                (edge_course.get('groupPrice') == 20000, "Group price validation"),
                ('Stormshield' in str(edge_course.get('description', '')), "Stormshield mention"),
                ('Metković' in str(edge_course.get('description', '')), "Metković mention"),
            ]
            
            for condition, test_name in validations:
                self.log_test(f"Edge Computing {test_name}", condition, f"✓" if condition else "✗")
        
        # Test get single course (existing test)
        success, course = self.run_test(
            "GET /api/courses/ccna1 - Single course",
            "GET", 
            "api/courses/ccna1",
            200,
            auth_required=False
        )
        
        if success and course.get('id') == 'ccna1':
            self.log_test("CCNA1 course structure", True, f"Title: {course.get('title', 'N/A')}")
        
        # Test video product
        success, video_product = self.run_test(
            "GET /api/courses/videos - Video product",
            "GET",
            "api/courses/videos", 
            200,
            auth_required=False
        )
        
        if success and video_product.get('id') == 'videos-75':
            self.log_test("Video product validation", True, f"Price: {video_product.get('price', 'N/A')}€")

    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        print("\n🔍 Testing Authentication API...")
        
        # Test registration with random email
        test_email = f"test_{uuid.uuid4().hex[:8]}@saint-georges.academy"
        register_data = {
            "email": test_email,
            "password": "TestPassword123!",
            "first_name": "Test",
            "last_name": "User",
            "phone": "+33123456789",
            "company": "Test Company"
        }
        
        success, register_response = self.run_test(
            "POST /api/auth/register - Create user",
            "POST",
            "api/auth/register",
            200,
            data=register_data,
            auth_required=False
        )
        
        if success and 'access_token' in register_response:
            self.token = register_response['access_token']
            self.log_test("Registration token received", True, "JWT token obtained")
        
        # Test login with existing test user
        login_data = {
            "email": "test@saint-georges.academy",
            "password": "TestPass123!"
        }
        
        success, login_response = self.run_test(
            "POST /api/auth/login - Login test user",
            "POST",
            "api/auth/login",
            200,
            data=login_data,
            auth_required=False
        )
        
        if success and 'access_token' in login_response:
            self.token = login_response['access_token']
            self.log_test("Test user login", True, f"User: {login_response.get('user', {}).get('first_name', 'Unknown')}")
        
        # Test get current user profile
        success, profile = self.run_test(
            "GET /api/auth/me - Get profile",
            "GET",
            "api/auth/me",
            200
        )
        
        if success and 'email' in profile:
            self.log_test("Profile retrieval", True, f"Email: {profile.get('email', 'N/A')}")

    def test_email_endpoints(self):
        """Test email system endpoints"""
        print("\n📧 Testing Email System API...")
        
        # Test email configuration
        success, config = self.run_test(
            "GET /api/emails/config - Email configuration",
            "GET",
            "api/emails/config",
            200,
            auth_required=False
        )
        
        if success:
            resend_configured = config.get('resend_configured', False)
            sender_email = config.get('sender_email', '')
            admin_emails = config.get('admin_emails', [])
            status = config.get('status', 'unknown')
            
            self.log_test("Email config - Resend API", resend_configured, f"Configured: {resend_configured}")
            self.log_test("Email config - Sender email", bool(sender_email), f"Sender: {sender_email}")
            self.log_test("Email config - Admin emails", len(admin_emails) > 0, f"Admin count: {len(admin_emails)}")
            self.log_test("Email config - Status", status == "ready", f"Status: {status}")
        
        # Test sending test email (to verified account only)
        test_email_data = {
            "recipient_email": "thierrypaul72@gmail.com",  # Verified email
            "student_name": "Test Student",
            "course_name": "CCNA 1 - Introduction to Networks",
            "course_format": "En ligne",
            "session_date": "28 Avril - 25 Mai 2026",
            "amount": 2290.00
        }
        
        success, email_response = self.run_test(
            "POST /api/emails/test - Send test email",
            "POST",
            "api/emails/test",
            200,
            data=test_email_data,
            auth_required=False
        )
        
        if success:
            status = email_response.get('status', 'unknown')
            results = email_response.get('results', {})
            student_result = results.get('student_email', {})
            admin_result = results.get('admin_notification', {})
            
            self.log_test("Test email - Overall status", status == "success", f"Status: {status}")
            self.log_test("Test email - Student email", student_result.get('status') == 'success', f"Student: {student_result.get('status', 'unknown')}")
            self.log_test("Test email - Admin notification", admin_result.get('status') == 'success', f"Admin: {admin_result.get('status', 'unknown')}")

    def test_payment_endpoints(self):
        """Test payment system endpoints"""
        print("\n💳 Testing Payment System API...")
        
        # Test get products
        success, products_response = self.run_test(
            "GET /api/payments/products - Get products",
            "GET",
            "api/payments/products",
            200,
            auth_required=False
        )
        
        if success:
            products = products_response.get('products', [])
            self.log_test("Payment products count", len(products) >= 10, f"Found {len(products)} products")
            
            # Check for CCNA courses
            ccna_products = [p for p in products if 'ccna' in p.get('id', '').lower()]
            self.log_test("CCNA products available", len(ccna_products) >= 3, f"CCNA courses: {len(ccna_products)}")
        
        # Test create checkout session
        checkout_data = {
            "product_id": "ccna1_online",
            "origin_url": "https://preview-demo-54.preview.emergentagent.com",
            "customer_email": "test@saint-georges.academy",
            "customer_name": "Test Student",
            "session_date": "28 Avril - 25 Mai 2026"
        }
        
        success, checkout_response = self.run_test(
            "POST /api/payments/checkout - Create checkout",
            "POST",
            "api/payments/checkout",
            200,
            data=checkout_data,
            auth_required=False
        )
        
        if success:
            session_id = checkout_response.get('session_id', '')
            checkout_url = checkout_response.get('url', '')
            
            self.log_test("Checkout session ID", bool(session_id), f"Session: {session_id[:20]}..." if session_id else "No session ID")
            self.log_test("Checkout URL format", 'stripe' in checkout_url.lower(), f"URL contains Stripe: {'Yes' if 'stripe' in checkout_url.lower() else 'No'}")
            
            # Test get payment status
            if session_id:
                success, status_response = self.run_test(
                    "GET /api/payments/status/{session_id} - Payment status",
                    "GET",
                    f"api/payments/status/{session_id}",
                    200,
                    auth_required=False
                )
                
                if success:
                    payment_status = status_response.get('payment_status', 'unknown')
                    self.log_test("Payment status check", True, f"Status: {payment_status}")

    def test_dashboard_endpoints(self):
        """Test dashboard endpoints"""
        print("\n🔍 Testing Dashboard API...")
        
        if not self.token:
            self.log_test("Dashboard tests skipped", False, "No auth token available")
            return
        
        # Test dashboard summary
        success, summary = self.run_test(
            "GET /api/dashboard/summary - Summary",
            "GET",
            "api/dashboard/summary",
            200
        )
        
        if success:
            user_name = summary.get('user_name', 'Unknown')
            total_courses = summary.get('total_courses', 0)
            self.log_test("Dashboard summary", True, f"User: {user_name}, Courses: {total_courses}")
        
        # Test my courses
        success, courses = self.run_test(
            "GET /api/dashboard/my-courses - My courses",
            "GET",
            "api/dashboard/my-courses", 
            200
        )
        
        if success:
            self.log_test("My courses endpoint", True, f"Found {len(courses)} purchased courses")
        
        # Test video access
        success, video_access = self.run_test(
            "GET /api/dashboard/video-access - Video access",
            "GET",
            "api/dashboard/video-access",
            200
        )
        
        if success:
            has_access = video_access.get('has_access', False)
            self.log_test("Video access status", True, f"Has access: {has_access}")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Saint-Georges Academy API Tests")
        print(f"Testing against: {self.base_url}")
        
        # Test in order: courses (no auth) -> email -> payments -> auth -> dashboard (with auth)
        self.test_courses_endpoints()
        self.test_email_endpoints()
        self.test_payment_endpoints()
        self.test_auth_endpoints()
        self.test_dashboard_endpoints()
        
        # Print summary
        print(f"\n📊 Test Results:")
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
    tester = SimpleAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())