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
    def __init__(self, base_url="https://education-portal-dev-1.preview.emergentagent.com"):
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
        
        # Test get single course
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
        
        # Test in order: courses (no auth) -> auth -> dashboard (with auth)
        self.test_courses_endpoints()
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