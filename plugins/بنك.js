let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const caption = `
▧「 *معلومات البنك* 」
│ *الاسم:* ${user.registered ? user.name : conn.getName(m.sender)}
│ *الصراف الآلي:* ${user.atm > 0 ? 'المستوى ' + user.atm : 'لا يملك'}
│ *البنك:* Rp.${user.bank} / Rp.${user.fullatm}
│ *النقود:* ${user.money} 💲
│ *الحالة:* ${user.premiumTime > 0 ? 'مميز' : 'عادي'}
│ *مسجل:* ${user.registered ? 'نعم':'لا'}
└─────────────────────────···
`.trim()
  conn.sendMessage(m.chat, { image: { url: 'https://en.pimg.jp/071/200/649/1/71200649.jpg' }, caption: caption }, { quoted: m })
}
handler.help = ['البنك']
handler.tags = ['rpg']
handler.command = /^(البنك)$/i


export default handler