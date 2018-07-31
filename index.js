// VARIABLES ///////////////////////////////////////////////////
// ADRESSE //// https://discordapp.com/oauth2/authorize?client_id=473232322129428500&scope=bot&permissions=445440

const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db')
const fs = require('fs');
const moment = require('moment');


// CONNEXION ///////////////////////////////////////////////////


bot.login(process.env.BOT_TOKEN);

bot.on("ready", () => {
    console.log("Online ✔")
    bot.user.setGame("Waits for instructions");
});


// VARIABLES ///////////////////////////////////////////////////


bot.on('message', message => {
  let sender = message.author;
  let msg = message.content;
  let msgu = message.content.toUpperCase();







  let prefix = "§"


  if(msg === prefix + "command"){
      var help_embed = new Discord.RichEmbed()
      .setColor("#FF0000")
      .setTitle("Commands list : ")
      .addField("$cmd", "Show bot commands")
      .setFooter("End of the list")
      message.channel.sendMessage(help_embed);
      console.log("Commands")
  }

});
