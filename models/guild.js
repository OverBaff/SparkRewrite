const mongoose = require('mongoose');
const guildSchema = mongoose.Schema({
	prefix: { type: String, default: 's.' },
	_id: String,
});
module.exports = mongoose.model('guild', guildSchema);