const settings = require("./config.json");
const Discord = require('discord.js');
var moment = require('moment');
const client = new Discord.Client();
var cron = require('node-cron');
const axios = require('axios');

axios.get('http://localhost/smartReminders/endpoint/responder.php')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
});

client.on('ready', () => {
    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log('You can add a discord bot here: '+link);
    });
});

client.on('message', message => {
    //Every time the server is messaged (no matter the channel) these events occur
    //if(message.content!='😎'){message.channel.send('😎');}
});

cron.schedule('00 9,10,11,12,13,14,15,16,17,18,19,20,21 * * *', () => {
  var guild = client.guilds.get(settings.guildId);
        if(guild && guild.channels.get(settings.channelId)){
            guild.channels.get(settings.channelId).send("message at: "+moment().unix());
            console.log("auto-message success "+moment().unix());
        } else {
            console.log("auto-message failed "+moment().unix());
        }
});

client.login(settings.token);
