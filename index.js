const hikariconfig = require ("./hikariconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const hikari = new Discord.Client({disableEveryone: true});
hikari.commands = new Discord.Collection();

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

hikari.on("message", async message =>{

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = hikariconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = hikari.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(hikari,message,args);
});


hikari.login(hikariconfig.token);
