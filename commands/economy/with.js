const Guild = require('../../models/guild');
const User = require('../../models/user');
module.exports = {
	name: 'with',
	public: true,
	args: true,
	run: async (message, args) => {
		const select = args[0];
		const guild = await Guild.findOne({ _id: message.guild.id });
		if(!select) return message.channel.send(`Укажите количество ${guild.coin} для депозита.`);
		const user = await User.findOne({ userID: message.author.id, guildID: message.guild.id });
		if(select === 'all') {
			// eslint-disable-next-line max-statements-per-line
			user.bankBalance -= user.balance; user.balance += user.balance; user.save();
			message.channel.send('Вы успешно вывели все свои деньги в банк!');
		}
		else {
			if(!Number(select)) return message.channel.send('Используйте только числа.');
			// eslint-disable-next-line max-statements-per-line
			user.balance += select; user.bankBalance -= parseInt(select); user.save();
			message.channel.send(`Вы вывели с банка ${select} ${guild.coin}!`);
		}
	},
};