import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {

    if (command === 'م10') {  

        let taguser = m.sender.split('@')[0];  

        let menu = `❰･ اوامر الذكاء ･❱
 ⚇━━━❰･𓃦･❱━━━⚇
*\`『 منور يا 』: \`*${taguser}
*\`『قبل كتابة اي امر حط نقطه』\`*
*\`『 التريخ 』: \`* ${date}
*\`『 المطور 』: \`* ♯𝚃𝙴𝚁𝙱𝚘
⚇━━━❰･𓃦･❱━━━⚇
❐┇🤖❯ ⸢ كيلوا ⸥ 
❐┇🤖❯ ⸢ ديب ⸥ 
❐┇🤖❯ ⸢ ترجم ⸥ 
❐┇🤖❯ ⸢ فلكس ⸥ 
❐┇🤖❯ ⸢ يوريتشي ⸥ 
❐┇🤖❯ ⸢ ليما ⸥ 
❐┇🤖❯ ⸢ جبتي ⸥ 
❐┇🤖❯ ⸢ ايتاشي ⸥ 
  ┗━━━━━━━❰･𓃦･❱━━━━━━━┛
`;

        let imagePath = './م10.jpg'; // تأكد من وجود الصورة في مجلد السكربت

        conn.sendMessage(m.chat, {   
            image: fs.readFileSync(imagePath),   
            caption: menu,   
            mentions: [m.sender]   
        });  
    }

};

handler.help = ['م10'];
handler.tags = ['ai'];
handler.command = ['م10'];
handler.fail = null;

export default handler;