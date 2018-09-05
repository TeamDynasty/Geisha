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
    return message.channel.send("En quoi puis-je vous aider ?");
  }
})

bot.login(process.env.BOT_TOKEN);
