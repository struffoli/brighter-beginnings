import unittest
from selenium.webdriver.chrome.options import Options
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
        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(10)
        self.driver.get(url)
        return super().setUp()
    
    def tearDown(self) -> None:
        self.driver.quit()
        return super().tearDown()
    
    def test_1(self) -> None:
        self.driver.get(url)
        button = self.driver.find_element(By.LINK_TEXT , "Organizations")
        button.click()
        self.assertEqual(self.driver.current_url, url+ "organizations")

    
if __name__ == "__main__":
    unittest.main()
