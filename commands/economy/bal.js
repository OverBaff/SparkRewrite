const User = require('../../models/user.js');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'bal',
	description: 'позволяет узнать баланс',
	usage: 'bal <user>',
	public: true,
	run: async (message, args) => {
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		const userDB = await User.findOne({ userID: user.id, guildID: message.guild.id });
		if(!userDB) return message.channel.send('Пользователь отсутствует в базе данных бота.');
		const balEmbed = new MessageEmbed()
			.setTitle('Баланс')
			.setDescription(`На руках: **${userDB.balance}**\nВ банке: **${userDB.bankBalance}**`)
			.setColor(process.env.COLOR)
			.setTimestamp();
		message.channel.send(balEmbed);
	},
};