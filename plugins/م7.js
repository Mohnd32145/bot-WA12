import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {

    if (command === 'م7') {
        let taguser = m.sender.split('@')[0];

        let menu = `❰･ اوامر الدين ･❱
 ⚇━━━❰･𓃦･❱━━━⚇
*\`『 منور يا 』: \`*${taguser}
*\`『قبل كتابة اي امر حط نقطه』\`*
*\`『 التريخ 』: \`* ${date}
*\`『 المطور 』: \`* ♯𝚃𝙴𝚁𝙱𝚘
⚇━━━❰･𓃦･❱━━━⚇
❐┇🕋❯ ⸢ سوره ⸥   
> لتشغيل سورة قرآنية صوتياً  
❐┇🕋❯ ⸢ اسماء_الله ⸥   
> لعرض أسماء الله الحسنى  
❐┇🕋❯ ⸢ حديث ⸥    
> للحصول على حديث نبوي شريف  
❐┇🕋❯ ⸢ دعاء ⸥   
> للحصول على دعاء إسلامي  
❐┇🕋❯ ⸢ سؤال_ديني ⸥   
> لاختبار معلوماتك الدينية  
┗━━━━━━━❰･𓃦･❱━━━━━━━┛
`;

        let imagePath = './م7.jpg';

        conn.sendMessage(m.chat, { 
            image: fs.readFileSync(imagePath), 
            caption: menu, 
            mentions: [m.sender] 
        });
    }
};

handler.help = ['م7'];
handler.tags = ['islamic'];
handler.command = ['م7'];
handler.fail = null;

export default handler;