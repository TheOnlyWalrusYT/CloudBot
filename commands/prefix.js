const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("You don't have the required permission to use that command!");
    if(!args[0]);

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    let pEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Server Prefix Set!")
    .setDescription(`Prefix set to ${args[0]}`);

    message.channel.send(pEmbed);

}

module.exports.help = {
    name: "prefix"
}