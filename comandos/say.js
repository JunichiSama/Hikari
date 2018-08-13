const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nope.");
  let botmessages = args.join(" ");
  message.delete().catch();
  message.channel.send(botmessages);

}

module.exports.help = {
  name: "say"
}
