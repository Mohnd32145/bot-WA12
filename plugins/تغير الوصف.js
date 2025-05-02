let handler = async (m, { conn, text, isAdmin, isBotAdmin }) => {

    if (!m.isGroup) return m.reply("❌ هذا الأمر يعمل فقط في المجموعات.");

    

    if (!isAdmin) return m.reply("🚫 هذا الأمر للمشرفين فقط!");

    if (!isBotAdmin) return m.reply("⚠️ يجب أن أكون مشرفًا لتغيير وصف المجموعة!");

    if (!text) return m.reply("❌ يرجى إدخال الوصف الجديد للمجموعة.\n\n📌 مثال:\n*.تغير-الوصف هذه مجموعة للنقاش وتبادل المعلومات.*");

    try {

        await conn.groupUpdateDescription(m.chat, text);

        m.reply(`✅ تم تغيير وصف المجموعة إلى:\n\n${text}`);

    } catch (err) {

        console.error(err);

        m.reply("❌ حدث خطأ أثناء محاولة تغيير وصف المجموعة.");

    }

};

handler.help = ["تغير-الوصف"];

handler.tags = ["group"];

handler.command = ["تغير-الوصف"];

handler.group = true;

handler.admin = true;

export default handler;