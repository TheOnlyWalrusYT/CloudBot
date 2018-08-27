const Discord = require("discord.js");
const config = require("../config");
let purple = config.purple;
let xp = ("../xp.json");

module.exports.run = async (bot, message, args) => {

    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
    };    
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nexLvlXp = curlvl * 150;
    let difference = nextLvlXp - curxp;

    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(purple)
    .addField("Level", curlvl, true)
    .addField("XP", curxp, true)
    .setFooter(`${difference} XP until next level up!`, message.author.displayAvatarURL);

    message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
    name: "level"
}