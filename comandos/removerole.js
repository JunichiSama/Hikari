const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) =>{
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("No Tienes los Permisos para Realizar esta Accion!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("No Encontre al Usuario");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Especifica un Rol");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("No Encontre el Rol que Especificaste");

 if(!rMember.roles.has(gRole.id)) return message.reply("No Tienes el Rango Especificado");
 await(rMember.removeRole(gRole.id));

 try{
   await rMember.send(`Lo Siento, pero debido a tu comportamiento te hemos decido sacar tu rol ${gRole.name} agradece que no te sacamos la vida, Gracias por tu Atencion`)
 }catch(e){
 message.channel.send(`Mira Gil <@${rMember.id}> Te Quitamos el Rol  ${gRole.name}. Intentamos Mandarte un Mensaje Privado pero como te Crees Importante los tenes Bloqueados`);
 }
}

module.exports.help = {
  name: "removerole"
}
