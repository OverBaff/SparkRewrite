const { readdirSync } = require('fs');
module.exports = (client) => {
	console.log('[LOG] Загрузчик команд начал свою работу.');
	readdirSync('./commands/').map((dir) => {
		readdirSync(`./commands/${dir}/`).map((cmd) => {
			try {
				const command = require(`../commands/${dir}/${cmd}`);
				client.commands.set(command.name, command);
				console.log(`[LOG] Загружена команда ${command.name}.`);
				console.log(`[LOG] Загружено ${client.commands.size} команд.`);

			}
			catch (error) {
				console.error(`[ERROR] Не удалось загрузить команду.\n ${error}`);
			}
		});
	});
};