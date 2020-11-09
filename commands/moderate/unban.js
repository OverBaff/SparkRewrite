module.exports = {
	name: 'unban',
	clientPermision: ['BAN_MEMBERS'],
	permission: ['BAN_MEMBERS'],
	description: 'позволяет разбанить участника сервера',
	usage: 'unban <user-id>',
	args: true,
	run: async (message, client, args) => {
		if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('У бота недостаточно прав.');
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]); if(!user) return message.channel.send('Пользователь не найден.');
		let reason = args.slice(1).join(' '); if(!reason) reason = 'Причина не указана.';
		const banList = await message.guild.fetchBans(); const banned = banList.find(u => u.id == user.id);
		if(!banned) return message.channel.send('Пользователь не забанен.');
		user.unban({ reason: reason });
		message.channel.send(`Пользователь \`${user.displayName}\` разбанен \`${reason}\`.`);

	},
};