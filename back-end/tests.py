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
        scholarships = response.json
        self.assertIsNotNone(scholarships)
    
    def testSingleScholarship(self):
        response = self.client.get("/scholarships/1")
        self.assertEqual(response.status_code, 200)
        scholarship = response.json
        self.assertIsNotNone(scholarship)

    def testAllOrganizations(self):
        response = self.client.get("/organizations")
        self.assertEqual(response.status_code, 200)
        organizations = response.json
        self.assertIsNotNone(organizations)
    
    def testSingleOrganization(self):
        response = self.client.get("/organizations/1")
        self.assertEqual(response.status_code, 200)
        organization = response.json
        self.assertIsNotNone(organization)

    def testAllCities(self):
        response = self.client.get("/cities")
        self.assertEqual(response.status_code, 200)
        cities = response.json
        self.assertIsNotNone(cities)
    
    def testSingleCity(self):
        response = self.client.get("/cities/1")
        self.assertEqual(response.status_code, 200)
        city = response.json
        self.assertIsNotNone(city)


if __name__ == "__main__":
    unittest.main()
