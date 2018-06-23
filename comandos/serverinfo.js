const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
    let sicon = message.guild.iconURL;
    let totalBot = message.guild.members.filter(member => member.user.bot).size;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Informacion del Servidor")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nombre del Servidor", message.guild.name)
    .addField("Fecha de Creacion", message.guild.createdAt)
    .addField("Te Uniste", message.member.joinedAt)
    .addField("Total de Miembros", message.guild.memberCount)
    .addField("Total de Bots", totalBot);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
