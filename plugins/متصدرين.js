let handler = async (m, { conn, usedPrefix }) => {
    try {
        console.log("🔄 جلب بيانات المستخدمين...");

        // التحقق من وجود بيانات في قاعدة البيانات
        if (!global.db || !global.db.data || !global.db.data.users) {
            throw "⚠️ قاعدة البيانات غير متاحة أو لم يتم تحميلها بشكل صحيح!";
        }

        let users = Object.entries(global.db.data.users)
            .map(([key, value]) => ({ jid: key, ...value }))
            .filter(user => (user.bank > 0 || user.exp > 0)); // استبعاد من ليس لديه نقاط

        if (users.length === 0) {
            throw "🚫 لا يوجد أي مستخدم في قائمة المتصدرين حتى الآن!";
        }

        // التأكد من أن خاصية البنك موجودة للجميع
        users.forEach(user => {
            if (!user.bank) user.bank = 0;
        });

        // ترتيب المتصدرين بناءً على الماس في البنك و XP
        let diamondTop = [...users].sort((a, b) => b.bank - a.bank).slice(0, 10);
        let expTop = [...users].sort((a, b) => b.exp - a.exp).slice(0, 10);

        let diamondList = diamondTop.map((user, index) =>
            `*${index + 1}.* @${user.jid.split('@')[0]} - 💎 ${user.bank}`
        ).join('\n') || '🚫 لا يوجد بيانات';

        let expList = expTop.map((user, index) =>
            `*${index + 1}.* @${user.jid.split('@')[0]} - 🆙 ${user.exp} XP`
        ).join('\n') || '🚫 لا يوجد بيانات';

        // إرسال القائمة إلى المستخدم
        conn.reply(m.chat, `

༺━─╃⌬ 🏆 ⌬╄─━༻

*👑 قائمة المتصدرين:*

┌───⊷ *الماس 💎* ⊶
${diamondList}

┌───⊷ *XP ⬆️* ⊶
${expList}


`, m, { mentions: [...diamondTop.map(u => u.jid), ...expTop.map(u => u.jid)] });

    } catch (err) {
        console.error("❌ خطأ:", err);
        conn.reply(m.chat, `⚠️ حدث خطأ أثناء تنفيذ الأمر:\n\n*${err}*`, m);
    }
}

handler.help = ['top'];
handler.tags = ['econ'];
handler.command = ['top', 'متصدرين', 'leaderboard'];

export default handler;