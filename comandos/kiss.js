const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
  let user = message.mentions.users.first();

      const gifs =
          ['https://data.whicdn.com/images/313951044/original.gif', 'https://data.whicdn.com/images/313017328/original.gif', 'https://data.whicdn.com/images/309485521/original.gif','https://data.whicdn.com/images/309403453/original.gif','https://data.whicdn.com/images/308168339/original.gif','https://data.whicdn.com/images/306547057/original.gif','https://data.whicdn.com/images/306079218/original.gif','https://data.whicdn.com/images/300366034/original.gif','https://data.whicdn.com/images/296167142/original.gif','https://data.whicdn.com/images/296186200/original.gif'];

       if (message.mentions.users.first() === message.author) return message.channel.send('Te Besas a ti solo que Asco');
      if (message.mentions.users.size < 1) return message.reply('**Primero tienes que Mencionar a Alguien.**').catch(console.error); //Para que mencione a alguien.
      message.channel.send({
          embed: {
              description: message.author.username + " **le a dado un Beso a** " + user.username,
              color: 15105570, //Puedes poner el color de tu preferencia.
              image: {
                  url: gifs[Math.floor(gifs.length * Math.random())]  //MathRandom para los gifs, pueden poner el rich embed, pero yo lo dejo así xD
              }
          }
      })

}

module.exports.help = {
  name: "kiss"
}
