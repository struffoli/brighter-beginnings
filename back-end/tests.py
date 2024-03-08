import app
import unittest 

class Tests(unittest.TestCase):
    def setUp(self):
        # create test client
        app.app.config["TESTING"] = True
        self.client = app.app.test_client()
    
    def testAllScholarships(self):
        response = self.client.get("/scholarships")
        self.assertEqual(response.status_code, 200)
        scholarships = response.json["Scholarships"]
        self.assertIsNotNone(scholarships)
        self.assertEqual(len(scholarships), 50)
        
    
    def testSingleScholarship(self):
        response = self.client.get("/scholarships/1")
        self.assertEqual(response.status_code, 200)
        scholarship = response.json["Scholarship"]
        self.assertIsNotNone(scholarship)
        self.assertEqual(scholarship["id"], 1)

    def testAllOrganizations(self):
        response = self.client.get("/organizations")
        self.assertEqual(response.status_code, 200)
        organizations = response.json["Organizations"]
        self.assertIsNotNone(organizations)
        self.assertEqual(len(organizations), 100)
    
    def testSingleOrganization(self):
        response = self.client.get("/organizations/1")
        self.assertEqual(response.status_code, 200)
        organization = response.json["Organization"]
        self.assertIsNotNone(organization)
        self.assertEqual(organization["id"], 1)

    def testAllCities(self):
        response = self.client.get("/cities")
        self.assertEqual(response.status_code, 200)
        cities = response.json["Cities"]
        self.assertIsNotNone(cities)
        self.assertEqual(len(cities), 150)
    
    def testSingleCity(self):
        response = self.client.get("/cities/1")
        self.assertEqual(response.status_code, 200)
        city = response.json["City"]
        self.assertIsNotNone(city)
        self.assertEqual(city["id"], 1)

if __name__ == "__main__":
    unittest.main()
