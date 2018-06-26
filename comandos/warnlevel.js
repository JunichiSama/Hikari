const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (hikari, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No Puedes Hacer Eso");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("No Puedo Encontrar al Usuario");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> tiene ${warnlevel} Advertecias`);

}

module.exports.help = {
  name: "warnlevel"
}
