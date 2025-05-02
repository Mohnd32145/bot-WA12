letlet handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin) {
        return conn.reply(m.chat, '❌ البوت يجب أن يكون مشرفًا لإعادة تعيين رابط المجموعة!', m);
    }

    try {
        await conn.groupRevokeInvite(m.chat); // يقوم بإعادة ضبط الرابط
        let newLink = await conn.groupInviteCode(m.chat); // جلب الرابط الجديد
        let groupLink = `https://chat.whatsapp.com/${newLink}`;

        conn.reply(m.chat, `🔄 تم إعادة تعيين رابط المجموعة بنجاح!\n🔗 رابط جديد:\n${groupLink}`, m);
    } catch (err) {
        conn.reply(m.chat, '⚠️ حدث خطأ أثناء إعادة تعيين الرابط، تأكد أن البوت لديه صلاحيات المشرف!', m);
    }
};

handler.help = ['رستر-اللينك'];
handler.tags = ['group'];
handler.command = ['رستر-اللينك'];

handler.group = true; // يعمل فقط داخل المجموعات
handler.botAdmin = true; // يجب أن يكون البوت مشرفًا

export default handler;