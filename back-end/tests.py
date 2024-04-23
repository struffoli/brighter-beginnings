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
        #check that the fields are returned
        self.assertIsNotNone(organization["name"])

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
        
    def testScholarshipsSort(self):
        response = self.client.get("/scholarships?sort=award_amount")
        self.assertEqual(response.status_code, 200)
        reponse = self.client.get("/scholarships?sort=name")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/scholarships?sort=awarded_by")
        self.assertEqual(response.status_code, 200)
        
    def testScholarshipsFilter(self):
        response = self.client.get("/scholarships?filter=merit_based")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/scholarships?filter=need_based")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/scholarships?filter=essay_based")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/scholarships?filter=nationwide")
        self.assertEqual(response.status_code, 200)
        
    def testOrganizationsSort(self):
        response = self.client.get("/organizations?sort=name")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/organizations?sort=email")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/organizations?sort=organization_type")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/organizations?sort=id")
        self.assertEqual(response.status_code, 200)
        
    def testOrganizationsFilter(self):
        response = self.client.get("/organizations?filter=email")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/organizations?filter=phone")
        self.assertEqual(response.status_code, 200)
        
    def testCitiesSort(self):
        response = self.client.get("/cities?sort=name")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/cities?sort=state")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/cities?sort=population")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/cities?sort=median_income")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/cities?sort=unemployment_rate")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/cities?sort=college_educated_rate")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/cities?sort=poverty_rate")
        self.assertEqual(response.status_code, 200)
        
    def testScholarshipsSearch(self):
        response = self.client.get("/scholarships?search=women")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json["Scholarships"])
        self.assertEqual(len(response.json["Scholarships"]), 2)
        
    def testCitiesSearch(self):
        response = self.client.get("/cities?search=New")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json["Cities"])
        self.assertEqual(len(response.json["Cities"]), 9)
        
    def testOrganizationsSearch(self):
        response = self.client.get("/organizations?search=College")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json["Organizations"])
        self.assertEqual(len(response.json["Organizations"]), 4)

if __name__ == "__main__":
    unittest.main()