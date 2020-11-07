module.exports = {
	name: 'ban',
	clientPermision: ['BAN_MEMBER'],
	permision: ['BAN_MEMBER'],
	run: async (message, args) => {
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!user) return message.channl.send('Пользователь не найден.');
		if(user.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send('У бота недостаточно прав.');
		if(user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Вы не можете забанить пользователя с более высокой ролью.');
		const banList = await message.guild.fetchBans();
		const banned = banList.find(u => u.id == user.id);
		if(banned) return message.channel.send('Пользователь уже забанен.');
		let reason = args.slice(1).join(' ');
		if(!reason) reason = 'Причина не указана.';
		user.ban({ reason: reason });
		message.channel.send(`Пользователь \`${user.username}\` забанен по причине \`${reason}\`.`);
	},
};