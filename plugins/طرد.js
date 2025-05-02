let handler = async (m, { conn, usedPrefix, command, text }) => {
    let number;

    if (m.quoted) {
        number = m.quoted.sender.split('@')[0];
    } else if (text) {
        if (isNaN(text) && text.includes('@')) {
            number = text.replace(/[^0-9]/g, '');
        } else if (!isNaN(text)) {
            number = text;
        } else {
            return m.reply(`༺━──⌬ *تنبيه!* ⌬──━༻\n📌 *مـنـشن الــشـخص أو رد على رسالته !*`);
        }
    } else {
        return m.reply(`༺━──⌬ *تنبيه!* ⌬──━༻\n📌 *مـنـشن الــشـخص أو رد على رسالته !*`);
    }

    if (number.length > 13 || number.length < 11) {
        return m.reply(`༺━──⌬ *خطأ!* ⌬──━༻\n🚫 *الـرقـم غـلط !*`);
    }

    let user = number + '@s.whatsapp.net';

    try {
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

        await conn.sendMessage(m.chat, {
            text: `╭━━━━━(*🚨* 〕━━━━╮\n` +
                  `┃\n` +
                  `┃ ✦ 👤 *المستخدم:* @${number}\n` +
                  `┃ ✦ ⚠️ *تم طرده من المجموعة!* \n` +
                  `┃ ✦ ⚖️ *بقرار من:* @${m.sender.split('@')[0]}\n` +
                  `┃\n` +
                  `┃ 🔥 *برا يا حقير!* 🚪\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━━━╯
> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦ 
`,
            mentions: [user, m.sender]
        });

    } catch (e) {
        console.error(e);
    }
};

handler.help = ['شلوط(@tag)', 'طرد (@tag)'];
handler.tags = ['group'];
handler.command = ['شلوط', 'طرد']; 
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;