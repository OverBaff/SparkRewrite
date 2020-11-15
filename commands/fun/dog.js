const fetch = require('node-fetch');
module.exports = {
	name: 'dog',
	public: true,
	description: 'позволяет получить случайное изображение с собакой',
	usage: 'dog',
	run: async (msg) => {
		const { message } = await fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json());
		msg.channel.send(message);
	},
};