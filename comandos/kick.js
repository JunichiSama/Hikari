const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("No Puedo Encontrar al Usuario!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No Tienes los Permisos!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Esta Persona no Puede ser Expulsada!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Usuario Expulsado", `${kUser} with ID ${kUser.id}`)
    .addField("Expulsado Por", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Expulsado En", message.channel)
    .addField("Hora", message.createdAt)
    .addField("Razon", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidentes");
    if(!kickChannel) return message.channel.send("No Encuentro el Canal de Incidentes.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
