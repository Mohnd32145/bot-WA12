import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {

    if (command === 'م5') {  
        let taguser = m.sender.split('@')[0];  
        let menu = `❰･ اوامر الالقاب ･❱
 ⚇━━━❰･𓃦･❱━━━⚇
*\`『 منور يا 』: \`*${taguser}
*\`『قبل كتابة اي امر حط نقطه』\`*
*\`『 التريخ 』: \`* ${date}
*\`『 المطور 』: \`* ♯𝚃𝙴𝚁𝙱𝚘
⚇━━━❰･𓃦･❱━━━⚇
❐┇🍷❯ ⸢ لقب ⸥   
> لإضافة لقب لشخص معين  
❐┇🍷❯ ⸢ الالقاب ⸥   
> لعرض قائمة جميع الألقاب  
❐┇🍷❯ ⸢ تغير-لقب ⸥   
> لتغيير لقب شخص معين  
❐┇🍷❯ ⸢ حذف-لقب ⸥   
> لحذف لقب معين  
❐┇🍷❯ ⸢ تصفيه-الألقاب ⸥   
> لتصفية جميع الألقاب  
❐┇🍷❯ ⸢ تصفيه-الألقاب ⸥   
> لحذف الألقاب  
❐┇🍷❯ ⸢ لقبي ⸥   
> لعرض لقبك  
❐┇🍷❯ ⸢ لقبه ⸥    
> لعرض لقب شخص معين  
┗━━━━━━━❰･𓃦･❱━━━━━━━┛
`;

        let imagePath = './م5.jpg'; // تأكد أن الصورة موجودة في نفس مجلد السكربت

        conn.sendMessage(m.chat, {   
            image: fs.readFileSync(imagePath),   
            caption: menu,   
            mentions: [m.sender]   
        });  
    }
};

handler.help = ['م5'];
handler.tags = ['nickname'];
handler.command = ['م5'];
handler.fail = null;

export default handler;