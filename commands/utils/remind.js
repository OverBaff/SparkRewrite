const ms = require('ms-advanced');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'remind',
	description: 'позволяет создать напоминание',
	usage: 'remind <time> <remind>',
	public: true,
	args: true,
	run: async (message, args) => {
		const time = args[0];
		const remind = args.slice(1).join(' ');
		if(!time) return message.channel.send('Укажите время!');
		if(!ms(time)) return message.channel.send('Укажите время в правильном формате.\n s - секунды, m - минуты, h - часы, d - дни.');
		if(!remind) return message.channel.send('Укажите напоминание!');
		if(remind.length > 1000) return message.channel.send('Максимальное количество символов в напоминание может быть 1000 символов.');
		message.channel.send('Напоминание создано!');
		const remindEmbed = new MessageEmbed()
			.setTitle('Напоминание')
			.setDescription(`\`\`\`${remind}\`\`\``)
			.setColor('process.env.COLOR')
			.setFooter(message.author.id)
			.setTimestamp();
		setTimeout(() => {
			message.channel.send(message.author, { embed: remindEmbed });
		}, ms(time));
	},
};