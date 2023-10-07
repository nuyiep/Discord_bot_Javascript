
// commands/move-members.js
module.exports = {
	name: 'movemembers',
	description: 'Change "PISCINER" role to "FLOATY" for all members',
	execute(message) {
	  const piscinersRole = message.guild.roles.cache.find((r) => r.name === 'PISCINER');
	  const floatiesRole = message.guild.roles.cache.find((r) => r.name === 'FLOATY');
  
	  if (!piscinersRole || !floatiesRole) {
		return message.channel.send('Roles not found. Make sure the role names are correct.');
	  }
  
	  const membersWithPiscinersRole = message.guild.members.cache.filter((member) =>
		member.roles.cache.has(piscinersRole.id)
	  );
  
	  membersWithPiscinersRole.forEach((member) => {
		member.roles.remove(piscinersRole)
		  .then(() => member.roles.add(floatiesRole))
		  .catch((error) => {
			console.error('Error moving member:', error);
		  });
	  });
  
	  message.channel.send('The "PISCINER" role has been changed to "FLOATY" for all members with that role.');
	},
  };
  