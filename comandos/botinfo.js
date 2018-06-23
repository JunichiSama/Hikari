const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
  let botembed = new Discord.RichEmbed()
  .setAuthor(`📇Bot info`, hikari.user.avatarURL)
  .addField(`👑Dueño`, `JunichiSama`, true)
  .addField(`📁Version`, `1.0.0`, true)
  .addField(`📚Libreria`, `Discord ^11.3.2 (Js)`, true)

  .addField(`🔋Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField(`💓Servidores`, `${hikari.guilds.size.toLocaleString()}`, true)

  .addField(`👦Usuarios`, `${hikari.users.size.toLocaleString()}`, true)
  .addField(`📻Canales`, `${hikari.channels.size.toLocaleString()}`, true)
  .addField(`🔊Conexiones a voz`, `${hikari.voiceConnections.size}`, true)


    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}
