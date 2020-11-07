const { error } = require('../utils/embeds.js');
const Guild = require('../models/guild.js');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('botInfo.json');
const db = lowdb(adapter);
db.defaults({ commandUsedCount: 0 });

module.exports = async (client, message) => {
	const guild = await Guild.findOne({ _id: message.guild.id });
	if(!guild) Guild.create({ _id: message.guild.id });

	if(message.mentions.has(client.user)) return message.channel.send(`Мой префикс на данном сервере: \`${guild.prefix}\`	`);
	if(message.author.bot) return;

	const args = message.content.slice(guild.prefix.length).trim().split(/ +/);
	const cmdName = args.shift().toLowerCase();
	const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if(!command || !message.content.startsWith(guild.prefix)) return;

	if(!command.public && message.author.id != '724335588635050014') return;


	try {
		db.update('commandUsedCount', count => ++count).write();
		command.run(message, args, client);
	}
	catch (err) {
		console.error(err);
		message.channel.send(error(err, 'Произошла ошибка во время выполнения команды.'));
	}
};