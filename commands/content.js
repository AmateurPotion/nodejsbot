const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
    let stop = false;
    let jsonFiles = fs.readdirSync('./json');
    let kvStrs = ""
    let keys = [""];
    let files = [""];
    let index = 0, keyIndex = 0;

    jsonFiles.forEach(f => {
        if(f !== undefined) {
            files[index] = f;
            index++;
        }
        if(stop || args[0] === undefined || args[0] != f.split(".")[0]) return;

        let jsonBuffer = fs.readFileSync("./json/" + f);
        let jsonData = JSON.parse(jsonBuffer.toString(), (k, v) => {
            if(JSON.stringify(v).includes("{")) {
                keys[keyIndex] = k + "\n";
                keyIndex++;
            }
            return v;
        });

        if(jsonData[args[1]] !== undefined) {
            let value =  JSON.stringify(jsonData[args[1]]);
            console.log(`${args[1]} - ${value}`);
            JSON.parse(value, (k1, v1) => {
                if(args[2] !== undefined){
                    if(k1 === (args[2]+"")) kvStrs += `${k1} : ${JSON.stringify(v1)}\n`; 
                } 
                else kvStrs += `${k1} : ${JSON.stringify(v1)}\n`;
                return v1;
            });        
        }
    
        stop = true;
    });
    let helpImg = "https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png"

    if(!stop || args[0] === undefined) {
        message.channel.send("**content type is not found!**");
        let embed = new Discord.MessageEmbed().setAuthor("All Content Types", helpImg).setColor("#186de6");
        let str = "";
        files.forEach(f => str += `• !content **${str.replace(".json", "")}**\n`);
        embed.addField(`Commands`, str);
        message.channel.send(embed);
    }else if(args[1] === undefined){
        message.channel.send(`**${args[0]} content is not found!**`);
        let tmpStr = "";
        for(var str of keys){
            tmpStr += str;
            if(tmpStr.length >= Math.min(keys.length, 1000)){
                let embed = new Discord.MessageEmbed().setAuthor(`All ${args[0]} contents`, helpImg).setColor("#186de6");
                embed.addField("Values: ", tmpStr);
                message.channel.send(embed);
                tmpStr = "";
            }   
        }
    } else {
        let tmpStr = "";
        for(var str of kvStrs.split(",")){
            tmpStr += str + "\n";
            if(tmpStr.length >= Math.min(keys.length, 1000)){
                let embed = new Discord.MessageEmbed().setAuthor(args[0] + " - " + args[1], helpImg).setColor("#186de6");
                embed.addField("Values: ", tmpStr);
                message.channel.send(embed);
                tmpStr = "";
            }   
        }
    }
};

exports.name = "content";
exports.description = "show contents.\nex) !content, !content block, !content block air, !content block air health...";