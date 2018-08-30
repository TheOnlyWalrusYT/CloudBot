const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) message.channel.send("Couldn't find the mentioned user!")
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the required permissions to use that command!");
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person cannot be banned!")

        let banEmbed = new Discord.RichEmbed()
        .setDescription("-Ban-")
        .setColor("#ff7700")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Channel Banned In", message.createdAt)
        .addField("Banned At", message.createdAt)
        .addField("Reason for Ban", bReason)

        let banChannel = message.guild.channels.find(`name`, "kicks-and-bans");
        if(!banChannel) return message.channel.send("Couldn't find a kicks and bans channel! If there is one, please make sure it is all lowercase and spelt correctly (kicks-and-bans).");
        
        message.guild.member(bUser).ban(bReason);
        banChannel.send(banEmbed);

}

module.exports.help = {
    name: "ban"
}