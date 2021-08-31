const Discord = require('discord.js'); 
const sys = require('sys');
const process = require('child_process');


exports.run = (client, message, args) => {
    message.reply(`${client.ws.ping}ms`);
    message.reply("pong!");
    if(args[0] !== undefined) 
        process.exec(`ping ${args[0]}`, (err, stdout, stderr) => {
            console.log(stdout);
            message.channel.send(stdout);
            console.log(stderr);
            message.channel.send(stderr);
        });
};

exports.name = 'ping';
exports.description = 'check bot status';