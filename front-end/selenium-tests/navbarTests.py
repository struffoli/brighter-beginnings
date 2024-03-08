import unittest
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time
url = 'https://www.brighterbeginnings.me'
class SeleniumTests(unittest.TestCase):
    def setUp(self) -> None:
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument("--disable-gpu")
        options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Firefox(options=options)
        self.driver.maximize_window()
        self.driver.implicitly_wait(10)
        self.driver.get(url)
        return super().setUp()
    
    def tearDown(self) -> None:
        self.driver.quit()
        return super().tearDown()
    
    def test_1(self) -> None:
        self.driver.find_element(By.LINK_TEXT, "Organizations").click()
        self.assertEqual(self.driver.current_url, url + "/organizations")
        
    def test_2(self) -> None:
        self.driver.find_element(By.LINK_TEXT, "Cities").click()
        self.assertEqual(self.driver.current_url, url+ "/cities")
        
    def test_3(self) -> None:
        self.driver.find_element(By.LINK_TEXT, "Scholarships").click()
        self.assertEqual(self.driver.current_url, url+ "/scholarships")
        
    def test_4(self) -> None:
        self.driver.find_element(By.LINK_TEXT, "About Us").click()
        self.assertEqual(self.driver.current_url, url+ "/about")

    def test_5(self) -> None:
        self.driver.get(url + "/cities")
        self.driver.implicitly_wait(20)
        self.driver.find_element(By.LINK_TEXT, "New York").click()
        self.assertEqual(self.driver_current_url, url + "/cities/city?id=1")
    
    
    
if __name__ == "__main__":
    unittest.main()
