const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("-Commands-")
    .setColor("#ff7700")
    .addField("Ban :hammer:", "Usage: .ban @user (reason)")
    .addField("Bot Information", "Usage: .botinfo")
    .addField("Cat :cat: (Not working)", "Usage: .cat")
    .addField("Dog :dog:", "Usage: .dog")
    .addField("Help", "You know how to use this.")
    .addField("Kick :boot:", "Usage: .kick @user (reason)")
    .addField("Mute", "Usage: .mute @user (time | s | m | d |)")
    .addField("Report", "Usage: .report @user (reason)")
    .addField("Server Information", "Usage: .serverinfo")
    .addField("Warn", "Usage: .warn @user (reason)")

    message.channel.send(helpEmbed);

}

module.exports.help = {
    name: "help"
}