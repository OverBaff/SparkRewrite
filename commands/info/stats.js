const { MessageEmbed } = require('discord.js');
const hh = require('humanize-duration');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('botInfo.json');
const db = lowdb(adapter);

module.exports = {
	name: 'stats',
	aliases: ['stat', 'bot-stats'],
	description: 'позволяет получить статистику бота',
	usage: 'stats',
	public: true,
	run: async (message, args, client) => {
		const statEmbed = new MessageEmbed()
			.setTitle(`Статистика бота ${client.user.username}`)
			.setColor('#F3FF00')
			.setTimestamp()
			.setFooter(client.user.username, client.user.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL())
			.addField('Библиотеки:', '`discord.js 12.14.1`\n`lowdb 1.0.0`\n`mongoose 5.10.11`\n`moment 2.29.1`\n`humanize-duration 3.24.0`', true)
			.setDescription(`Версия: **0.0.1**\nUptime: **${hh(client.uptime, { language: 'ru' })}**\nHost Uptime: **${hh(require('os').uptime * 1000, { language: 'ru' })}**\n ОЗУ: **${require('humanize').filesize(process.memoryUsage().heapUsed)}/${require('humanize').filesize(require('os').totalmem())}** \n Latency: **${client.ws.ping}ms**`, true)
			.addField('Статистика:', `Серверов: **${client.guilds.cache.size}**\nПользователей: **${client.users.cache.size}**\nКаналов: **${client.channels.cache.size}**\nЭмодзи: **${client.emojis.cache.size}**\n Использовано команд: **${db.get('commandUsedCount').value()}**`, true);
		message.channel.send(statEmbed);
	},
};