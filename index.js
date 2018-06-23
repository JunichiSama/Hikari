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

 if(cmd === `${prefix}report` ){


 let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 if(!rUser) return message.channel.send("No Puedo Encontrar a ese Usuario.");
 let reason = args.join("  ").slice(22);

 let reportEmbed = new Discord.RichEmbed
 .setDescription("Reportes")
 .setColor("#f44242")
 .addField("Usuario Reportado", `${rUser}` )




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
