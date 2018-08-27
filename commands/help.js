const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("-Commands-")
    .setColor("#ff7700")
    .addField("8Ball", "Usage: .8ball (Question)")
    .addField("Ban :hammer:", "Usage: .ban @user (reason)")
    .addField("Bot Information", "Usage: .botinfo")
    .addField("Cat :cat: (Not working)", "Usage: .cat")
    .addField("Clear", "Usage: .clear (amount of messages (Limit: 100))")
    .addField("Dog :dog:", "Usage: .dog")
    .addField("Help", "You know how to use this.")
    .addField("Kick :boot:", "Usage: .kick @user (reason)")
    .addField("Mute", "Usage: .mute @user (time | s | m | d |)")
    .addField("Prefix", "Usage .prefix (prefix you want to use)")
    .addField("Report", "Usage: .report @user (reason)")
    .addField("Say", "Usage: .say (message)")
    .addField("Server Information", "Usage: .serverinfo")
    .addField("Warn", "Usage: .warn @user (reason)")

    message.channel.send(helpEmbed);

}

module.exports.help = {
    name: "help"
}