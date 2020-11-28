/* eslint-disable no-case-declarations */
const Guild = require('../../models/guild');
module.exports = {
	name: 'workphrases',
	aliases: ['set-workphrases'],
	permission: ['ADMINISTRATOR'],
	public: true,
	run: async (message, args) => {
		const select = args[0];
		const guild = await Guild.findOne({ _id: message.guild.id });
		switch(select) {
		case('clear'):
			message.channel.send('Фразы при работе успешно сброшены!');
			guild.workphrases = []; guild.save();
			break;
		case('set'):
			const work = args.slice(0).join(' ');
			guild.workphrases.push(work); guild.save();
			message.channel.send('Успешно добавлена новая фраза!');
			break;
		default:
			message.channel.send('Добавлю позже!');
			break;

		}
	},


};