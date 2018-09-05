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

    let botcommands = new Discord.Richembed()
    .setDescription("Comment puis-je vous aider ?")
    .setColor("#FB0700")
    .addField("Prefix :", ">")
    .addField("help :", "Affiche la liste des commandes")
    .addField("botinfo","Affiche les information sur le bot Geisha")

    return message.channel.send(botcommands)
  }

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.Richembed()
    .setDescription("Information de Geisha")
    .setColor("#FB0700")
    .setThumbnail(bicon)
    .addField("Nom du bot", bot.user.username)
    .addField("Codé en", "JavaScript")
    .addField("Codé par", "Neotoxic")
    .addField("Version ", "0.1")

    return message.channel.send(botembed);
  }


});


module.exports.run = async (bot,message,args) => {
  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dogembed = new Discord.RichEmbed()
  .setColor("#FB0700")
  .setTitle("Chien")
  .setImage(body.url);

  message.channel.send(dogembed);
}

bot.login(process.env.BOT_TOKEN);
