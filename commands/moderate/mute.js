const { MessageEmbed } = require('discord.js');
const hd = require('humanize-duration');
const ms = require('ms-advanced');

module.exports = {
	name: 'mute',
	clientPermision: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
	permision: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
	public: true,
	args: true,
	run: async (message, args) => {
		let role = message.guild.roles.cache.find(r => r.name == 'Spark - Muted');
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]); if(!user) return message.channel.send('Пользователь не найден.');
		const time = args[1];
		let reason = args.slice(2).join(' ');
		if(!user) return message.channel.send('Пользователь не найден.');
		if(!time) return message.channel.send('Укажите время мута.');
		if(!ms(time)) return message.channel.send('Укажите время в правильном формате.\n s - секунды, m - минуты, h - часы, d - дни.');
		if(ms(time) <= 60000) return message.channel.send('Время мута должно быть больше 1 минуты');
		if(!reason) reason = 'Причина не указана';
		if(!role) {
			message.guild.roles.create({
				data: {
					name: 'Spark - Muted',
					color: '#F3FF00',
				},
				reason: 'Роль для мута',
			}).then(roleMute => {
				role = roleMute;
				message.guild.channels.cache.forEach(async (channel) => {
					await channel.updateOverwrite(roleMute, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
					});
				});
			});
		}
		const muteEmbed = new MessageEmbed()
			.setTitle('Пользователь замучен.')
			.setColor('#F3FF00')
			.setDescription(`Пользователь **${user.displayName}** был замучен на **${hd(ms(time), { language: 'ru' })}**`)
			.setFooter(`Замутил ${message.author.id}`)
			.setTimestamp();
		message.channel.send(muteEmbed);
		user.roles.add(role.id);
		setInterval(() => {
			if(!user.roles.cache.has(role.id)) return;
			user.roles.remove(role.id);
			user.send('С вас снят мут, приятного общения!');
		}, ms(time));
	},
};