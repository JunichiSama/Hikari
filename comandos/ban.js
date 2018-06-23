const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("No Puedo Encontrar al Usuario!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No Tienes los Permisos Nesesarios!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Esta Persona no Puede Ser Baneada!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Usuario Baneado", `${bUser} with ID ${bUser.id}`)
    .addField("Baneado Por", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Baneado En", message.channel)
    .addField("Hora", message.createdAt)
    .addField("Razon", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidentes");
    if(!incidentchannel) return message.channel.send("No Encuentro el Canal de Incidentes.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
