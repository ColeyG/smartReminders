const settings = require("./config.json");
const Discord = require('discord.js');
var moment = require('moment');
const client = new Discord.Client();
var cron = require('node-cron');
const axios = require('axios');

client.on('ready', () => {
    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log('You can add a discord bot here: '+link);
    });
});

client.on('message', message => {
    //Every time the server is messaged (no matter the channel) these events occur
    if(message.content.includes('t!')){
        let time=message.content.split(" ")[1];
        //message.channel.send("Counting");
        setTimeout(function(){message.channel.send(time)},time*60000);
    }
});

let reminderSchedule=[
    '00 10,11,12,13,14,15,16,17,18,19,20,21,22,23,00 * * *',
    '00 7,8,9,17,18,19,20,21,22,23,00 * * *'
];

reminderSchedule.forEach(element,()=>{
    cron.schedule(element,()=>{
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
                        newMessage+="  "+response.data[i].todo_time+"\n";
                    }
                }

                if(newMessage!=""){
                    guild.channels.get(settings.channelId).send("ToDo List:\n ========== "+schedMark+" \n"+newMessage);
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
});

client.login(settings.token);
