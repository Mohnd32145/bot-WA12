//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text
    m.reply('✅ Kumpulan pesan perpisahan')
  } else throw `✳️ Masukkan pesan\n@user (menyebutkan)`
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['setbye', 'تغير-الوداع'] 
handler.admin = false
handler.owner = true
const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply('*[❗] رسالة الوداع اتضبطت صح للمجموعة دي*');
  } else throw `*[❗] ادخل رسالة الوداع اللي عايز تضيفها، استخدم:*\n*- @user (مذكرة)*`;
};
handler.help = ['setbye <text>'];
handler.tags = ['group'];
handler.command = ['المغادره'];
handler.admin = true;
export default handler;

export default handler
