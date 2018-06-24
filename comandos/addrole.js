const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) =>{

   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("No Tienes los Permisos para Realizar esta Accion!");
   let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   if(!rMember) return message.reply("No Encontre al Usuario");
   let role = args.join(" ").slice(22);
   if(!role) return message.reply("Especifica un Rol");
   let gRole = message.guild.roles.find(`name`, role);
   if(!gRole) return message.reply("No Encontre el Rol que Especificaste");

  if(rMember.roles.has(gRole.id)) return message.reply("Ellos ya tienen el Rango que Especificaste");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Felicidades Has Recibido el Rol ${gRole.name}`)
  }catch(e){
  message.channel.send(`Felicidades a <@${rMember.id}> conseguiste el rol  ${gRole.name}. Intentamos Mandarte un Mensaje Privado pero estaban Bloqueados`);
 }
}

module.exports.help = {
  name: "addrole"
}
