// CONNEXION ///////////////////////////////////////////////////

const botconfig = require("./botconfig.json")
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("Online", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setGame("attends les ordres ✔️")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}help`){
    return message.channel.send("Comment puis-je vous aider ?");
  }


// BOT INFO

  if(cmd === `${prefix}botinfo`){

    let botembed = new Discord.RichEmbed()
    .setDescription("Information de Geisha")
    .setColor("#fb0700")
    .addField("Codé en", "JavaScript")
    .addField("Codé par", "Neotoxic")
    .addField("Version ", "0.1")

    return message.channel.send(botembed);
    return;
  }


});


bot.login(process.env.BOT_TOKEN);
