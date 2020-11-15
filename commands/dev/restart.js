module.exports = {
	name: 'restart',
	public: false,
	description: 'позволяет перезагрузить бота',
	usage: 'restart',
	run: async (message) => {
		const msg = await message.channel.send('Вы уверены?');
		const filter = (reaction, user) => {
			return ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;
		};
		msg.react('✅');
		msg.react('❌');

		const reactionCollector = msg.createReactionCollector(filter, { max: 1, idle: 15000, errors: ['time'] });
		reactionCollector.on('collect', reaction => {
			reaction.users.remove(message.member);
			switch(reaction.emoji.name) {
			case('✅'):
				message.channel.send('Перезагружаюсь...');
				setTimeout(() => {
					process.exit();
				}, 5000);
				break;
			case('❌'):
				message.channel.send('Перезагрузка бота отменена.');
				break;
			}
		});
		reactionCollector.on('end', () => {
			if (!msg.deleted) {
				msg.reactions.removeAll();
			}
		});
	},
};