const User = require('../../models/user.js');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
module.exports = {
	name: 'bal',
	description: 'позволяет узнать баланс',
	usage: 'bal <user>',
	public: true,
	run: async (message, args) => {
		const guild = await Guild.findOne({ _id: message.guild.id });
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		const userDB = await User.findOne({ userID: user.id, guildID: message.guild.id });
		if(!userDB) return message.channel.send('Пользователь отсутствует в базе данных бота.');
		const balEmbed = new MessageEmbed()
			.setTitle('Баланс')
			.setDescription(`На руках: **${userDB.balance}** ${guild.coin}\nВ банке: **${userDB.bankBalance}** ${guild.coin}`)
			.setColor(process.env.COLOR)
			.setTimestamp();
		message.channel.send(balEmbed);
	},
};