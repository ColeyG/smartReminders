const settings = require("./config.json");
const Discord = require('discord.js');
var moment = require('moment');
const client = new Discord.Client();
var cron = require('node-cron');
const axios = require('axios');

axios.get('http://localhost/smartReminders/endpoint/responder.php')
            .then(function (response) {
                console.log(response.data[0]);
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

let goodSchedule = '00 9,10,11,12,13,14,15,16,17,18,19,20,21 * * *';
let testSchedule = '* * * * *';

cron.schedule(goodSchedule, () => {
  var guild = client.guilds.get(settings.guildId);
        if(guild && guild.channels.get(settings.channelId)){

            axios.get('http://colegeerts.com/endpoint/responder.php')
            .then(function (response) {
                let nothingMessage = "Nothing to display";
                let newMessage="";

                for(let i=0;i<response.data.length;i++){
                    newMessage+=response.data[i].todo_thing;
                    if(response.data[i].time==" "){
                        newMessage+="\n";
                    }else{
                        newMessage+=" at: "+response.data[i].todo_time+"\n";
                    }
                }

                if(newMessage!=""){
                    guild.channels.get(settings.channelId).send("ToDo List:\n ========== \n"+newMessage);
                }else{
                    guild.channels.get(settings.channelId).send(nothingMessage);
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });

            console.log("auto-message success "+moment().unix());
        } else {
            console.log("auto-message failed "+moment().unix());
        }
});

client.login(settings.token);
