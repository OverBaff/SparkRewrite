module.exports = {
	name: 'clear',
	aliases: ['purge'],
	clientPermision: ['MANAGE_MESSAGES'],
	permission: ['MANAGE_MESSAGES'],
	description: 'позволяет очистить сообщения в текущем канале',
	usage: 'clear <message-count>',
	public: true,
	args: true,
	run: async (message, args) => {
		if(!Number(args[0])) return message.channel.send('Укажите число!');
		if(args[0] <= 2 || args[0] >= 100) return message.channel.send('Укажите число в диапазоне от 2 до 100.');
		message.delete();
		message.channel.bulkDelete(args[0], true); message.channel.send(`Успешно удалил ${args[0]} сообщений!`).then(m => m.delete({ timeout: 5000 }));
	},

};