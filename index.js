const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();
let xp = require("./xp.json");
let purple = config.purple;

fs.readdir("./commands", (err, file) =>{
    if(err) console.log(err);

    let jsfile = file.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands!");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded successfully!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("Say '.help' for help!")
});

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined a server that has CloudBot in it!`);

    let welcomechannel = member.guild.channels.find(`name`, "welcome");
    welcomechannel.send(`${member} has joined the server!`);
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} left a server that has CloudBot in it!`);

    let goodbyechannel = member.guild.channels.find(`name`, "welcome");
    goodbyechannel.send(`${member} has left the server!`);
});

bot.on("channelCreate", async channel => {
    let cChannel = channel.guild.channels.find(`name`, "general");
    cChannel.send(`${channel} has been created!`)
});

bot.on("channelDelete", async channel => {
    let rChannel = channel.guild.channels.find(`name`, "general");
    rChannel.send(`${channel.name} has been created!`)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;

    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 150;
    xp[message.author.id].xp = curxp + xpAdd;
    if(nxtLvl <= curxp){
        xp[message.author.id].level = curlvl + 1;
        let lvlup = new Discord.RichEmbed()
        .setTitle("Level Up!")
        .setColor(purple)
        .addField("New Level", curlvl + 1);

        message.channel.send(lvlup).then(msg => {message.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
    });

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args)

});

bot.login(config.token);