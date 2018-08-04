const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (hikari,message,args) => {

  let {body} = await superagent
  .get(`http://aws.random.cat//meow`);

  let catembed = new Discord.RichEmbed()
  .setColor("#d4e20c")
  .setTitle("Cat :cat:")
  .setImage(body.file);

  message.channel.send(catembed);

}


module.exports.help = {
  name: "meow"
}
