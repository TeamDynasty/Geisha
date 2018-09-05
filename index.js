// ADRESSE //// https://discordapp.com/oauth2/authorize?client_id=473232322129428500&scope=bot&permissions=445440

var Discord = require('discord.js');
var bot = new Discord.Client();

// LOGIN ///////////////////////////////////////////////////

bot.login(process.env.BOT_TOKEN);

// START ////////////////////////////////////////////////

bot.on("message", message => {
  var sender = message.author;
  var msgu = message.content.toUpperCase();
  var prefix = '>'







  if (sender.id === '473232322129428500') {
    return;
  }





// HELP ////////////////////////////////////////////////////


  if (msgu === prefix + 'help') {
    message.channel.send('Comment puis - je vous aider ?')
  }







// BAN WORDS ////////////////////////////////////////////

if (msgu.includes('cul')) {
  message.delete();
  message.author.send('Le mot utilisé est inapproprié ')
}

});


// READY /////////////////////////////////////////////////

bot.on('ready', () => {
  console.log('Bot launched')
});
