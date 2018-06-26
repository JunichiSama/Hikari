const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (hikari, message, args) => {

   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("No Puedes Usar este Comando!");
   let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   if(!wUser) return message.reply("No Pude Encontrar al Usuario");
   if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay too kewl");
   let reason = args.join(" ").slice(22);


   if(!warns[wUser.id]) warns[wUser.id] = {
     warns: 0
   };

   warns[wUser.id].warns++;

   fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
     if (err) console.log(err);
   });

   let warnEmbed = new Discord.RichEmbed()
   .setDescription("Advertencias")
   .setAuthor(message.author.username)
   .setColor("#b541f4")
   .addField("Usuario Advertido", `<@${wUser.id}>`)
   .addField("Advertido En", message.channel)
   .addField("Numero de Advertencias", warns[wUser.id].warns)
   .addField("Razon", reason);

   let warnchannel = message.guild.channels.find(`name`, "incidentes");
   if(!warnchannel) return message.reply("No Puedo Encontrar el Canal de Incidentes");

   warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Silenciado");
    if(!muterole) return message.reply("Debes de Crear el Rol Antes de Usar el Comando!");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`${wUser.tag} has sido Temporalmente Muteado`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`${wUser.tag} Puedes Volver a Hablar`)
    }, ms(mutetime))

  }
  if(warns[wUser.id].warns == 3){
    message.guild.members(wUser).ban(reason);
    message.reply(`${wUser.tag} has sido Baneado.`)


  }

}





module.exports.help = {
  name: "warn"
}
