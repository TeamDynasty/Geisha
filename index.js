// CONNEXION ///////////////////////////////////////////////////

const botconfig = require("./botconfig.json")
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');

// STORAGE ///////////////////////////////////////////////////

let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

bot.on("ready", () => {
  console.log("Online");
  bot.user.setActivity(">help");
});




bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let sender = message.author;
  let msg = message.content;
  let msgu = message.content.toUpperCase();
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (bot.user.id === message.author.id) return;

  // EVENT ///////////////////////////////////////////////////

  if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {};
  if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000;
  if (!userData[sender.id + message.guild.id].lastDaily) userData[sender.id + message.guild.id].lastDaily = 'Not Collected';
  if (!userData[sender.id + message.guild.id].username) userData[sender.id + message.guild.id].username = message.author.username;


  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  });

  // MONEY ///////////////////////////////////////////////////

  if (msgu === prefix + 'money' || msgu === prefix + 'balance') {
    message.channel.send({
      embed:{
        title: "Bank",
        color: 0xfbff00,
        fields:[
          {
            name:"Account Holder",
            value:message.author.username,
            inline:true
          },{
            name:"Account Balance",
            value:userData[sender.id + message.guild.id].money,
            inline:true
          }
        ]
      }
    });
  }

  if (msg === prefix + 'daily') {
    if (userData[sender.id + message.guild.id].lastDaily != moment().format('L')) {
      userData[sender.id + message.guild.id].lastDaily = moment().format('L')
      userData[sender.id + message.guild.id].money += 500;
      message.channel.send({
        embed:{
          title:"Daily Reward",
          color: 0x4dff00,
          description:"You got 500$ added to your account"
        }
      });
    } else {
      message.channel.send({
        embed:{
          title:"Daily Reward",
          color: 0x4dff00,
          description:"You already claimed daily reward. You can collect your next reward " + moment().endOf('day').fromNow() + '.'
        }
      });
    }
  }

  if (msg === prefix + 'global') {

    var globalMoney = 0;
    var globalUsers = 0;
    var globalRichest = '';
    var globalRichest$ = 0;

    for (var i in userData) {
      globalMoney += userData[i].money;
      globalUsers += 1;
      if (userData[i].money > globalRichest$) {
        globalRichest$ = userData[i].money;
        globalRichest = userData[i].username;
      }
    }

    message.channel.send({
      embed:{
        title: "Global Stats",
        color: 0xff0000,
        fields:[
          {
            name:"Accounts",
            value:globalUsers,
            inline:true
          },{
            name:"Total Money",
            value:globalMoney,
            inline:true
          },{
            name: "Richest Account",
            value:`${globalRichest} with ${globalRichest$}`
          }
        ]
      }
    });
  }


























  try {

  if (msg === prefix + 'buy') {

    let category = [];

    if (!args.join(" ")) {

      for (var i in items) {

        if (!category.includes(items[i].type))
        category.push(items[i].type)

      }

    }

    const embed = new Discord.RichEmbed()
    .setDescription("Produits disponibles")
    .setColor("#fb0700")

    var tempDesc = '';

    for (var i = 0; i < category.lenght; i++) {
      if (category[i] === items[c].type) {
        tempDesc += `${items[c].name} - $${items[c].price} - ${items[c].desc}\n`;
      }
    }

    embed.addField(category[i], tempDesc);

  }
  message.channel.send({embed})

} catch(e) {
  message.reply(e.toString());
}








































  if (msg === prefix + 'guild') {

    var guildMoney = 0;
    var guildUsers = 0;
    var guildRichest = '';
    var guildRichest$ = 0;

    for (var i in userData) {
      if (i.endsWith(message.guild.id)) {
        guildMoney += userData[i].money;
        guildUsers += 1;
        if (userData[i].money > guildRichest$) {
          guildRichest$ = userData[i].money;
          guildRichest = userData[i].username;

        }
      }
    }

    message.channel.send({
      embed:{
        title: "Guild Stats",
        color: 0xff0000,
        fields:[
          {
            name:"Accounts",
            value:guildUsers,
            inline:true
          },{
          name:"Total Money",
          value:guildMoney,
          inline:true
          },{
          name: "Richest Account",
          value:`${guildRichest} with ${guildRichest$}`
          }
        ]
      }
    });
  }

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  });

  if(cmd === prefix + "help") {
      var help_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("Commands list : ")
        .setColor("#fb0700")
        .addField("help", "Affiche la liste des commandes possibles")
        .addField("rules", "Affiche les règles du serveur")
        .addField("botinfo", "Affiche les informations sur Geisha")
        .addField("links", "Affiche des liens utiles")
        .addField("money", "Affiche le contenu du porte monnaie")
        .addField("DAILY", "Recuperer sa récompense quotidienne")
        .addField("GUILD", "Affiche le Boss du serveur")
        .addField("GLOBAL", "Affiche le boss de tous les serveurs")
        .setFooter("Fin de la liste pour le moment");
      message.channel.send(help_embed);
      console.log("Commands");
  }

  // >links
  try {

    if(cmd === `${prefix}links`) {

      let linksembed = new Discord.RichEmbed()
      .setTitle("Liens Utiles")
      .setColor("#fb0700")
      .addField("+-------- CRACKS --------+","***")
      .addField("Crack de jeux", "https://cracked-games.org/")
      .addField("Statut des cracks des jeux", "https://crackwatch.com/")
      .addField("Tous les sites débloqués", "https://unblocked.vet/")
      .addField("+-------- COURS --------+","***")
      .addField("Cours de l'année", "https://github.com/TeamDynasty/IUT-Doua")
      .addField("Cours des années précedentes", "https://repo.kuro.ml/courses-s1.git/");

      return message.channel.send(linksembed);
    }
  } catch(e) {
    message.reply(e.toString());
  }


  // >rules
  try {
    if(cmd === `${prefix}rules`) {

      let rulesembed = new Discord.RichEmbed()
        .setTitle("Liste des Règles du Serveur")
        .setColor("#fb0700")
        .addField("Ne doit pas avoir de caractère pornographique sauf dans le channel dédié.", "***")
        .addField("Restez courtois, poli.", "***")
        .addField("Pas de spam.", "***")
        .addField("Pas de pub sur les différents chats sauf celui #pub.", "***");

      return message.channel.send(rulesembed);
    }
  } catch(e) {
    message.reply(e.toString());
  }

  // >botinfo
  if(cmd === `${prefix}botinfo`) {
    let botembed = new Discord.RichEmbed()
      .setDescription("Informations à propos de Geisha")
      .setColor("#fb0700")
      .addField("Codé en", "JavaScript")
      .addField("Codé par", "Neotoxic")
      .addField("Version ", "0.1");

    return message.channel.send(botembed);
  }
});


bot.login(process.env.BOT_TOKEN);
