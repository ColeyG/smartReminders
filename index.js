const settings = require("./config.json");
const Discord = require('discord.js');
var moment = require('moment');
const client = new Discord.Client();
var cron = require('node-cron');
const axios = require('axios');

let basdfeep;

client.on('ready', () => {
    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log('You can add a discord bot here: '+link);
    });

    let guild = client.guilds.get(settings.guildId);
        if(guild && guild.channels.get(settings.channelId)){
            guild.channels.get(settings.channelId).send("Server on!");
        }
});

client.on('message', message => {
    //Every time the server is messaged (no matter the channel) these events occur
    if(message.content.includes('t!')){
        let time=message.content.split(" ")[1];
        message.channel.send("Got it");
        setTimeout(function(){message.channel.send(time)},time*60000);
    }
    
    if(message.content.includes('tp!')){
        let time=message.content.split(" ")[1];
        let actionItem=message.content.split(" ")[2];
        message.channel.send("Got it");
        setTimeout(function(){message.channel.send(actionItem)},time*60000);
    }
    
    if(message.content.includes('tp!')){
        let time=message.content.split(" ")[1];
        let actionItem=message.content.split(" ")[2];
        message.channel.send("Got it");
        setTimeout(function(){message.channel.send(actionItem)},time*60000);
    }
});

let reminderSchedule=[
    '00 8,9,11,13,15,17,18,19,20,21,22,23 * * 1,2,3,4,5',
    '00 11,12,13,14,15,16,17,18,19,20,21,22,23 * * 0,6'
];

reminderSchedule.forEach((element)=>{
    cron.schedule(element,()=>{
        let guild = client.guilds.get(settings.guildId);
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
                    guild.channels.get(settings.channelId).send("ToDo List:\n ========== "+" \n"+newMessage);
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
