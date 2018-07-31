const db = require('quick.db');
exports.run = (client, message, args, tools) => {

  let member = message.mentions.members.first() || message.member;
  db.fetchObject(`messageSent_${member.id}`).then(obj =>{
    message.channel.send(`Messages sent : \`${obj.value}\``);


  })

}
