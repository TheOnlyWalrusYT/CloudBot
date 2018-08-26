const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    //mute @user s/m/h/d

    let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Couldn't find the mentioned user!");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("That person cannot be Muted!");
    let muterole = message.guild.roles.find(`name`, "muted");
    //Creating role
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    
    //End of creating role

    let mutetime = args[1];
    if(!mutetime) return message.channel.send("No time specified! Please refer to the usage in the 'Help' command.");

    await(tomute.addRole(muterole.id));
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);

        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "mute"
}