module.exports = {
	name: 'clear',
	aliases: ['purge'],
	clientPermision: ['MANAGE_MESSAGES'],
	permision: ['MANAGE_MESSAGES'],
	run: async (message, args) => {
		const number = parseInt(args[0]);
		if(!number || Number(number)) return message.channel.send('Укажите число!');
		if(number <= 2 || number >= 100) return message.channel.send('Укажите число в диапазоне от 2 до 100.');
		message.delete();
		message.channel.bulkDelete(number, true); message.channel.send(`Успешно удалил ${number} сообщений!`).then(m => m.delete({ timeout: 5000 }));
	},

};