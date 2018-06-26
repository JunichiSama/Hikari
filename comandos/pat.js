const Discord = require("discord.js");

module.exports.run = async (hikari, message, args) => {
  let user = message.mentions.users.first();

      const gifs =
          ['https://data.whicdn.com/images/297125597/original.gif', 'https://data.whicdn.com/images/161104388/original.gif', 'https://data.whicdn.com/images/40580957/original.gif','https://data.whicdn.com/images/223429621/original.gif','https://data.whicdn.com/images/125164822/original.gif','https://i.gifer.com/7MOk.gif','http://gifimage.net/wp-content/uploads/2018/04/kanna-gif-3.gif'];

       if (message.mentions.users.first() === message.author) return message.channel.send('Se Acaricia solo la Cabeza que Raro');
      if (message.mentions.users.size < 1) return message.reply('**Primero tienes que Mencionar a Alguien.**').catch(console.error); //Para que mencione a alguien.
      message.channel.send({
          embed: {
              description: message.author.username + " **le acaricio la Cabeza a** " + user.username,
              color: 15105570, //Puedes poner el color de tu preferencia.
              image: {
                  url: gifs[Math.floor(gifs.length * Math.random())]  //MathRandom para los gifs, pueden poner el rich embed, pero yo lo dejo así xD
              }
          }
      })

}

module.exports.help = {
  name: "pat"
}
