import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {

    if (command === 'م3') {
        let taguser = m.sender.split('@')[0];

        let menu = `❰･ اوامر المطور ･❱
 ⚇━━━❰･𓃦･❱━━━⚇
*\`『 منور يا 』: \`*${taguser}
*\`『قبل كتابة اي امر حط نقطه』\`*
*\`『 التريخ 』: \`* ${date}
*\`『 المطور 』: \`* ♯𝚃𝙴𝚁𝙱𝚘
⚇━━━❰･𓃦･❱━━━⚇
❐┇👨‍💻❯ ⸢ بان ⸥  
> لحظر مستخدم من استخدام البوت  
❐┇👨‍💻❯ ⸢ الغاء_البان ⸥  
> لإلغاء حظر مستخدم  
❐┇👨‍💻❯ ⸢ المحظورين ⸥  
> لعرض قائمة المحظورين  
❐┇👨‍💻❯ ⸢ اخصم ⸥  
> لخصم مبلغ من حساب مستخدم  
❐┇👨‍💻❯ ⸢ اضف ⸥  
> لإضافة مبلغ لحساب مستخدم  
❐┇👨‍💻❯ ⸢ انضم ⸥  
> لإضافة البوت إلى مجموعة  
❐┇👨‍💻❯ ⸢ اخرج ⸥  
> لإخراج البوت من مجموعة  
❐┇👨‍💻❯ ⸢ حذف_المتبندين ⸥  
> لحذف قائمة المحظورين بالكامل  
┗━━━━━━━❰･𓃦･❱━━━━━━━┛
`;

        let imagePath = './م3.jpg';

        conn.sendMessage(m.chat, { 
            image: fs.readFileSync(imagePath), 
            caption: menu, 
            mentions: [m.sender] 
        });
    }
};

handler.help = ['م3'];
handler.tags = ['owner'];
handler.command = ['م3'];
handler.fail = null;

export default handler;