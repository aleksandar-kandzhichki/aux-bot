import Discord from 'discord.js';
import auth from './../auth.json';

const AppClient = new Discord.Client();
AppClient.login(auth.token);

export default AppClient;