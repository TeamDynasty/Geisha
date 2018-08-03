// CONNEXION ///////////////////////////////////////////////////

const Discord = require('discord.js');
const ms = require('ms');
const fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./warnlist.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("I don't have the rights");
  let wUser = message.guild.member(message.mentions.user.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("I can't find this user");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This user can't be warn");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnlist.json", JSON.stringify(warns) (err) => {
    if(err) console.log(err);
  });
  let warnEmbed = new Discord.RichEmbed()
  .setDescription("~ WARNS ~")
  .setAuthor(message.author.username)
  .setColor("#FF1493")
  .addField("Warned user", wUser.tag)
  .addField("Number of Warns", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "incidents");
  if(!warnchannel) return message.reply("I can't find the channel");

  warnchannel.send(warnEmbed)
  if(warns[wUser.id].warns ==2) {
    message.channel.send(`${wUser} has been warned`);
  }
  if(warns[wUser.id].warns ==2) {

  }





}

module.exports.help = {
  name: "warn"
}
