const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (hikari, message, args) => {

  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!toMute) return message.reply("No Encontre al Usuario.");
  if(toMute.hasPermission("MUTE_MEMBERS")) return message.reply("No Puedes Mutearlo");
  let muterole = message.guild.roles.find("name", "Silenciado");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name:"Silenciado",
        color:"#646b75",
        permissions:[]
      })
      message.guild.channels.forEach(async(channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply("No Especificaste un Tiempo!");

  await(toMute.addRole(muterole.id))
  message.reply(`<@${toMute.id}> ha Sido Muteado for ${ms(mutetime)}`);

  setTimeout(function(){
    toMute.removeRole(muterole.id);
    message.channel.send(`<@${toMute.id}> Puedes Hablar de Nuevo`);
  }, ms(mutetime));
}

module.exports.help = {
  name: "tempmute"
}
