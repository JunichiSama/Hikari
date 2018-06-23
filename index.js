const hikariconfig = require ("./hikariconfig.json");
const Discord = require("discord.js");

const hikari = new Discord.Client({disableEveryone: true});

hikari.on("ready", async () => {
  console.log(`${hikari.user.username} is online!`);
  hikari.user.setActivity("a JunichiSama", {type: "WATCHING"});
});

hikari.on("message", async message =>{

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = hikariconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){


  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("No Puedo Encontrar al Usuario.");
  let kReason = args.join("  ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No Puedes usar el Comando!");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Esa Persona no Puede ser Expulsada");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  .setColor("#f44242")
  .addField("Usuario Expulsado", `${kUser} with ID ${kUser.id} `)
  .addField("Expulsado Por", `<@${message.author.id}> with ID ${message.author.id} `)
  .addField("Expulsado En", message.channel)
  .addField("Hora", message.createdAt)
  .addField("Razon", kReason);

  let kickChannel = message.guild.channels.find("name", "incidentes");
  if(!kickChannel) return message.channel.send("No Encuentro el Canal de Incidentes!");


 message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
    return;
  }

 if(cmd === `${prefix}report`){


 let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 if(!rUser) return message.channel.send("No Puedo Encontrar a ese Usuario.");
 let reason = args.join("  ").slice(22);

 let reportEmbed = new Discord.RichEmbed()
 .setDescription("Reportes")
 .setColor("#f44242")
 .addField("Usuario Reportado", `${rUser} with ID:${rUser.id} ` )
 .addField("Reportado Por", `${message.author} with ID:${message.author.id}`)
 .addField("Canal", message.channel)
 .addField("Hora del Reporte", message.createdAt)
 .addField("Razon del Reporte" , reason);

 let reportsChannel = message.guild.channels.find(`name`, "reportes");
 if(!reportsChannel) return message.channel.send("No Puedo Encontrar el Canal.");

 message.delete().catch(O_o=>{});
 reportsChannel.send(reportEmbed);
   return;
 }

if(cmd === `${prefix}serverinfo`){

 let totalBot = message.guild.members.filter(member => member.user.bot).size;
 let sicon = message.guild.iconURL;
 let serverembed = new Discord.RichEmbed()
 .setDescription("Informacion del Servidor")
 .setThumbnail(sicon)
 .setColor("#f44242")
 .addField("Nombre del Servidor", message.guild.name)
 .addField("Fecha de Creacion", message.guild.createdAt)
 .addField("Te Uniste El Dia", message.member.joinedAt)
 .addField("Total de Usuarios Unidos", message.guild.memberCount)
 .addField("Total de Bots", totalBot);
  return message.channel.send(serverembed);
}



 if(cmd === `${prefix}botinfo`){
 let bicon = hikari.user.displayAvatarURL
 let botembed = new Discord.RichEmbed()
 .setDescription("Informacion del Bot")
 .setColor("#f44242")
 .setThumbnail(bicon)
 .addField("Nombre del Bot", hikari.user.username)
 .addField("Fecha de Creacion", hikari.user.createdAt);

   return message.channel.send(botembed);
 }

});


hikari.login(hikariconfig.token);
