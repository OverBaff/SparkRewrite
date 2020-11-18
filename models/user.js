const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	userID: String,
	guildID: String,
	balance: { type: Number, default: 0 },
	bankBalance: { type: Number, default: 0 },
});
module.exports = mongoose.model('users', userSchema);