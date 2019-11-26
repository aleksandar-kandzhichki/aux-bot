import Discord from 'discord.js';
import auth from './auth.json';


const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  if (msg.content == "summary") {
    msg.reply(" Summaryzing ")
  }
});

client.login(auth.token);
