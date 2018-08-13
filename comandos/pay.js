const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (hikari, message, args) => {


   if(!coins[message.author.id]){
     return message.reply("No Tienes Monedas para Pagar!")
   }

   let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

   if(!coins[pUser.id]){
     coins[pUser.id] = {
       coins:0
     };
   }

   let pCoins = coins[pUser.id].coins;
   let sCoins = coins[message.author.id].coins;

   if(sCoins < args[0]) return message.reply("No Tienes Monedas!");

   coins[message.author.id] = {
     coins: sCoins - parseInt(args[1])
   };
 coins[pUser.id] = {
   coins: pCoins + parseInt(args[1])
 };

 message.channel.send(`${message.author} le ha pagado a ${pUser} ${args[1]} monedas. `);

 fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
   if(err) console.log(err)
 });

}


module.exports.help = {
  name: "pay"
}
