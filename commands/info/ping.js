const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'позволяет получить пинг бота',
	usage: 'ping',
	public: true,
	run: (message, args, client) => {
		const pingEmbed = new MessageEmbed()
			.setTitle(':ping_pong:Пинг')
			.setColor(process.env.COLOR)
			.setDescription(`Websocket: \`${client.ws.ping}\`ms`)
			.setFooter(client.user.username, client.user.displayAvatarURL())
			.setTimestamp();
		message.channel.send(pingEmbed);
	},
};