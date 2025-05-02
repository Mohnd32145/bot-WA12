// استيراد قاعدة البيانات

// import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {

    let who

    // التحقق مما إذا كان الرد على رسالة

    if (m.quoted) {

        who = m.quoted.sender

    } else if (m.isGroup) {

        who = m.mentionedJid[0]

    } else {

        who = m.chat

    }

    if (!who) throw '✳️ منشن المستخدم أو قم بالرد على رسالته'

    let txt = text.replace('@' + who.split`@`[0], '').trim()

    if (!txt) throw '✳️ أدخل المبلغ الذي تريد إضافته'

    if (isNaN(txt)) throw '🔢 أدخل أرقام فقط'

    let dmt = parseInt(txt)

    if (dmt < 1) throw '✳️ الحد الأدنى للإضافة هو *1*'

    let users = global.db.data.users

    if (!users[who]) users[who] = { diamond: 0 } // التأكد من وجود المستخدم في قاعدة البيانات

    users[who].diamond += dmt

    await m.reply(`≡ *💎 تم الإضافة بنجاح!*

┌──────────────

▢ *المجموع:* ${dmt}

└──────────────`)

    conn.fakeReply(m.chat, `▢ *تمت إضافة* \n\n *+${dmt}* 💎`, who, m.text)

}

handler.help = ['adddi <@user>']

handler.tags = ['econ']

handler.command = ['adddi', 'اضف-الماس']

handler.rowner = true

export default handler