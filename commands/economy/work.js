/* eslint-disable max-statements-per-line */
const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const humanize = require('humanize-duration');
const User = require('../../models/user');
module.exports = {
	name: 'work',
	public: true,
	run: async (message) => {
		const user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
		if(user.work !== null && 10800000 - (Date.now() - user.work) > 0) return message.channel.send(`Вы уже работали! Приходите через **${ humanize(10800000 - (Date.now() - user.work), { language: 'ru' }) }**`);
		const guild = await Guild.findOne({ _id: message.guild.id });
		const random = Math.floor(Math.random() * (350 - 50 + 50)) + 50;
		let item = guild.workphrases[Math.floor(Math.random() * guild.workphrases.length)];
		item = item.replace('{coin.count}', random); item = item.replace('{coin}', 'Добавь меня!');
		user.work = Date.now(); user.balance += random; user.save();
		const workEmbed = new MessageEmbed()
			.setTitle('Работа!')
			.setDescription(item)
			.setColor(process.env.COLOR)
			.setTimestamp();
		message.channel.send(workEmbed);
	},
};