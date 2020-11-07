const { error } = require('../utils/embeds.js');
const Guild = require('../models/guild.js');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('botInfo.json');
const db = lowdb(adapter);
db.defaults({ commandUsedCount: 0 });

module.exports = async (client, message) => {
	if(message.channel.type === 'dm') return;
	const guild = await Guild.findOne({ _id: message.guild.id });
	if(!guild) Guild.create({ _id: message.guild.id });

	if(message.author.bot) return;
	if(message.content.startsWith(`<@!${client.user.id}>` || `<@${client.user.id}>`)) return message.channel.send(`Мой префикс на данном сервере \`${guild.prefix}\``);

	const args = message.content.slice(guild.prefix.length).trim().split(/ +/);
	const cmdName = args.shift().toLowerCase();
	const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if(!command || !message.content.startsWith(guild.prefix)) return;

	if(!command.public && message.author.id != '724335588635050014') return;
	if(command.clientPermision && !message.guild.me.hasPermission(command.clientPermision)) return message.channel.send('У бота недостаточно **прав** для выполнения этой **команды**! :angry:');
	if(command.permision && !message.member.hasPermission(command.permision)) return message.channel.send('У вас недостаточно **прав** для использования этой **команды**! :angry:');
	if(command.args && !args.length) return message.channel.send('Вы не указали аргументы.');

	try {
		db.update('commandUsedCount', count => ++count).write();
		command.run(message, args, client);
	}
	catch (err) {
		console.error(err);
		message.channel.send(error(err, 'Произошла ошибка во время выполнения команды.'));
	}
};