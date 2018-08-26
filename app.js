const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',() => {
    console.log('I am now Online!')
})

var prefix = "."
client.on('message', message => {
    if (message.author.bot) return;
    let args = message.content.split(' ').slice(1);
    var argresult = args.join(' ');
    if (!message.content.startsWith(prefix)) return;

    if (message.content === prefix + 'ping') {
        message.channel.send('Pong! \${Date.now() - message.createdTimestamp}\ ms!')
    }   else

    if (message.content === prefix + 'help') {
        message.channel.send('The prefix is .');
    } else

    if (message.content.startsWith(prefix + 'setgame')) {
        client.user.setGame(argresult);
    } else
    
    if (message.content.startsWith(prefix + 'setstatus')) {
        client.user.setStatus(argresult);
    } else

    message.channel.send('Unknown command!');

});
client.login('NDY0NDkyOTAzMjc2NzQwNjA5.Dh_xSA.RUoZDtcPx9Ok2-OYZ4xZUAsyQMA');