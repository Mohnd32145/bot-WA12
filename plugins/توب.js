let handler = async (m, { conn, args, participants }) => {

    if (!m.isGroup) return m.reply("❌ هذا الأمر يعمل فقط في المجموعات.");

    let count = parseInt(args[0]); // استخراج العدد

    let title = args.slice(1).join(" "); // استخراج الشيء المطلوب

    if (!count || isNaN(count)) return m.reply("❌ يرجى تحديد عدد الأشخاص.\n\n📌 مثال:\n*.توب 5 المشاغبين*");

    if (!title) return m.reply("❌ يرجى تحديد الشيء المطلوب.\n\n📌 مثال:\n*.توب 3 الأذكياء*");

    if (count < 1) return m.reply("❌ يجب أن يكون العدد 1 أو أكثر.");

    

    let shuffled = participants.map(p => p.id).sort(() => Math.random() - 0.5); // خلط الأعضاء عشوائيًا

    let selected = shuffled.slice(0, count).map(id => `@${id.split('@')[0]}`); // اختيار العدد المطلوب

    

    if (selected.length === 0) return m.reply("🚫 لا يوجد أعضاء كافيين في المجموعة.");

    

    let message = `🏆 *توب ${title}* 🎖️\n\n${selected.join('\n')}\n\n🔹 *ملاحظة:* هذا مجرد أمر ترفيهي ولا يعبر عن الواقع! 😆`;

    m.reply(message, null, { mentions: selected.map(id => id.replace('@', '') + "@s.whatsapp.net") });

};

handler.help = ["توب"];

handler.tags = ["fun"];

handler.command = ["توب"];

handler.group = true;

export default handler;