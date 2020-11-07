const { MessageEmbed } = require('discord.js');
const humanize = require('humanize-duration');
module.exports = {
	name: 'eval',
	public: false,
	run: async (message, args, client) => {
		const code = args.join(' ');
		await message.react(client.emojis.cache.get('751470748765388860'));
		try {
			const codeEvalved = eval(code);
			message.reactions.cache.get('751470748765388860').remove();
			const plusEmbed = new MessageEmbed()
				.setTitle('Выполнено успешно!')
				.setColor('#00FF0C')
				.setDescription(`\`\`\`${require('util').inspect(codeEvalved, { depth: 0 })}\`\`\``)
				.setFooter(`Выполнено за ${humanize(Date.now() - message.createdTimestamp, { language: 'ru' })}`, message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send(plusEmbed);
		}
		catch (error) {
			message.reactions.cache.get('751470748765388860').remove();
			const plusEmbed = new MessageEmbed()
				.setTitle('Произошла ошибка во время выполнения кода')
				.setColor('#FF0303')
				.setDescription(`\`\`\`${error}\`\`\``)
				.setFooter(`Выполнено за ${humanize(Date.now() - message.createdTimestamp, { language: 'ru' })}`, message.author.displayAvatarURL())
				.setTimestamp();
			message.channel.send(plusEmbed);
		}
	},
};