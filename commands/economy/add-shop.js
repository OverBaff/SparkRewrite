const Shop = require('../../models/shop');
module.exports = {
	name: 'add-shop',
	public: true,
	args: true,
	run: async (message, args) => {
		const role = message.mentions.roles.first() || message.roles.cache.get(args[0]);
		const cost = parseInt(args[1]);
		if(!role) return message.channel.send('Укажите роль для добавления в магазин!');
		if(!cost) return message.channel.send('Укажите цену!');
		Shop.find({ guildID: message.guild.id }).sort([['cost', 'descending']]).exec((err, res) => {
			if(res.length >= 10) return message.channel.send('Вы добавили максимальное количество ролей в магазин!');
		});
		Shop.create({ guildID: message.guild.id, roleID: role.id, cost: cost });
		message.channel.send('Добавлена новая роль в магазин!');
	},
};
