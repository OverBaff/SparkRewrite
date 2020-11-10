const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
module.exports = {
	name: 'calc',
	public: true,
	args: true,
	run: async (message, args) => {
		const toCalc = args.slice(0).join(' ');
		try {
			message.channel.send(new MessageEmbed().setTitle('Результат счисления').setColor('#61EC4B').setDescription(`\`\`\`${math.evaluate(toCalc)}\`\`\``).setFooter(message.author.id).setTimestamp());
		}
		catch (err) {
			message.channel.send(new MessageEmbed().setTitle('Результат счисления').setColor('#FF4242').setDescription(`\`\`\`${err}\`\`\``).setFooter(message.author.id).setTimestamp());
		}
	},
};