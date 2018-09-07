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
    .setTitle("Comment puis-je vous aider ?")
    .setColor("#fb0700")
    .addField("help", "Affiche la liste des commandes possibles")
    .addField("rules", "Affiche les règles du serveur")
    .addField("botinfo", "Affiche les informations sur Geisha")
    .addField("links", "Affiche des liens utiles")

    return message.channel.send(cmdembed);
  }













  if(cmd === `${prefix}links`){

    let linksembed = new Discord.RichEmbed()
    .setTitle("Liens Utiles")
    .setColor("#fb0700")
    .addField("+-------- CRACKS --------+"," ")
    .addField("Crack de jeux", "https://cracked-games.org/")
    .addField("Statut des cracks des jeux", "https://crackwatch.com/")
    .addField("+-------- COURS --------+"," ")
    .addField("Cours de l'année", "https://github.com/TeamDynasty/IUT-Doua")
    .addField("Cours des années précedentes", "https://repo.kuro.ml/courses-s1.git/")

    return message.channel.send(linksembed);
  }


  try {



  if(cmd === `${prefix}rules`){

    let rulesembed = new Discord.RichEmbed()
    .setTitle("Liste des Règles du Serveur")
    .setColor("#fb0700")
    .addField("Ne doit pas avoir de caractère pornographique sauf dans le channel dédié.", " ")
    .addField("Restez courtois, poli.", " ")
    .addField("Pas de spam.", " ")
    .addField("Pas de pub sur les différents chats sauf celui #pub.", " ")

    return message.channel.send(rulesembed);
  }
} catch(e) {
message.reply(e.toString());
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
