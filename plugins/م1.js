import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {

    if (command === 'م1') {  

        let taguser = m.sender.split('@')[0];  

        let menu = `❰･ اوامر الجروب ･❱
 ⚇━━━❰･𓃦･❱━━━⚇
*\`『 منور يا 』: \`*${taguser}
*\`『قبل كتابة اي امر حط نقطه』\`*
*\`『 التريخ 』: \`* ${date}
*\`『 المطور 』: \`* ♯𝚃𝙴𝚁𝙱𝚘
⚇━━━❰･𓃦･❱━━━⚇
❐┇👥❯ ⸢ مـنـشـن ⸥
> منشن جميع أعضاء المجموعة  
❐┇👥❯ ⸢ لمنشن ⸥  
> منشن مخفي بدون ما يبان للي تم منشنه  
❐┇👥❯ ⸢ جروبي ⸥
> عرض معلومات المجموعة  
❐┇👥❯ ⸢ انطر ⸥
> طرد عضو من المجموعة  
❐┇👥❯ ⸢ انذار ⸥
> إعطاء إنذار لعضو  
❐┇👥❯ ⸢ انذرات ⸥
> عرض عدد إنذارات الأعضاء  
❐┇👥❯ ⸢ لينك ⸥
> جلب رابط المجموعة  
❐┇👥❯ ⸢ خفض ⸥  
> خفض عضو من رتبة مشرف  
❐┇👥❯ ⸢ ترقيه ⸥
> ترقية عضو إلى مشرف  
❐┇👥❯ ⸢ المتصلين ⸥
> عرض الأعضاء المتصلين حاليًا  
❐┇👥❯ ⸢ مخفي ⸥ 
> منشن مخفي خاص بالمشرفين  
❐┇👥❯ ⸢ جروب ⸥
> قفل او فتح إرسال الرسائل في المجموعة  
❐┇👥❯ ⸢ الترحيب ⸥
> تغيير رسالة الترحيب التلقائية  
❐┇👥❯ ⸢ المغادره ⸥
> تغيير رسالة المغادرة التلقائية  
┗━━━━━━━❰･𓃦･❱━━━━━━━┛
`;

        let imagePath = './م1.jpg'; // تأكد أن الصورة موجودة في نفس مجلد السكربت

        conn.sendMessage(m.chat, {   
            image: fs.readFileSync(imagePath),   
            caption: menu,   
            mentions: [m.sender]   
        });  
    }

};

handler.help = ['م1'];
handler.tags = ['group'];
handler.command = ['م1'];
handler.fail = null;

export default handler;