// VARIABLES ///////////////////////////////////////////////////
// ADRESSE //// https://discordapp.com/oauth2/authorize?client_id=473232322129428500&scope=bot&permissions=445440

const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');


// CONNEXION ///////////////////////////////////////////////////


bot.login(process.env.BOT_TOKEN);

bot.on("ready", () => {
    console.log("Online ✔")
    bot.user.setGame("waits for instructions");
});


// VARIABLES ///////////////////////////////////////////////////


bot.on('message', message => {
  let sender = message.author;
  let msg = message.content;
  let msgu = message.content.toUpperCase();



  let prefix = "§"

// KICK ////////////////////////////////////////////////////////


if (msg === prefix + 'kick') {


  let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!kUser) return message.channel.send("Can't find user, sorry Master.");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don't have the rights.")
  if(kUser.hasPermission) return mesage.channel.send("I can't Kick an Administrator.")

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("§ KICK §")
  .setColor("#FF0000")
  .addField(`${kUser}`, "has been kicked", )
  .addField("Kicked by", `@${message.author.id}` )
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "incidents");
  if(!kickChannel) return message.channel.send("Can't find incidents channel.")


  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;
}

  if (msg === prefix + 'help'){


    var help_embed = new Discord.RichEmbed()
    .setColor("#FF1493")
    .setTitle("My instructions : ")
    .addField("§help", "Show my instructions")
    .setFooter("Ask me Master")
    message.channel.sendMessage(help_embed);
    console.log("Commands")
}

})
