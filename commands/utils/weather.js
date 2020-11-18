const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'weather',
	public: true,
	args: true,
	run: async (message, args) => {
		const city = args.slice(0).join(' ');
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=23eeb2d9c69195923cbbb3a71b9a13a6&lang=ru&units=metric`).then(res => res.json());
		if(response.cod == 404) return message.channel.send('Город не найден!');
		const weatherEmbed = new MessageEmbed()
			.setTitle(`Погода в **${response.name}**`)
			.setDescription(`В **${response.name}** сечайс **${response.weather[0].description}**\nТемпература: **${response.main.temp}℃ (чувствуется как  ${response.main.feels_like}℃)**\nМинимальная температура: **${response.main.temp_min}℃**\nМаксимальная температура: **${response.main.temp_max}℃**\nДавление: **${response.main.pressure} паскаль**\nСкорость ветра: **${response.wind.speed} м/с**\nНаправление ветра: **${response.wind.deg}°**`)
			.setTimestamp();
		if(response.main.temp < 10) {
			weatherEmbed.setColor('#33ACFF');
		}
		else if(response.main.temp > 10) {
			weatherEmbed.setColor('#E6FF33');
		}
		else {
			weatherEmbed.setColor('#5BFF33');
		}

		message.channel.send(weatherEmbed);
	},
};