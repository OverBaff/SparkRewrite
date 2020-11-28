const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
client.commands = new Discord.Collection();
require('dotenv').config();
client.modules = new Discord.Collection();

try {
	mongoose.connect('mongodb+srv://Galwet:Galwet@sparksandbox.ihqty.mongodb.net/Discord?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
}
catch (error) {
	console.log(`[Error] Не удалось подключиться к базе данных.\n${error}`);
}
mongoose.connection.on('connected', ()=>{
	console.log('[LOG] Подключился к базе данных.');
});

require('./handlers/command')(client);
require('./handlers/event')(client);

client.login(process.env.TOKEN);