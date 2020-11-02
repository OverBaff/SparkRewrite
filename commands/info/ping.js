const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	run: (message, args, client) => {
		const pingEmbed = new MessageEmbed()
			.setTitle(':ping_pong:Пинг')
			.setColor('#F3FF00')
			.setDescription(`Websocket: \`${client.ws.ping}\`ms`)
			.setFooter(client.user.username, client.user.displayAvatarURL())
			.setTimestamp();
		message.channel.send(pingEmbed);
	},
};