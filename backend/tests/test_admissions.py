"""
Test suite for Admissions API endpoints
Tests individual needs, organisation needs, pre-enrolment, and status checking
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestIndividualNeeds:
    """Tests for /api/admissions/individual-needs endpoint"""
    
    def test_submit_individual_needs_success(self):
        """Test successful submission of individual needs form"""
        payload = {
            "first_name": "TEST_Marie",
            "last_name": "Curie",
            "email": "test_marie@example.com",
            "phone": "+33612345678",
            "target_course": "ccna1",
            "current_level": "debutant",
            "professional_background": "Test background in IT support",
            "learner_objective": "Obtain CCNA certification",
            "expected_outcomes": "Network administration skills",
            "preferred_format": "online",
            "language_preference": "french",
            "reason_for_choosing": "Recommended by employer",
            "gdpr_consent": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/individual-needs", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert "reference_number" in data
        assert "status" in data
        assert "message" in data
        
        # Verify reference number format (IND-*)
        assert data["reference_number"].startswith("IND-"), f"Expected IND-* format, got {data['reference_number']}"
        assert data["status"] == "success"
        
        # Store reference number for status check test
        self.__class__.reference_number = data["reference_number"]
        print(f"Created individual needs application: {data['reference_number']}")
    
    def test_submit_individual_needs_without_gdpr_consent(self):
        """Test that submission fails without GDPR consent"""
        payload = {
            "first_name": "TEST_John",
            "last_name": "Doe",
            "email": "test_john@example.com",
            "target_course": "ccna1",
            "current_level": "debutant",
            "professional_background": "Test background",
            "learner_objective": "Test objective",
            "expected_outcomes": "Test outcomes",
            "preferred_format": "online",
            "language_preference": "french",
            "reason_for_choosing": "Test reason",
            "gdpr_consent": False
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/individual-needs", json=payload)
        
        assert response.status_code == 400, f"Expected 400, got {response.status_code}"
        assert "GDPR" in response.json().get("detail", "")
    
    def test_submit_individual_needs_missing_required_fields(self):
        """Test that submission fails with missing required fields"""
        payload = {
            "first_name": "TEST_Jane",
            "email": "test_jane@example.com",
            "gdpr_consent": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/individual-needs", json=payload)
        
        assert response.status_code == 422, f"Expected 422 for validation error, got {response.status_code}"


class TestOrganisationNeeds:
    """Tests for /api/admissions/organisation-needs endpoint"""
    
    def test_submit_organisation_needs_success(self):
        """Test successful submission of organisation needs form"""
        payload = {
            "organisation_name": "TEST_Acme Corp",
            "contact_name": "Pierre Dupont",
            "contact_email": "test_pierre@acme.com",
            "contact_phone": "+33198765432",
            "country": "France",
            "organisation_type": "company_small",
            "project_context": "Digital transformation training needs",
            "target_audience": "IT support team of 10 people",
            "number_of_learners": "6-10",
            "expected_skills": "Network administration skills",
            "current_skill_gaps": "No formal networking certification",
            "preferred_format": "hybrid",
            "certification_expectations": "CCNA for all participants",
            "reporting_expectations": "Monthly progress reports",
            "gdpr_consent": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/organisation-needs", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert "reference_number" in data
        assert "status" in data
        
        # Verify reference number format (ORG-*)
        assert data["reference_number"].startswith("ORG-"), f"Expected ORG-* format, got {data['reference_number']}"
        assert data["status"] == "success"
        
        self.__class__.reference_number = data["reference_number"]
        print(f"Created organisation needs application: {data['reference_number']}")
    
    def test_submit_organisation_needs_without_gdpr_consent(self):
        """Test that organisation submission fails without GDPR consent"""
        payload = {
            "organisation_name": "TEST_BadCorp",
            "contact_name": "Test Contact",
            "contact_email": "test@badcorp.com",
            "country": "France",
            "organisation_type": "company_small",
            "project_context": "Test context",
            "target_audience": "Test audience",
            "number_of_learners": "1-5",
            "expected_skills": "Test skills",
            "current_skill_gaps": "Test gaps",
            "preferred_format": "online",
            "gdpr_consent": False
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/organisation-needs", json=payload)
        
        assert response.status_code == 400
        assert "GDPR" in response.json().get("detail", "")


class TestPreEnrolment:
    """Tests for /api/admissions/pre-enrolment endpoint"""
    
    def test_submit_pre_enrolment_success(self):
        """Test successful submission of pre-enrolment form"""
        payload = {
            "first_name": "TEST_Sophie",
            "last_name": "Martin",
            "email": "test_sophie@example.com",
            "phone": "+33611223344",
            "address": "123 Test Street",
            "city": "Paris",
            "postal_code": "75001",
            "country": "France",
            "company": "TechCorp",
            "job_title": "IT Support",
            "target_course": "ccna1",
            "preferred_format": "online",
            "preferred_session_date": "March 2026",
            "funding_type": "employer",
            "funding_details": "Company sponsored training",
            "accessibility_needs": "",
            "gdpr_consent": True,
            "cgv_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/pre-enrolment", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert "reference_number" in data
        assert "status" in data
        assert "next_steps" in data
        
        # Verify reference number format (ENR-*)
        assert data["reference_number"].startswith("ENR-"), f"Expected ENR-* format, got {data['reference_number']}"
        assert data["status"] == "success"
        assert isinstance(data["next_steps"], list)
        assert len(data["next_steps"]) > 0
        
        self.__class__.reference_number = data["reference_number"]
        print(f"Created pre-enrolment application: {data['reference_number']}")
    
    def test_submit_pre_enrolment_without_gdpr(self):
        """Test that pre-enrolment fails without GDPR consent"""
        payload = {
            "first_name": "TEST_Bad",
            "last_name": "User",
            "email": "test_bad@example.com",
            "country": "France",
            "target_course": "ccna1",
            "preferred_format": "online",
            "funding_type": "personal",
            "gdpr_consent": False,
            "cgv_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/pre-enrolment", json=payload)
        
        assert response.status_code == 400
        assert "GDPR" in response.json().get("detail", "")
    
    def test_submit_pre_enrolment_without_cgv(self):
        """Test that pre-enrolment fails without CGV acceptance"""
        payload = {
            "first_name": "TEST_NoCGV",
            "last_name": "User",
            "email": "test_nocgv@example.com",
            "country": "France",
            "target_course": "ccna1",
            "preferred_format": "online",
            "funding_type": "personal",
            "gdpr_consent": True,
            "cgv_accepted": False
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/pre-enrolment", json=payload)
        
        assert response.status_code == 400
        assert "Terms" in response.json().get("detail", "") or "CGV" in response.json().get("detail", "").upper()


class TestApplicationStatus:
    """Tests for /api/admissions/status/{reference_number} endpoint"""
    
    reference_number = None
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Create a test application to check status"""
        if not TestApplicationStatus.reference_number:
            payload = {
                "first_name": "TEST_Status",
                "last_name": "Check",
                "email": "test_status@example.com",
                "target_course": "ccna2",
                "current_level": "notions",
                "professional_background": "Test background",
                "learner_objective": "Test objective",
                "expected_outcomes": "Test outcomes",
                "preferred_format": "online",
                "language_preference": "french",
                "reason_for_choosing": "Testing",
                "gdpr_consent": True
            }
            
            response = requests.post(f"{BASE_URL}/api/admissions/individual-needs", json=payload)
            if response.status_code == 200:
                TestApplicationStatus.reference_number = response.json()["reference_number"]
    
    def test_check_status_success(self):
        """Test checking application status with valid reference number"""
        if not TestApplicationStatus.reference_number:
            pytest.skip("No reference number available")
        
        response = requests.get(f"{BASE_URL}/api/admissions/status/{TestApplicationStatus.reference_number}")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        # Verify response structure
        assert "reference_number" in data
        assert "status" in data
        assert "status_message" in data
        assert "type" in data
        assert "created_at" in data
        
        # Verify initial status
        assert data["status"] == "enquiry_received"
        assert data["reference_number"] == TestApplicationStatus.reference_number
        print(f"Status check successful: {data['status_message']}")
    
    def test_check_status_not_found(self):
        """Test checking status with invalid reference number"""
        response = requests.get(f"{BASE_URL}/api/admissions/status/INVALID-REF-12345")
        
        assert response.status_code == 404


class TestPrerequisiteAssessment:
    """Tests for /api/admissions/prerequisite-assessment endpoint"""
    
    def test_submit_prerequisite_assessment_success(self):
        """Test successful submission of prerequisite self-assessment"""
        payload = {
            "email": "test_prereq@example.com",
            "target_course": "ccna1",
            "osi_model_knowledge": "basic",
            "ipv4_knowledge": "intermediate",
            "cli_experience": "basic",
            "networking_experience_years": 2,
            "previous_certifications": "None",
            "previous_training": "Self-study",
            "motivation": "Career advancement in networking",
            "cv_uploaded": False,
            "diploma_uploaded": False,
            "experience_proof_uploaded": False,
            "gdpr_consent": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/prerequisite-assessment", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert "id" in data
        assert "reference_number" in data
        assert data["reference_number"].startswith("PRE-")
        print(f"Created prerequisite assessment: {data['reference_number']}")


class TestReferenceNumberFormats:
    """Verify all reference number formats are correct"""
    
    def test_individual_reference_format(self):
        """Verify IND-* format for individual applications"""
        payload = {
            "first_name": "TEST_RefFormat",
            "last_name": "Individual",
            "email": "test_refind@example.com",
            "target_course": "cyberops",
            "current_level": "intermediaire",
            "professional_background": "Test",
            "learner_objective": "Test",
            "expected_outcomes": "Test",
            "preferred_format": "hybrid",
            "language_preference": "french",
            "reason_for_choosing": "Test",
            "gdpr_consent": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/individual-needs", json=payload)
        assert response.status_code == 200
        
        ref = response.json()["reference_number"]
        assert ref.startswith("IND-")
        parts = ref.split("-")
        assert len(parts) == 3  # IND-YYYYMMDD-XXXXXX
        assert len(parts[1]) == 8  # Date format
        assert len(parts[2]) == 6  # UUID portion
    
    def test_organisation_reference_format(self):
        """Verify ORG-* format for organisation applications"""
        payload = {
            "organisation_name": "TEST_RefFormat Corp",
            "contact_name": "Test Contact",
            "contact_email": "test_reforg@example.com",
            "country": "France",
            "organisation_type": "university",
            "project_context": "Test",
            "target_audience": "Test",
            "number_of_learners": "21-50",
            "expected_skills": "Test",
            "current_skill_gaps": "Test",
            "preferred_format": "on_site",
            "gdpr_consent": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/organisation-needs", json=payload)
        assert response.status_code == 200
        
        ref = response.json()["reference_number"]
        assert ref.startswith("ORG-")
        parts = ref.split("-")
        assert len(parts) == 3
    
    def test_enrolment_reference_format(self):
        """Verify ENR-* format for pre-enrolment applications"""
        payload = {
            "first_name": "TEST_RefFormat",
            "last_name": "Enrolment",
            "email": "test_refenr@example.com",
            "country": "Belgium",
            "target_course": "unreal",
            "preferred_format": "in_class",
            "funding_type": "france_travail",
            "gdpr_consent": True,
            "cgv_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admissions/pre-enrolment", json=payload)
        assert response.status_code == 200
        
        ref = response.json()["reference_number"]
        assert ref.startswith("ENR-")
        parts = ref.split("-")
        assert len(parts) == 3


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
