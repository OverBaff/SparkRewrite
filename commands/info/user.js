const moment = require('moment');
moment.locale('ru');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'user',
	aliases: ['user-info'],
	description: 'позволяет получить пользователя',
	usage: 'stats',
	public: true,
	run: async (message, args, client) => {
		const Map = {
			'online': `${client.emojis.cache.get('756608203181129900')}Онлайн`,
			'offline': `${client.emojis.cache.get('756608203386519642')}Не в сети`,
			'idle': `${client.emojis.cache.get('756608203516543006')}Не активен`,
			'dnd': `${client.emojis.cache.get('756608203235786822')}Не беспокоить`,
		};
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		const userEmbed = new MessageEmbed()
			.setTitle(`Информация про пользователя ${user.displayName}`)
			.setDescription(`Тег: **${user.user.tag}**\nСоздан: **${moment(user.user.createdAt).format('LL')} (${(moment(user.user.createdAt, 'YYYYMMDD').fromNow())})**\nПрисоединился: **${moment(user.joinedAt).format('LL')} (${moment(user.joinedAt, 'YYYYMMDD').fromNow()})**\nСтатус: **${Map[message.author.presence.status]}**`)
			.setColor('#F3FF00')
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
			.setFooter(message.guild.id)
			.setTimestamp();
		message.channel.send(userEmbed);
	},

};