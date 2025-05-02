import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";

let handler = async (m, { conn, text }) => {

  if (!m.quoted) return m.reply("❌ *قم بالرد على ملصق لتغيير حقوقه!*");

  // تحميل الملف المرسل

  let media = await m.quoted.download();

  await m.reply("⌛ جاري المعالجة...");

  try {

    // استخراج اسم الحزمة بالكامل من النص المُدخل

    let packName = text.trim() || "My Pack";

    // إنشاء الملصق مع تغيير الحقوق

    let sticker = await createSticker(media, {

      type: StickerTypes.DEFAULT, // نوع الملصق

      pack: packName, // اسم الحزمة كاملاً

      author: "𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓", // اسم المؤلف ثابت

      quality: 80, // جودة الصورة

    });

    // إرسال الملصق الجديد

    await conn.sendMessage(m.chat, { sticker }, { quoted: m });

  } catch (e) {

    console.error(e);

    m.reply("❌ حدث خطأ أثناء تغيير حقوق الملصق!");

  }

};

handler.help = ["حقوق"];

handler.tags = ["tools"];

handler.command = /^(حقوق|سرقه|سرقة)$/i;

export default handler;