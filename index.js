// INVITE //// https://discordapp.com/oauth2/authorize?client_id=473232322129428500&scope=bot&permissions=445440

const Discord = require('discord.js');
const bot = new Discord.Client();

// LOGIN///////////////////////////////////////////////////


bot.login(process.env.BOT_TOKEN);

bot.on("ready", () => {
    console.log("Online ✔")
    bot.user.setGame("waiting for instructions.");
});


// VARIABLES ///////////////////////////////////////////////////


bot.on('message', message => {
  let sender = message.author;
  let msg = message.content;
  let msgu = message.content.toUpperCase();
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);



  let prefix = ">"



  if (msgu.startsWith(prefix + 'purge')) {
    async function purge() {
      message.delete();






      if (isNaN(args[0])) {
        message.channel.send('Aucun nombre selectionné');
        return;
      }

      const fetched = await message.channel.fetchMessages({limit: args[0]});
      console.log(fetched.size + ' messages trouvés, nettoyage ...');

      message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Erreur : ${error}`));
    }

    purge();

  }
});
