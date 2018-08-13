const hikariconfig = require ("./hikariconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const hikari = new Discord.Client({disableEveryone: true});
hikari.commands = new Discord.Collection();
let coins = require ("./coins.json");

fs.readdir("./comandos/", (err, files) =>{

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("No Encontre Ningun Comando");
    return;
  }


  jsfile.forEach((f, i) =>{
  let props = require(`./comandos/${f}`);
  console.log(`${f} Cargado!`);
  hikari.commands.set(props.help.name, props);
  });
});

hikari.on("ready", async () => {
  console.log(`${hikari.user.username} esta en liñea en ${hikari.guilds.size} servidores!`);
  hikari.user.setActivity("a JunichiSama", {type: "WATCHING"});
});

hikari.on("guildMemberAdd", async member => {
  console.log(`${member.id} se ha unido al servidor`);

  let welcomechannel = member.guild.channels.find(`name`, "entrada-salida");
  welcomechannel.send(`Bienvenido ${member} al Servidor de Abyss Illusion`);
});

hikari.on("guildMemberRemove", async member => {
  console.log(`${member.id} a dejado el servidor`);

  let welcomechannel = member.guild.channels.find(`name`, "entrada-salida");
  welcomechannel.send(`Me Pones Triste al Saber que te vas de Abyss Illusion ${member}`);
});

hikari.on("channelCreate", async channel => {

  console.log(`${channel.name} a sido creado`);
  let sChannel = channel.guild.channels.find(`name`, "registros");
  sChannel.send(`El Canal ${channel} a sido creado!`);

});

hikari.on("channelDelete", async channel => {

  console.log(`${channel.name} a sido borrado`);
  let sChannel = channel.guild.channels.find(`name`, "registros");
  sChannel.send(`El Canal ${channel.name} a sido Borrado de este Servidor!`);

});

hikari.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: hikariconfig.prefix
    };
  }

  if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins:0
  };
}

let coinAmt = Math.floor(Math.random() * 15) + 1;
let baseAmt = Math.floor(Math.random() * 15) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);

if(coinAmt === baseAmt){
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmt
  };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💰", `${coinAmt} Monedas Añadidas`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}

let prefix = prefixes[message.guild.id].prefixes;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = hikari.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(hikari,message,args);
});


hikari.login(hikariconfig.token);
