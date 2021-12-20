import Discord from "discord.js";

// 네임스페이스는 나도 첨 써보는 거.
// 일단 코드들을 하나로 묶어서 기본 내보내기로 선언함.
// help 네임스페이스 안이라 할지라도 export 로 선언되지 않으면 private로 선언됨.
namespace help {
    // 일단 인자의 타입이 뭔질 모르겠어서 any로 해놓음.
    // 타입을 제대로 지정하면 자동완성의 도움이 지리니까 할 수 있다면 해놓는 걸 추천.
    export const run = (client: any, message: any, args: any[]) => {
        let helpImg = "https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png"
        let embed = new Discord.MessageEmbed().setAuthor("Avaliable Commands", helpImg).setColor("#186de6")
    
        let commandStr = ""
        client.commands.forEach((x: any) => commandStr += `• !${x.name} : **${x.description}**\n`);
        embed.addField("Commands: ", commandStr)
    
        message.channel.send(embed)
    };

    export const name = "help";
    export const description = "show avaliable commands";
}

export default help;