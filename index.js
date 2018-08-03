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
  
  
  // DOG ////////////////////////////////////////////////////////

let {body} = await superagent
.get('https://random.dog/woof.json')
let dogembed = new Discord.RichEmbed()
.setColor("#FF1493")
.setTitle("A kawaii Dog 🐕")
.setImage(body.url);

if(msg === prefix + 'dog') {



  message.channel.send(dogembed)

}

  
 
    
    
     
    

  if (msg === prefix + 'rules'){


    var help_embed = new Discord.RichEmbed()
    .setColor("#FF1493")
    .setTitle("The rules : ")
    .addField("- Do not insult users as well as the staff of the server.", "_________________________________________________________________")
    .addField("- The repetition of a word or character will be considered spam if it exceeds 5 times in 5 min.", "_________________________________________________________________")
    .addField("- Spam is not alowed.", "_________________________________________________________________")
    .addField("- Users who abuse their roles will be warned and banned after 5 MANUAL warnings.", "_________________________________________________________________")
    .addField("- Do not respond to Bots.", "_________________________________________________________________")
    .addField("- No ads on the different channels and no link.", "_________________________________________________________________")
    .addField("- Your username must not be similar to that of a staff member.", "_________________________________________________________________")
    .addField("- Do not send pornographic comments.", "_________________________________________________________________")
    .addField("- For a simple request, address directly to the administrators if present or for an important request address to the Founder in private message.", "_________________________________________________________________")
    .setFooter("Enjoy")
    message.channel.sendMessage(help_embed);
    console.log("Rules")
}




  if (msg === prefix + 'help'){


    var help_embed = new Discord.RichEmbed()
    .setColor("#FF1493")
    .setTitle("My instructions : ")
    .addField("§help", "Show my instructions")
    .addField("§rules", "Show the rules of the server")
    .setFooter("Ask me Master")
    message.channel.sendMessage(help_embed);
    console.log("Commands")
}

})
