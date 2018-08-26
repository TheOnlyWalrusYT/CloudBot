const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) message.channel.send("Couldn't find the mentioned user!")
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have the required permissions to use that command!");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person cannot kicked!")

        let kickEmbed = new Discord.RichEmbed
        .setDescription("-Kick-")
        .setColor("#ff7700")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Channel Kicked In", message.createdAt)
        .addField("Kicked At", message.createdAt)
        .addField("Reason for Kick", kReason)

        let kickChannel = message.guild.channels.find(`name`, "kicks-and-bans");
        if(!kickChannel) return message.channel.send("Couldn't find a kicks and bans channel! If there is one, please make sure it is all lowercase and spelt correctly (kicks-and-bans).");
        
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

}

module.exports.help = {
    name: "kick"
}