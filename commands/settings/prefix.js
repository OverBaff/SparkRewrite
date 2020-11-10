const Guild = require('../../models/guild.js');

module.exports = {
	name: 'prefix',
	aliases: ['set-prefix'],
	public: true,
	args: true,
	permission: ['ADMINISTRATOR'],
	description: 'позволяет сменить префикс сервера',
	usage: 'prefix <prefix>',
	run: async (message, args) => {
		const prefix = args.slice(0).join(' ');
		const guild = await Guild.findOne({ _id: message.guild.id });
		if(!prefix) return message.channel.send('Укажите префикс');
		if(prefix.length > 5) return message.channel.send('Максимальная длина префикс 5 символов.');
		guild.prefix = prefix; guild.save();
		message.channel.send('Новый префикс установлен!');
	},
};