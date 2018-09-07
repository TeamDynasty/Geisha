// CONNEXION ///////////////////////////////////////////////////

const botconfig = require("./botconfig.json")
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("Online", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("attends les ordres ✔️", {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}help`){

    let cmdembed = new Discord.RichEmbed()
    .setDescription("Comment puis-je vous aider ?")
    .setColor("#fb0700")
    .addTitle("Liste des commandes", "disponibles")
    .addField("help", "Affiche la liste des commandes possibles")
    .addField("rules", "Affiche les règles du serveur")

    return message.channel.send(cmdembed);
  }




// BOT INFO


  if(cmd === `${prefix}botinfo`){

    let botembed = new Discord.RichEmbed()
    .setDescription("Informations à propos de Geisha")
    .setColor("#fb0700")
    .addField("Codé en", "JavaScript")
    .addField("Codé par", "Neotoxic")
    .addField("Version ", "0.1")

    return message.channel.send(botembed);
  }


});


bot.login(process.env.BOT_TOKEN);
