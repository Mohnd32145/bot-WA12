import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'م11') {
        let taguser = m.sender.split('@')[0];

        let menu = `❰･ اوامر التحميل ･❱
 ⚇━━━❰･𓃦･❱━━━⚇
*\`『 منور يا 』: \`*${taguser}
*\`『قبل كتابة اي امر حط نقطه』\`*
*\`『 التريخ 』: \`* ${date}
*\`『 المطور 』: \`* ♯𝚃𝙴𝚁𝙱𝚘
⚇━━━❰･𓃦･❱━━━⚇
❐┇👾❯ ⸢ صوره ⸥ 
> لتحميل الصور من الإنترنت  
❐┇👾❯ ⸢ اغنيه / ريك ⸥ 
> لتحميل المقاطع الصوتية  
❐┇👾❯ ⸢ فيديو ⸥ 
> لتحميل الفيديوهات  
❐┇👾❯ ⸢ ايديت ⸥ 
> لتحميل الفيديوهات المعدلة  
❐┇👾❯ ⸢ مقطع ⸥ 
> لتحميل مقاطع قصيرة  
❐┇👾❯ ⸢ جوجل ⸥ 
> للبحث في جوجل  
❐┇👾❯ ⸢ انستا ⸥ 
> لتحميل من إنستجرام  
❐┇👾❯ ⸢ تيك ⸥ 
> لتحميل من تيك توك  
┗━━━━━━━❰･𓃦･❱━━━━━━━┛
`;

        let imagePath = './م11.jpg';
        conn.sendMessage(m.chat, { 
            image: fs.readFileSync(imagePath), 
            caption: menu, 
            mentions: [m.sender] 
        });
    }
};

handler.help = ['م11'];
handler.tags = ['download'];
handler.command = ['م11'];
handler.fail = null;

export default handler;