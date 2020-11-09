module.exports = {
	name: 'reload',
	description: 'позволяет выполнить перезагрузить команду',
	usage: 'reload <command>',
	public: false,
	args: true,
	run: async (message, args, client) => {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if(!command) return message.channel.send('Не удалось найти комманду.');
		const module = client.modules.get(command.name);
		if(!module) return message.channel.send('Не удалось найти модуль комманды.');
		try {
			delete require.cache[require.resolve(`../${module}/${command.name}.js`)];
			const reloadCommand = require(`../${module}/${command.name}.js`);
			message.client.commands.set(reloadCommand.name, reloadCommand);
			message.channel.send(`\`${module}/${reloadCommand.name}\`🔁`);
		}
		catch (err) {
			message.channel.send(`Произошла ошибка во время перезагрузки комманды.\n\`${err}\``);
		}
	},
};