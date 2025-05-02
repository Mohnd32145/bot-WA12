let handler = async (m, { conn, text, isAdmin, isBotAdmin }) => {

    if (!m.isGroup) return m.reply("❌ هذا الأمر يعمل فقط في المجموعات.");

    

    if (!isAdmin) return m.reply("🚫 هذا الأمر للمشرفين فقط!");

    if (!isBotAdmin) return m.reply("⚠️ يجب أن أكون مشرفًا لتغيير اسم المجموعة!");

    if (!text) return m.reply("❌ يرجى إدخال الاسم الجديد للمجموعة.\n\n📌 مثال:\n*.تغير-اسم مجموعة الأبطال*");

    try {

        await conn.groupUpdateSubject(m.chat, text);

        m.reply(`✅ تم تغيير اسم المجموعة إلى: *${text}*`);

    } catch (err) {

        console.error(err);

        m.reply("❌ حدث خطأ أثناء محاولة تغيير اسم المجموعة.");

    }

};

handler.help = ["تغير-اسم"];

handler.tags = ["group"];

handler.command = ["تغير-اسم"];

handler.group = true;

handler.admin = true;

export default handler;