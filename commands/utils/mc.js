const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'mc',
	aliases: ['mc-server', 'mcinfo'],
	description: 'позволяет найти информацию про сервер майнкрафт',
	usage: 'mc <ip>',
	public: true,
	args: true,
	run: async (message, args) => {
		const ipServer = args.slice(0).join (' ');
		if(!ipServer) return message.channel.send('Укажите айпи сервера!');
		if(ipServer.length > 50) return message.channel.send('Длина айпи не может быть больше 50 символов.');
		const { ip, port, version, hostname, online } = await fetch(`https://api.mcsrvstat.us/2/${ipServer}`).then(response => response.json());
		const mcEmbed = new MessageEmbed()
			.setTitle('Информация о сервере майнкрафт')
			.setColor('#F3FF00')
			.setFooter(ipServer)
			.setTimestamp()
			.setDescription(`IP: **${ip || 'Неизвестно'}:${port || 'Неизвестно'}**\nHostname: **${hostname || 'Неизвестно'}**\n Версия: **${version || 'Неизвестно'}**\nЗапущен: **${online ? 'Сервер запщуен' : 'Сервер выключен'}**`);
		message.channel.send(mcEmbed);
	},
};