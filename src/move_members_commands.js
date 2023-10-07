
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Import the command handler
const commandHandler = require('./move_members');

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === '!movemembers') {
    commandHandler.execute(message);
  }
});

client.login(process.env.TOKEN);
