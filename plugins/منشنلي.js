let handler = async (m, { conn, participants }) => {

  if (!m.quoted) return conn.reply(m.chat, '⚠️ قم بالرد على رسالة لاستخدام الأمر!', m)

  let message = m.quoted.text || '📢' // يأخذ محتوى الرسالة المقتبسة

  let mentionedJid = participants.map(p => p.id) // جلب جميع أعضاء المجموعة

  conn.sendMessage(m.chat, { text: message, mentions: mentionedJid }, { quoted: m })

}

handler.help = ['mentionhidden']

handler.tags = ['group']

handler.command = /^لمنشن$/i

handler.group = true

handler.admin = false

export default handler