"""
Test suite for World of Haiku page - Quote Request API
Tests the /api/quotes/haiku endpoint for quote submissions
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestWorldOfHaikuQuoteAPI:
    """World of Haiku Quote Request API tests"""
    
    def test_submit_quote_success(self):
        """Test successful quote submission with all required fields"""
        payload = {
            "organisation_name": "TEST_Company GmbH",
            "contact_name": "Hans Schmidt",
            "email": "test@testcompany.de",
            "country": "Germany",
            "organisation_type": "company_medium",
            "estimated_licences": "51-100",
            "intended_use": "employee_training",
            "message": "Automated test submission"
        }
        
        response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
        
        # Status code assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain 'id'"
        assert "status" in data, "Response should contain 'status'"
        assert "message" in data, "Response should contain 'message'"
        assert data["status"] == "success", f"Expected status 'success', got {data['status']}"
        assert isinstance(data["id"], str), "ID should be a string"
        assert len(data["id"]) > 0, "ID should not be empty"
        print(f"Quote submitted successfully with ID: {data['id']}")
    
    def test_submit_quote_without_message(self):
        """Test quote submission without optional message field"""
        payload = {
            "organisation_name": "TEST_School UK",
            "contact_name": "John Smith",
            "email": "john@testschool.uk",
            "country": "United Kingdom",
            "organisation_type": "school",
            "estimated_licences": "101-250",
            "intended_use": "curriculum"
        }
        
        response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
        
        # Status code assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Data assertions
        data = response.json()
        assert data["status"] == "success"
        assert "id" in data
        print(f"Quote without message submitted successfully with ID: {data['id']}")
    
    def test_submit_quote_missing_required_field(self):
        """Test quote submission with missing required field (email)"""
        payload = {
            "organisation_name": "TEST_Missing Email Corp",
            "contact_name": "Test User",
            # email is missing
            "country": "France",
            "organisation_type": "company_small",
            "estimated_licences": "1-10",
            "intended_use": "onboarding"
        }
        
        response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
        
        # Should return 422 Unprocessable Entity for validation error
        assert response.status_code == 422, f"Expected 422 for missing field, got {response.status_code}"
        print("Validation error returned correctly for missing email")
    
    def test_submit_quote_invalid_email(self):
        """Test quote submission with invalid email format"""
        payload = {
            "organisation_name": "TEST_Invalid Email Corp",
            "contact_name": "Test User",
            "email": "invalid-email-format",  # Invalid email
            "country": "France",
            "organisation_type": "company_small",
            "estimated_licences": "1-10",
            "intended_use": "onboarding"
        }
        
        response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
        
        # Should return 422 for invalid email format
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print("Validation error returned correctly for invalid email format")
    
    def test_submit_quote_empty_organisation_name(self):
        """Test quote submission with empty organisation name"""
        payload = {
            "organisation_name": "",  # Empty string
            "contact_name": "Test User",
            "email": "test@test.com",
            "country": "France",
            "organisation_type": "company_small",
            "estimated_licences": "1-10",
            "intended_use": "onboarding"
        }
        
        response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
        
        # Should return 422 for empty required field
        assert response.status_code == 422, f"Expected 422 for empty org name, got {response.status_code}"
        print("Validation error returned correctly for empty organisation name")
    
    def test_get_quotes_endpoint(self):
        """Test GET endpoint to list all World of Haiku quotes"""
        response = requests.get(f"{BASE_URL}/api/quotes/haiku")
        
        # Status code assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Data assertions
        data = response.json()
        assert "quotes" in data, "Response should contain 'quotes'"
        assert "count" in data, "Response should contain 'count'"
        assert isinstance(data["quotes"], list), "Quotes should be a list"
        assert isinstance(data["count"], int), "Count should be an integer"
        print(f"GET quotes successful - found {data['count']} quotes")
    
    def test_quote_data_persistence(self):
        """Test that submitted quote is actually persisted (Create -> GET verification)"""
        # Step 1: Create a unique quote
        unique_org = f"TEST_Persistence_Check_{os.urandom(4).hex()}"
        payload = {
            "organisation_name": unique_org,
            "contact_name": "Persistence Test",
            "email": "persist@test.com",
            "country": "Italy",
            "organisation_type": "university",
            "estimated_licences": "251-500",
            "intended_use": "professional_development",
            "message": "Testing data persistence"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
        assert create_response.status_code == 200
        
        created_id = create_response.json()["id"]
        
        # Step 2: GET all quotes and verify our submission exists
        get_response = requests.get(f"{BASE_URL}/api/quotes/haiku")
        assert get_response.status_code == 200
        
        quotes = get_response.json()["quotes"]
        
        # Find our created quote
        found_quote = None
        for quote in quotes:
            if quote.get("id") == created_id:
                found_quote = quote
                break
        
        assert found_quote is not None, f"Created quote with ID {created_id} not found in GET response"
        assert found_quote["organisation_name"] == unique_org, "Organisation name mismatch"
        assert found_quote["email"] == "persist@test.com", "Email mismatch"
        assert found_quote["country"] == "Italy", "Country mismatch"
        assert found_quote["status"] == "pending", "Status should be 'pending'"
        print(f"Quote persistence verified successfully for ID: {created_id}")
    
    def test_all_organisation_types(self):
        """Test quote submission with different organisation types"""
        org_types = [
            "company_small",
            "company_medium",
            "company_large",
            "school",
            "university",
            "training_centre",
            "public_sector",
            "other"
        ]
        
        for org_type in org_types:
            payload = {
                "organisation_name": f"TEST_{org_type}_Org",
                "contact_name": "Type Test",
                "email": f"test.{org_type}@example.com",
                "country": "Belgium",
                "organisation_type": org_type,
                "estimated_licences": "11-50",
                "intended_use": "employee_training"
            }
            
            response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
            assert response.status_code == 200, f"Failed for org_type: {org_type}"
            print(f"Organisation type '{org_type}' accepted successfully")
    
    def test_all_licence_ranges(self):
        """Test quote submission with different licence ranges"""
        licence_ranges = ["1-10", "11-50", "51-100", "101-250", "251-500", "500+"]
        
        for licence_range in licence_ranges:
            payload = {
                "organisation_name": f"TEST_Licences_{licence_range}",
                "contact_name": "Licence Test",
                "email": f"test.licences@example.com",
                "country": "Netherlands",
                "organisation_type": "company_medium",
                "estimated_licences": licence_range,
                "intended_use": "compliance"
            }
            
            response = requests.post(f"{BASE_URL}/api/quotes/haiku", json=payload)
            assert response.status_code == 200, f"Failed for licence_range: {licence_range}"
            print(f"Licence range '{licence_range}' accepted successfully")


class TestAPIAccessibility:
    """Basic API accessibility checks"""
    
    def test_quotes_endpoint_accessible(self):
        """Test that the quotes endpoint is accessible"""
        response = requests.get(f"{BASE_URL}/api/quotes/haiku")
        assert response.status_code == 200, f"Quotes endpoint check failed with status {response.status_code}"
        print("Quotes endpoint accessibility check passed")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
