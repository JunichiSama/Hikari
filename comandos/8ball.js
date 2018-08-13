const Discord = require("discord.js")

module.exports.run = async (hikari, message, args) => {

 if(!args[0]) return message.reply("No Entiendo tu Pregunta");
 let replies = ["Si ", "No", "No Se", "Pregunta mas Tarde", "Tal Vez"];

 let results = Math.floor((Math.random() * replies.length));
 let question = args.slice(1).join(" ");

 let ballembed = new Discord.RichEmbed()
 .setAuthor(message.author.tag)
 .setColor("#495676")
 .addField("Pregunta", question)
 .addField("Respuesta", replies[results]);

 message.channel.send(ballembed);


}


module.exports.help = {
  name: "8ball"
}
