const mongoose = require('mongoose');
const ideaSchema = mongoose.Schema({
	guildID: String,
	ideaID: { type: Number, default: 0 },
	accepted: Boolean,
});
module.exports = mongoose.model('ideas', ideaSchema);