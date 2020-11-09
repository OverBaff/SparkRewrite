const fetch = require('node-fetch');

module.exports = {
	name: 'docs',
	description: 'позволяет найти информацию в документации discord.js',
	usage: 'docs <source> <query>',
	public: true,
	args: true,
	run: async (message, args) => {
		const version = args[0];
		const find = args.slice(1).join(' ');
		if(!version) return message.channel.send('Укажите ветку для поиска.');
		if(!find) return message.channel.send('Укажите запрос для поиска.');
		const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${version}&q=${find}`).then(response => response.json());
		if(res.status == 404) return message.channel.send('Не найдено.');
		message.channel.send({ embed: res });
	},
};