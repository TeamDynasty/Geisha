// CONNEXION ///////////////////////////////////////////////////

const botconfig = require("./botconfig.json")
const items = require("./items.json");
const Discord = require('discord.js');
const economy = require('discord-eco');
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const modRole = 'Admin';

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
  let cont = message.content.slice(prefix.length).split(" ");
  let arg = cont.slice(1);


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


  if (msg === prefix + 'givemoney') {

    if (!message.member.roles.find("name", modRole)) {
      message.channel.send("** You don't have the rights to do that, you need Admin Role**");
      return;
    }


    if (!arg[0]) {
      message.channel.send("** Define an amount ! Usage: >givemoney <amount> <user>");
      return;
    }

    if (isNan(arg[0])) {
      message.channel.send('The amount has to be a number ! Usage: >givemoney <amount> <user>');
      return;
    }


    let defineduser = '';
    if (!arg[1]) {
      defineduser = message.auhtor.id;
    } else {
      let firstMentionned = message.mentions.users.first();
      defineduser = firstMentionned.id;
    }

    economy.updateBalance(defineduser + message.guild.id, arg[0]).then((i) => {
      message.channel.send(`**User defined had ${arg[0]} added from their account**`)
    })

  }








  if (msg === prefix + 'money' || msg === prefix + 'balance') {
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

        if (!category.includes(items[i].type)) category.push(items[i].type);

      }

    }



















    const embed = new Discord.RichEmbed()
    .setDescription("Products availables")
    .setColor("#fb0700");

    for (var i = 0; i < category.length; i++) {
      var tempDesc = '';
      for(var c in items) {
        if (category[i] === items[c].type) {
          tempDesc += `${items[c].name} - $${items[c].price} - ${items[c].desc}\n`;
        }
      }
      embed.addField(category[i], tempDesc);
    }


    return message.channel.send({embed});
  }







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
        .addField("help", "Show commands possibles")
        .addField("rules", "Show the rules of the server")
        .addField("botinfo", "Show informations about the bot > Geisha <")
        .addField("links", "Show useful links")
        .addField("money", "Show the content of the wallet")
        .addField("daily", "Get the daily reward")
        .addField("guild", "Show the boss of the Serveur")
        .addField("global", "Show the boss of all the serveurs")
        .setFooter("End of the list for the moment");
      message.channel.send(help_embed);
      console.log("Commands");
  }

  // >links
  try {

    if(cmd === `${prefix}links`) {

      let linksembed = new Discord.RichEmbed()
      .setTitle("Useful links")
      .setColor("#fb0700")
      .addField("+-------- Links Neotoxic --------+","***")
      .addField("Github", "https://github.com/TeamDynasty");

      return message.channel.send(linksembed);
    }
  } catch(e) {
    message.reply(e.toString());
  }


  // >rules

  try {
    if(cmd === `${prefix}rules`) {

      let rulesembed = new Discord.RichEmbed()
        .setTitle("Rules of the server")
        .setColor("#fb0700")
        .addField("Must not be pornographic messages or pictures except in the dedicated channel", "***")
        .addField("Stay courteous, polite", "***")
        .addField("No spam", "***")
        .addField("No ads on different cats except the one #pub", "***");

      return message.channel.send(rulesembed);
    }
  } catch(e) {
    message.reply(e.toString());
  }

  // >botinfo

  if(cmd === `${prefix}botinfo`) {
    let botembed = new Discord.RichEmbed()
      .setDescription("Informations about > Geisha <")
      .setColor("#fb0700")
      .addField("Coded in JavaScript", "***")
      .addField("Coded by Neotoxic", "***")
      .addField("Version 0.2.0", "***");

    return message.channel.send(botembed);
  }
});


bot.login(process.env.BOT_TOKEN);
