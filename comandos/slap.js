const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
  let user = message.mentions.users.first();

       const gifs =
           ['https://data.whicdn.com/images/310450289/original.gif', 'https://data.whicdn.com/images/247198955/original.gif', 'https://data.whicdn.com/images/80922831/original.gif','https://data.whicdn.com/images/121785575/original.gif','https://data.whicdn.com/images/65838405/original.gif','https://data.whicdn.com/images/32395040/original.gif','https://i.gifer.com/9Ky6.gif','http://www.9thcx.com/wp-content/uploads/2014/11/Slap.gif','https://i.pinimg.com/originals/1c/8f/0f/1c8f0f43c75c11bf504b25340ddd912d.gif'];

       if (message.mentions.users.first() === message.author) return message.channel.send('Estas Bien Porque te Golpeas a ti Mismo?');
       if (message.mentions.users.size < 1) return message.reply('**Primero tienes que Mencionar a Alguien.**').catch(console.error); //Para que mencione a alguien.
       message.channel.send({
           embed: {
               description: message.author.username + " **le a dado un Slap a** " + user.username,
               color: 15105570, //Puedes poner el color de tu preferencia.
               image: {
                   url: gifs[Math.floor(gifs.length * Math.random())]  //MathRandom para los gifs, pueden poner el rich embed, pero yo lo dejo así xD
               }
           }
       })

}

module.exports.help = {
  name: "slap"
}
