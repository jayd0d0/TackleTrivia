import pandas as pd

# Read the CSV file
df = pd.read_csv('nrl_players.csv')

# Filter out rows where the 'Age' column is missing or empty
df_filtered = df[df['Age'].notna() & df['Age'].astype(bool)].copy()

# Remove the '/remote.axd?' part from the 'Profile-Img' URLs
df_filtered.loc[:, 'Profile-Img'] = df_filtered['Profile-Img'].str.replace(r'^/remote\.axd\?', '', regex=True)

# Sort the DataFrame by the 'Player' column alphabetically
df_sorted = df_filtered.sort_values(by='Player')

# Convert the sorted DataFrame to JSON
df_sorted.to_json('nrl_players.json', orient='records', lines=False, indent=2)

print('Player data converted to nrl_players.json, image paths updated, and sorted by player name.')
