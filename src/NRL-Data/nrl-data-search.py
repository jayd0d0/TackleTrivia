import requests
from bs4 import BeautifulSoup
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time
import random

# Path to the ChromeDriver executable
# chrome_driver_path = "C:\Program Files (x86)"

# # Set up the WebDriver
# service = Service(chrome_driver_path)
driver = webdriver.Chrome()

# NRL URLs
NRL_URL = [
    'https://www.nrl.com/players/?competition=111&team=500028',
    'https://www.nrl.com/players/?competition=111&team=500010',
    'https://www.nrl.com/players/?competition=111&team=500723',
    'https://www.nrl.com/players/?competition=111&team=500031',
    'https://www.nrl.com/players/?competition=111&team=500014',
    'https://www.nrl.com/players/?competition=111&team=500013',
    'https://www.nrl.com/players/?competition=111&team=500002',
    'https://www.nrl.com/players/?competition=111&team=500021',
    'https://www.nrl.com/players/?competition=111&team=500032',
    'https://www.nrl.com/players/?competition=111&team=500011',
    'https://www.nrl.com/players/?competition=111&team=500012',
    'https://www.nrl.com/players/?competition=111&team=500022',
    'https://www.nrl.com/players/?competition=111&team=500003',
    'https://www.nrl.com/players/?competition=111&team=500005',
    'https://www.nrl.com/players/?competition=111&team=500001',
    'https://www.nrl.com/players/?competition=111&team=500004',
    'https://www.nrl.com/players/?competition=111&team=500023',
]

# Initialize an empty list to store player URLs
hrefs = []

try:
    # Loop through each team URL
    for url in NRL_URL:
        driver.get(url)
        time.sleep(random.uniform(2, 5))
        player_links = driver.find_elements(By.CLASS_NAME, 'card-themed-hero-profile')
        hrefs.extend([link.get_attribute('href') for link in player_links])
        time.sleep(random.uniform(1, 3))

    print(f'{len(hrefs)} URLs found')

finally:
    driver.quit()

# Define headers to mimic a browser request
headers_browser = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Create a list to store all player data
all_player_data = []

# Helper function to enforce a maximum character length
def enforce_max_length(text, max_length=30):
    if text and len(text) <= max_length:
        return text
    return None

# Helper function to extract numbers only
def extract_numbers(text):
    return ''.join(filter(str.isdigit, text)) if text else None

# Loop through each player URL
for player_url in hrefs:
    response = requests.get(player_url, headers=headers_browser)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract player details
        player_name_element = soup.find('h1', class_='club-card__title club-card__title--alt club-card__title--pt-large')
        full_name = enforce_max_length(player_name_element.text.strip()) if player_name_element else None
        names = full_name.split() if full_name else []
        first_name = enforce_max_length(names[0]) if names else None
        last_name = enforce_max_length(' '.join(names[1:])) if len(names) > 1 else None

        player_position_element = soup.find('p', class_='club-card__position')
        player_position = enforce_max_length(player_position_element.text.strip()) if player_position_element else None

        img_tag = soup.find('img', class_='club-card__logo-svg')
        team_name = enforce_max_length(img_tag['alt']) if img_tag and 'alt' in img_tag.attrs else None
        player_img_tag = soup.find('img', class_='hero-player-profile-image')
        player_img = player_img_tag['src'] if player_img_tag and 'src' in player_img_tag.attrs else None
        headers_player_attributes = ['Height:', 'Date of Birth:', 'Weight:', 'Birthplace:', 'Age:', 'Nickname:',
                                     'Debut Club:', 'Date:', 'Opposition:', 'Round:', 'Previous Club:', 'Junior Club:']

        default_values = dict.fromkeys(headers_player_attributes, None)
        player_attributes_data = [dd.text.strip() for dd in soup.find_all('dd') if 'card-profile-stat__value' not in dd.get('class', [])]
        
        for key, value in zip(headers_player_attributes, player_attributes_data):
            if key in ['Height:', 'Weight:', 'Age:']:
                default_values[key] = extract_numbers(value)
            else:
                default_values[key] = enforce_max_length(value)

        player_data = {
            'Profile-Img': player_img,
            'Player': full_name,
            'Position': player_position,
            'TeamName': team_name,
            'Age': default_values['Age:'],
            'Height': default_values['Height:'],
            'Weight': default_values['Weight:'],
            'BirthPlace': default_values['Birthplace:'],
            'PreviousClub': default_values['Previous Club:'],
        }

        all_player_data.append(player_data)

# Create a DataFrame and save it to a CSV file
player_df = pd.DataFrame(all_player_data)
player_df.to_csv('nrl_players.csv', index=False)
print('Player data saved to nrl_players.csv')
