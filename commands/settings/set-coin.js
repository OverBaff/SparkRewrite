const Guild = require('../../models/guild');
module.exports = {
    name: 'set-coin',
    public: true,
    args: true,
    run: async(message, args) => {
        
        const coin = args.slice(0).join(' ');
        if(coin.length > 15) return message.channel.send('Длина монеты сервера может быть максимум 15 символов.');
        guild.coin = coin; guild.save(); 
    }
}