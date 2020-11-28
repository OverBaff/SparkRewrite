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
			case('reset'):
				guild.workphrase
		case('list'):
			if(guild.workphrases.length < 1) return message.channel.send('На сервере отсутствуют фразы!');
			for(let i = 0; i < guild.workphrases.length; i++) {
				guild.workphrases[i] = guild.workphrases[i].replace('{coin.count}', Math.floor(Math.random() * (350 - 50 + 50)) + 50);
				guild.workphrases[i] = guild.workphrases[i].replace('{coin}', guild.coin);
			}
			await message.channel.send(guild.workphrases.map(ph => `**${ph}**`));
			break;
		case('clear'):
			message.channel.send('Фразы при работе успешно сброшены!');
			guild.workphrases = []; guild.save();
			break;
		case('add'):
			const work = args.slice(1).join(' ');
			guild.workphrases.push(work); guild.save();
			message.channel.send('Успешно добавлена новая фраза!');
			break;
		default:
			message.channel.send('Добавлю позже!');
			break;

		}
	},


};