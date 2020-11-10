module.exports = {
	name: 'unmute',
	clientPermision: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
	permision: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
	description: 'позволяет размутить участника сервера',
	usage: 'unmute <user>',
	public: true,
	args: true,
	run: async (message, args) => {
		const role = message.guild.roles.cache.find(r => r.name == 'Spark - Muted');
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]); if(!user) return message.channel.send('Пользователь не найден.');
		if(!user) return message.channel.send('Пользователь не найден.');
		if(!role) return message.channel.send('Роль мута не существует, замутите любого пользователя сервера и роль создаться автоматически.');
		message.channel.send(`${user.displayName} размучен!`);
	},
};