
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
	console.log(`🤗${c.user.tag} is online`);
});

client.on('messageCreate', (message) => {
	if (message.author.bot) {
		return ;
	}
	if (message.content == 'plau') {
		message.reply('Pei Yun Lau');
	}
	// Check for a custom command to trigger the role change
	if (message.content === '!movemembers') {
		// Role-changing logic here
		const piscinersRole = message.guild.roles.cache.find((r) => r.name === 'PISCINER');
		const floatiesRole = message.guild.roles.cache.find((r) => r.name === 'FLOATY');
	
		if (!piscinersRole || !floatiesRole) {
		  message.channel.send('Roles not found. Make sure the role names are correct.');
		  return;
		}
	
		const membersWithPiscinersRole = await message.guild.members.fetch();

		// console.log(message.guild.members.cache);
		// membersWithPiscinersRole = message.guild.members.cache.filter((member) =>
		//   member.roles.cache.has(piscinersRole.id)
		// );

		// console.log()
	
		// membersWithPiscinersRole.forEach((member) => {
		//   member.roles.remove(piscinersRole)
		// 	.then(() => member.roles.add(floatiesRole))
		// 	.catch((error) => {
		// 	  console.error('Error moving member:', error);
		// 	});
		// });
	
		membersWithPiscinersRole.forEach((member) => {
			if (member.roles.cache.has(piscinersRole.id)) {
				member.roles
					.remove(piscinersRole)
					.then(() => member.roles.add(floatiesRole))
					.catch((error) => {
						console.error('Error moving member:', error);
					});
			}
		});

		message.channel.send('The "PISCINER" role has been changed to "FLOATY" for all members with that role.');
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
