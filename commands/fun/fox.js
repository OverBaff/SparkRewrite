const fetch = require('node-fetch');
module.exports = {
	name: 'fox',
	public: true,
	description: 'позволяет получить случайное изображение с лисой',
	usage: 'fox',
	run: async (msg) => {
		const { image } = await fetch('https://randomfox.ca/floof/').then(res => res.json());
		msg.channel.send(image);
	},
};