const { MessageEmbed } = require('discord.js');

module.exports = {
	error: function(error, title) {
		return new MessageEmbed().setTitle(title).setDescription(error).setColor('#C30000');
	},
	success: function(success, title) {
		return new MessageEmbed().setTitle(title).setDescription(success).setColor('#00C338');
	},
};