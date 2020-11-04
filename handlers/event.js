const { readdirSync } = require('fs');
module.exports = (client) => {
	console.log('[LOG] Загрузчик ивентов начал свою работу.');
	const events = readdirSync('./events/').filter(f => f.endsWith('.js'));
	for(const file of events) {
		try {
			const event = require(`../events/${file}`);
			const eventName = file.split('.')[0];
			client.on(eventName, event.bind(null, client));
			console.log(`[LOG] Загружен ивент ${eventName}.`);
		}
		catch (error) {
			console.error(`[ERROR] Произошла ошибка во время загрузки ивента.\n ${error}`);
		}
	}
};