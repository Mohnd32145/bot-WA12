let toM = a => '@' + a.split('@')[0];
let lastUsage = {}; // تخزين آخر استخدام لكل مستخدم

function handler(m, { groupMetadata }) {
    let user = m.sender;
    let now = Date.now();

    // التحقق مما إذا مرّ أكثر من 60 ثانية منذ آخر استخدام
    if (lastUsage[user] && now - lastUsage[user] < 60000) {
        let remainingTime = ((60000 - (now - lastUsage[user])) / 1000).toFixed(0);
        return m.reply(`⏳ انتظر ${remainingTime} ثانية قبل استخدام الأمر مرة أخرى!`);
    }

    lastUsage[user] = now; // تحديث وقت الاستخدام

    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps.getRandom();
    let b;
    do b = ps.getRandom();
    while (b === a);

    m.reply(
        `*${toM(a)}, طلاقها بالتلته لو عندك دم😂*\n` +
        `*${toM(b)},* متزعليش🥺\n` +
        `*اجوزك سيد سيدو 🤵👰💍*\n\n` +
        `༺━─╃⌬ 🤖 ⌬╄─━༻\n` +
        `╰━━━━━━━━━━━━━━━━╯\n` +
        `❖ 𓆩 ⫷✧ ᴍɪᴋᴇʏ ʙᴏᴛ ✧⫸ 𓆪 ❖`,
        null,
        { mentions: [a, b] }
    );
}

handler.help = ['divorce'];
handler.tags = ['main', 'fun'];
handler.command = ['الطلاق', 'طلاق'];
handler.group = true;

export default handler;