const Moment = require('moment');
Moment.locale('ru');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'server',
	description: 'позволяет получить статистику сервера',
	usage: 'server',
	public: true,
	run: async (message, args, client) => {
		const regionServer = {
			'brazil': ':flag_br: Бразилия',
			'europe': ':flag_eu: Европа',
			'hongkong': ':flag_hk: Хонг-конг',
			'india': ':flag_in: Индия',
			'japan': ':flag_jp: Япония',
			'russia': ':flag_ru: Россия',
			'singapore': ':flag_sg: Сингапур',
			'southafrica': ':flag_za: Южная Африка',
			'sydney': ':flag_au: Сидней',
			'us-central': ':flag_us: США',
			'us-east': ':flag_us: США',
			'us-south': ':flag_us: США',
			'us-west': ':flag_us: США',
			'frankfurt': ':flag_de: Франкфурт',
		};
		const serverEmbed = new MessageEmbed()
			.setTitle(`Статистика сервера ${message.guild.name}`)
			.setColor('#F3FF00')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Количество участников:', `${client.emojis.cache.get('756609086401020004')} Всего участников: \`${message.guild.memberCount}\`\n${client.emojis.cache.get('756608203181129900')} В сети: \`${message.guild.members.cache.filter(u => u.presence.status == 'online').size}\`\n${client.emojis.cache.get('756608203386519642')} Не в сети: \`${message.guild.members.cache.filter(u => u.presence.status == 'offline').size}\`\n${client.emojis.cache.get('756608203235786822')} Не беспокоить: \`${message.guild.members.cache.filter(u => u.presence.status == 'dnd').size}\`\n${client.emojis.cache.get('756608203516543006')} Не активен: \`${message.guild.members.cache.filter(u => u.presence.status == 'idle').size}\``, true)
			.addField('Количество каналов:', `${client.emojis.cache.get('756609086401020004')} Всего каналов: \`${message.guild.channels.cache.size - message.guild.channels.cache.filter(c => c.type == 'category').size}\`\n${client.emojis.cache.get('759854092360613909')}Текстовых: \`${message.guild.channels.cache.filter(c => c.type == 'text').size}\`\n${client.emojis.cache.get('759854092557221929')} Голосовых: \`${message.guild.channels.cache.filter(c => c.type == 'voice').size}\``, true)
			.addField('Создан:', `${Moment(message.guild.createdAt).format('LL')} (${Moment(message.guild.createdAt, 'YYYYMMDD').fromNow()})`)
			.addField('Статус бустов:', `Количество бустов: ${message.guild.premiumSubscriptionCount}\n Уровень: ${message.guild.premiumTier}`, true)
			.addField('Регион:', regionServer[message.guild.region], true)
			.addField('Создатель:', message.guild.owner)
			.setFooter(message.guild.id, message.guild.iconURL())
			.setTimestamp();
		message.channel.send(serverEmbed);
	},
};