const Discord = require ("discord.js");
const fs = require ("fs");

module.exports.run = async (hikari, message, args) => {

   if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("No no no");
   if(!args[0] || args[0 == "help"]) return message.reply("El Comando es: h!prefix <l Prefix que Quieras>");

   let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));

   prefixes[message.guild.id] = {
     prefixes: args[0]
   };

   fs.writeFile("./prefix.json", JSON.stringify(prefixes), (err) => {
     if (err) console.log(err)
   });

   let sEmbed = new Discord.RichEmbed()
   .setColor("#FF9900")
   .setTitle("Prefix Set!")
   .setDescription(`Cambiado a ${args[0]}`);

   message.channel.send(sEmbed);


}

module.exports.help = {
  name: "prefix"
}
