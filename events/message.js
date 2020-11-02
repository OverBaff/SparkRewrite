const { error } = require('../utils/embeds.js');
const Guild = require('../models/guild.js');
module.exports = async (client, message) => {
	const guild = await Guild.findOne({ _id: message.guild.id });
	if(!guild) await Guild.create({ _id: message.guild.id });
	if(message.author.bot) return;
	const args = message.content.slice(guild.prefix.length).trim().split(/ +/);
	const cmdName = args.shift().toLowerCase();
	const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if(!command || !message.content.startsWith(guild.prefix)) return;
	try {
		command.run(message, args, client);
	}
	catch (err) {
		console.error(err);
		message.channel.send(error(err, 'Произошла ошибка во время выполнения команды.'));
	}
};