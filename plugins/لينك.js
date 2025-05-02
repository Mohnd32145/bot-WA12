let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin) {
        return conn.reply(m.chat, '❌ البوت يجب أن يكون مشرفًا للحصول على رابط المجموعة!', m);
    }

    let link = await conn.groupInviteCode(m.chat);
    let groupLink = `https://chat.whatsapp.com/${link}`;

    conn.reply(m.chat, `🔗 رابط المجموعة:\n${groupLink}`, m);
};

handler.help = ['لينك'];
handler.tags = ['group'];
handler.command = ['لينك'];

handler.group = true; // يمكن استخدامه فقط داخل المجموعات
handler.botAdmin = true; // يجب أن يكون البوت مشرفًا

export default handler;