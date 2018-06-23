const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("No Puedo Encontrar al Usuario.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reportes")
    .setColor("#15f153")
    .addField("Usuario Reportado", `${rUser} with ID: ${rUser.id}`)
    .addField("Reportado Por", `${message.author} with ID: ${message.author.id}`)
    .addField("Canal", message.channel)
    .addField("Hora del Reporte", message.createdAt)
    .addField("Razon", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reportes");
    if(!reportschannel) return message.channel.send("No Puedo Encontrar el Canal de Reportes.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
