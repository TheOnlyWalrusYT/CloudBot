const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have the required permssions to use that command!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.channel.send("Couldn't find the mentioned user!");
    if(wUser.hasPermission("MANAGE_MEMBERS")) return message.reply("This person can't be warned!");
    let wReason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#ffff00")
    .addField("Warned User", wUser.tag)
    .addField("Channel Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(`name`, "warnings");
    if(!warnchannel) return message.channel.send("Couldn't find a warnings channel. If there is one make sure it is spelled correctly.");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2){
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.channel.send("There is no muted role!");

        let mutetime = "1m";
        await(wUser.addRole(muterole.id));
        message.channel.send(`${wUser.tag} has been muted for 1 minute for recieving their second warning!`);

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.channel.send(`${wUser.tag} has been unmuted!`)
        })
    }
    
    if(warns[wUser.id].warns == 5){
        message.guild.member(wUser).ban(reason);
        message.channel.send(`${wUser.tag} has been banned for recieving their fifth warning!`);
    }


}

module.exports.help = {
    name: "warn"
}
