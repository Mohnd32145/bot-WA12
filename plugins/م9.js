import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'م9') {
        let taguser = m.sender.split('@')[0];

        let menu = `❰･ اوامر الدعم ･❱
 ⚇━━━❰･𓃦･❱━━━⚇
*\`『 منور يا 』: \`*${taguser}
*\`『قبل كتابة اي امر حط نقطه』\`*
*\`『 التريخ 』: \`* ${date}
*\`『 المطور 』: \`* ♯𝚃𝙴𝚁𝙱𝚘
⚇━━━❰･𓃦･❱━━━⚇
❐┇🧚‍♀️❯ ⸢ اقتراح ⸥   
> لتحسين البوت
❐┇🧚‍♀️❯ ⸢ ابلاغ ⸥ 
> للإبلاغ عن مشاكل أو أخطاء  
❐┇🧚‍♀️❯ ⸢ دعم ⸥ 
> للحصول على مساعدة فورية  
❐┇🧚‍♀️❯ ⸢ استقبال ⸥ 
> لعرض رسائل الاستقبال  
❐┇🧚‍♀️❯ ⸢ تسجيل ⸥ 
> لتسجيل شكوى أو ملاحظة  
❐┇🧚‍♀️❯ ⸢ المطور ⸥ 
> للتواصل مع المطور  
❐┇🧚‍♀️❯ ⸢ وصف ⸥ 
> لعرض وصف البوت والميزات  
┗━━━━━━━❰･𓃦･❱━━━━━━━┛
`;

        let imagePath = './م9.jpg';
        conn.sendMessage(m.chat, { 
            image: fs.readFileSync(imagePath), 
            caption: menu, 
            mentions: [m.sender] 
        });
    }
};

handler.help = ['م9'];
handler.tags = ['communication'];
handler.command = ['م9'];
handler.fail = null;

export default handler;