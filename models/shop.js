const mongoose = require('mongoose');
const ideaSchema = mongoose.Schema({
	guildID: String,
	roleID: String,
	cost: Number,
});
module.exports = mongoose.model('ideas', ideaSchema);