# PURI TOKEN Ticker Bot
![PURI TOKEN Logo](https://media.discordapp.net/attachments/1188529439659806756/1189251325591031890/TWITTER_PFP_500px_X_500px.jpg?ex=659d7b9b&is=658b069b&hm=b28f0b46ab5ec46418e29982bb16afabcd19bae42711aed1359dcf79d794714e&=&format=webp&width=662&height=662)

# Description
The PURI TOKEN Ticker Bot is a Discord bot developed by Gabss that provides real-time information on the 24-hour price change and current price of various cryptocurrencies. The bot is designed to be used in different community groups and offers an easy way to track price changes in real-time.

# Features
Track the 24-hour price change.
Receive real-time updates on the current price of different cryptocurrencies.
Utilize bot commands to customize display and interaction with the information.
Usage
# Installation
Clone the repository to your local environment.
bash
Copy code
git clone https://github.com/gabssprogrammer/puri-ticker.git
Install dependencies.
bash
Copy code
cd puri-token-bot
npm install
# Configuration
Open the localhost.js file and configure the apiEndpoint, apiKey, listAddress, and other variables as needed.
javascript
Copy code
// localhost.js
const apiEndpoint = 'http://localhost:3000';
const apiKey = 'YOUR_API_KEY';
const listAddress = 'YOUR_LIST_ADDRESS';
// ...
Start the local server.
bash
Copy code
node localhost.js
Open the bot.js file and configure your Discord bot token.
javascript
Copy code
// bot.js
const tokens = {
  SOL: {
    token: 'YOUR_DISCORD_TOKEN',
    // ...
  },
  // ...
};
// ...
Start the Discord bot.
bash
Copy code
node bot.js
#Contribution
If you want to contribute to the development of the PURI TOKEN Ticker Bot, feel free to open an issue or submit a pull request. The community is welcome to participate!

# License
This project is licensed under the MIT License.
