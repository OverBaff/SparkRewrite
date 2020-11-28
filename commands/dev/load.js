module.exports = {
	name: 'load',
	public: false,
	run: async (message, args, client) => {
		const cmd = args[0];
		const dir = args[1];
		try {
			const command = require(`../commands/${dir}/${cmd}`);
			client.modules.set(command.name, dir);
			client.commands.set(command.name, command);
			message.channel.send(`${dir}/${cmd}⤴️`);

		}
		catch (error) {
			message.channel.send(`Не удалось загрузить команду.\n ${error}`);
		}
	},
};