/* 📌 حقوق المصدر: https://github.com/FG98F 

   🔥 تم التعديل بواسطة 𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓 */

let handler = async (m, { args, usedPrefix, command }) => {

let fa = `

*╭━─━─╃⌬〔🔥〕⌬╄─━─━╮*

*[❗] أدخل المبلغ الذي تريد المراهنة عليه* 

📌 *مثال:*

*${usedPrefix + command} 100*

*╰━─━─╃⌬〔🔥〕⌬╄─━─━╯*`.trim()

if (!args[0]) throw fa

if (isNaN(args[0])) throw fa

let apuesta = parseInt(args[0])

let users = global.db.data.users[m.sender]

let time = users.lastslot + 10000

if (new Date - users.lastslot < 10000) 

    throw `*⏳ انتظر ${msToTime(time - new Date())} قبل المراهنة مرة أخرى.*`

if (apuesta < 100) 

    throw '*[❗] الحد الأدنى للمراهنة هو 100 XP*'

if (users.exp < apuesta) {

    throw `*[❗] ليس لديك XP كافٍ لهذه المراهنة، حاول كسب المزيد عبر الألعاب أو التفاعل مع البوت!*`

}

// 🎰 الرموز العشوائية

let emojis = ["🍀", "🔥", "💎"];

let a = Math.floor(Math.random() * emojis.length);

let b = Math.floor(Math.random() * emojis.length);

let c = Math.floor(Math.random() * emojis.length);

let x = [], y = [], z = [];

for (let i = 0; i < 3; i++) {

x[i] = emojis[a];

a = (a + 1) % emojis.length;

}

for (let i = 0; i < 3; i++) {

y[i] = emojis[b];

b = (b + 1) % emojis.length;

}

for (let i = 0; i < 3; i++) {

z[i] = emojis[c];

c = (c + 1) % emojis.length;

}

let end;

if (a == b && b == c) {

    end = `*🎉 مبروك! ربحت 🎁 +${apuesta + apuesta} XP!*`

    users.exp += apuesta

} else if (a == b || a == c || b == c) {

    end = `*🔮 قريب جدًا من الفوز! جرب حظك مرة أخرى.*\n*تمت إضافة +10 XP*`

    users.exp += 10

} else {

    end = `*❌ خسرت! -${apuesta} XP*`

    users.exp -= apuesta

}

users.lastslot = new Date * 1

return await m.reply(

        `༺━─╃⌬ 🔥 ⌬╄─━༻

🎰 | *لعبة الحظ*  

──────────────

${x[0]} : ${y[0]} : ${z[0]}

${x[1]} : ${y[1]} : ${z[1]}

${x[2]} : ${y[2]} : ${z[2]}

──────────────

🎰 | ${end}

༺━─╃⌬ 🔥 ⌬╄─━༻`) 

}

handler.help = ['حظ <المبلغ>']

handler.tags = ['game']

handler.command = ['حظ']

export default handler

// 🕰️ تحويل الوقت المتبقي إلى صيغة مفهومة

function msToTime(duration) {

var seconds = Math.floor((duration / 1000) % 60),

minutes = Math.floor((duration / (1000 * 60)) % 60)

minutes = (minutes < 10) ? "0" + minutes : minutes

seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " د " + seconds + " ث "

}