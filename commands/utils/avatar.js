const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'avatar',
	public: true,
	description: 'позволяет получить аватар пользователя',
	usage: 'avatar <user>',
	run: async (message, args, client) => {
		const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
		const avatarEmbed = new MessageEmbed()
			.setTitle(`Аватар ${user.username}`)
			.setDescription(`[png](${user.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' })}) [webp](${user.displayAvatarURL({ size: 2048, dynamic: true, format: 'webp' })})`)
			.setImage(user.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' }))
			.setColor('#F3FF00')
			.setTimestamp();
		message.channel.send(avatarEmbed);
	},
};