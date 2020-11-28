const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const User = require('../../models/user');
const Shop = require('../../models/shop');
module.exports = {
	name: 'shop',
	public: true,
	run: async (message, args) => {
		const select = args[0];
		switch (select) {
		default:
			const embed = new MessageEmbed().setColor(process.env.COLOR).setFooter(message.guild.name);
			Shop.find({ guildID: message.guild.id }).sort([['cost', 'descending']]).exec((err, res) => {
				console.log(res);
				for(let i = 0; i < res.length; i++) {
					embed.addField(`${message.guild.roles.cache.get(res[i].roleID).name}`, `Цена: ${res[i].cost}`);
				}
				message.channel.send(embed);
			});
			break;
		case('buy'):
			const shop = await Shop.findOne({ guildID: message.guild.id, roleID: message.mentions.roles.first().id || message.guild.roles.cache.get(args[1]).id });
			const user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
			if(user.balance < shop.cost) return message.channel.send('У вас недостаточно средств для покупки этой роли.');
			if(message.member.roles.cache.has(shop.roleID)) return message.channel.send('У вас уже присутствует данная роль!');
			user.balance -= shop.cost; user.save();
			message.member.roles.add(shop.roleID);
			message.channel.send(`Вы успешно купили ${message.guild.roles.cache.get(shop.roleID).name} за ${shop.cost}`);
			break;
		}
	},
};