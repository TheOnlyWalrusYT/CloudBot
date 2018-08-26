const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("-Commands-")
    .setColor("#ff7700")
    .addField("Ban", "Usage: .ban @user (reason)")
    .addField("Bot Information", "Usage: .botinfo")
    .addField("Help", "You know how to use this.")
    .addField("Kick", "Usage: .kick @user (reason)")
    .addField("Report", "Usage: .report @user (reason)")
    .addField("Server Information", "Usage: .serverinfo")

    message.channel.send(helpEmbed);

}

module.exports.help = {
    name: "help"
}
