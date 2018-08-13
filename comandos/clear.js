const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("oof.");
    if(!args[0]) return message.channel.send("oof")
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Desechos ${args[0]} Mensajes.`).then(msg => msg.delete(5000));
    });

}

module.exports.help = {
  name: "clear"
}
