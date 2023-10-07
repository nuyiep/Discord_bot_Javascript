
require('dotenv').config();

const { Client, IntentsBitField, InteractionCollector } = require('discord.js');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		// Guilds in discord means server
	]
})

client.on('ready', (c) => {
	console.log(`🤗${c.user.tag} is online`)
});

client.on('messageCreate', (message) => {
	if (message.author.bot) {
		return ;
	}
	if (message.content == 'plau') {
		message.reply('Pei Yun Lau');
	}
});

client.on('interactionCreate', (interation) => {
	if (!interation.isChatInputCommand()) return ;

	if (interation.commandName == 'hello') {
		interation.reply('world')
	}
	if (interation.commandName == 'ping') {
		interation.reply('pong')
	}
	if (interation.commandName == 'mikuu') {
		interation.reply('is gay')
	}
	if (interation.commandName == 'intraid') {
		interation.reply('Lau Pei Yun [full name]\nCadet [role]\nSegmentation Slayer [coalition]')
	}
	console.log(interation);
})

client.login(process.env.TOKEN);
