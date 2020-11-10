const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	description: 'позволяет получить информацию про команду',
	usage: 'help <command>',
	public: true,
	run: async (message, args, client) => {
		if(args.length) {
			const cmdName = args[0].toLowerCase();
			const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
			if(!command) return message.channel.send('Команда не найдена.');
			const commandEmbed = new MessageEmbed()
				.setTitle(`Информация про команду ${command.name}`)
				.setDescription(`Описание команды: **${command.description}**\nПример использования: **${command.usage}**\nАлиасисы(дополнительная форма написания команды): **${command.aliases || 'Не указано'}**\nПрава требуемые для выполнения команды: **${command.permision || 'Не указано'}**\nПрава требуемые боту для выполнения команды: **${command.clientPermision || 'Не указано'}**`)
				.setColor('#F3FF00')
				.setFooter(command.name)
				.setTimestamp();
			message.channel.send(commandEmbed);
		}
		else {
			const options = {
				page: 1,
				max: 4,
				min: 1,
			};
			const filter = (reaction, user) => {
				return ['⏪', '⬅', '➡', '⏩'].includes(reaction.emoji.name) && user.id == message.author.id;
			};

			const pages = {
				1: new MessageEmbed().setTitle('Модерация').setDescription('`ban`, `clear`, `kick`, `mute`, `unban`, `unmute`').setFooter('Количество комманд: 6 | Страница: 1').setColor('#F3FF00'),
				2: new MessageEmbed().setTitle('Информационые').setDescription('`help`, `ping`, `server`, `stats`, `user`').setFooter('Количество команд: 5 | Страница: 2').setColor('#F3FF00'),
				3: new MessageEmbed().setTitle('Утилиты').setDescription('`docs`, `mc`, `calc`, `remind`').setFooter('Количество команд: 2 | Страница: 3').setColor('#F3FF00'),
				4: new MessageEmbed().setTitle('Для разработчиков').setDescription('`eval`, `reload`').setFooter('Количество команд: 2 | Страница: 4').setColor('#F3FF00'),
			};

			const msg = await message.channel.send({ embed: pages[options.page] });

			msg.react('⏪');
			msg.react('⬅');
			msg.react('➡');
			msg.react('⏩');
			const reactionCollector = msg.createReactionCollector(filter, { max: Infinity, maxEmojis: Infinity, idle: 15000, errors: ['time'] });
			reactionCollector.on('collect', reaction => {
				reaction.users.remove(message.author);
				if(reaction.emoji.name === '⏩') {
					msg.edit({ embed: pages[options.max] });
				}
				else if(reaction.emoji.name === '➡') {
					if(options.page != options.max) {
						options.page += 1;
						msg.edit({ embed: pages[options.page] });
					}
				}
				else if(reaction.emoji.name === '⏪') {
					msg.edit({ embed:  pages[options.min] });
				}
				else if(reaction.emoji.name === '⬅') {
					if(options.page != options.min) {
						options.page -= 1;
						msg.edit({ embed: pages[options.page] });
					}
				}

			});
			reactionCollector.on('end', () => msg.reactions.removeAll());
		}

	},

};