const mongoose = require('mongoose');
const guildSchema = mongoose.Schema({
	prefix: { type: String, default: 's.' },
	coin: { type: String, default: 'монет' },
	workphrases: { type: Array, default: ['Вы поработали на стройке и получили {coin.count} {coin}', 'Вы сделали пару команд для Luminity и получили {coin.count} {coin}', 'Вы сделали обновление Luminity и получили {coin.count} {coin}', 'Вы сделали мобильное приложение Luminity и получили {coin.count} {coin}', 'Вы поработали на фрилансе и получили {coin.count} {coin}', 'Вы нашли на улице {coin.count} {coin}', 'Вы удалили Brawl Stars из плей маркета и получили {coin.count} {coin} от хейтеров'] },
	_id: String,
});
module.exports = mongoose.model('guild', guildSchema);