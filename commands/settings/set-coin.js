const Guild = require('../../models/guild');
module.exports = {
	name: 'set-coin',
	public: true,
	permission: ['ADMINISTRATOR'],
	args: true,
	run: async (message, args) => {
		const coin = args.slice(0).join(' ');
		if(coin.length > 15) return message.channel.send('Длина монеты может быть максимум 15 символов.');
		const guild = await Guild.findOne({ _id: message.guild.id });
		guild.coin = coin; guild.save();
		message.channel.send('Установлена новая монета!');
	},
};