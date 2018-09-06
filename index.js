// CONNEXION ///////////////////////////////////////////////////

const botconfig = require("./botconfig.json")
const Discord = require('discord.js');
const bot = new Discord.Client();
const superagent = require("superagent");

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
    message.channel.send("Comment puis-je vous aider ?");
  }

  if(cmd === `${prefix}botinfo`){

    let botembed = new Discord.Richembed()
    .setDescription("Information de Geisha")
    .setColor("#FB0700")
    .addField("Nom du bot", bot.user.username)
    .addField("Codé en", "JavaScript")
    .addField("Codé par", "Neotoxic")
    .addField("Version ", "0.1")

    return message.channel.send(botembed);
  }


});


bot.login(process.env.BOT_TOKEN);
