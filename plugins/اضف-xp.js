//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {

  let who

  if (m.isGroup) {

    who = m.quoted ? m.quoted.sender : m.mentionedJid[0]

  } else {

    who = m.quoted ? m.quoted.sender : m.chat

  }

  if (!who) throw '✳️ يرجى الرد على رسالة المستخدم أو منشنه'

  let txt = text.replace('@' + who.split`@`[0], '').trim()

  if (!txt) throw '✳️ أدخل كمية *XP* التي تريد إضافتها'

  if (isNaN(txt)) throw ' 🔢 يُسمح فقط بالأرقام'

  

  let xp = parseInt(txt)

  if (xp < 1) throw '✳️ الحد الأدنى هو *1*'

  let users = global.db.data.users

  users[who].exp = (users[who].exp || 0) + xp

  await m.reply(`༺━─╃⌬ 🤖 ⌬╄─━༻

≡ *إضافة نقاط الخبرة*  

༺━─╃⌬ 🤖 ⌬╄─━༻  

▢  *المستلم:* @${who.split`@`[0]}  

▢  *الإجمالي:* ${xp}  

╰━━━━━━━━━━━━━━━━╯
> ✦┇𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓┇✦ `, null, { mentions: [who] })

  

  conn.fakeReply(m.chat, `▢ لقد حصلت على \n\n *+${xp} XP*`, who, m.text)

}

handler.help = ['addxp <عدد النقاط>', 'اضف-xp <عدد النقاط>']

handler.tags = ['econ']

handler.command = ['addxp', 'اضف-xp'] 

handler.rowner = true

export default handler