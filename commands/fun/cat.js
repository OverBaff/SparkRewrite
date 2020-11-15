const fetch = require('node-fetch');
module.exports = {
	name: 'cat',
	public: true,
	description: 'позволяет получить случайное изображение с котом',
	usage: 'cat',
	run: async (message) => {
		const response = await fetch('https://api.thecatapi.com/v1/images/search').then(res => res.json());
		message.channel.send(response[0].url);
	},
};