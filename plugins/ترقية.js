let handler = async (m, { conn, text, command }) => {
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
        await conn.groupParticipantsUpdate(m.chat, [user], 'promote');

        await conn.sendMessage(m.chat, {
            text: `╭━━━━━━━〔 *🏅 تـرقيـة إلى مشرف 🏅* 〕━━━━━━━╮\n` +
                  `┃\n` +
                  `┃ ✦ 🎉 *المستخدم:* @${number}\n` +
                  `┃ ✦ 🔥 *تم ترقيتك إلى مشرف رسميًا!* \n` +
                  `┃ ✦ 🏆 *بقرار من:* @${m.sender.split('@')[0]}\n` +
                  `┃\n` +
                  `┃ 🚀 *ننتظر منك المزيد من الإبداع والتميز!* 🌟\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n` +
                  `❖ 𓆩 ⫷✧ ᴍɪᴋᴇʏ ʙᴏᴛ ✧⫸ 𓆪 ❖
`,
            mentions: [user, m.sender]
        });

    } catch (e) {
        console.error(e);
    }
};

handler.help = ['promote (@tag)', 'ترقية (@tag)', 'رفع (@tag)'];
handler.tags = ['group'];
handler.command = ['promote', 'ترقية', 'رفع']; 
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;