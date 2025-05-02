import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";

let handler = async (m, { conn }) => {
  if (!m.quoted) 
    return m.reply(`༺━─╃⌬ 🤖 ⌬╄─━༻\n❌ *قم بالرد على صورة، GIF أو فيديو لتحويله إلى ملصق!*\n╰━━━━━━━━━━━━━━━━╯`);

  let mime = m.quoted.mimetype || "";
  if (!/image|video/.test(mime)) 
    return m.reply(`༺━─╃⌬ 🤖 ⌬╄─━༻\n❌ *الملف ليس صورة، GIF أو فيديو مدعوم!*\n╰━━━━━━━━━━━━━━━━╯`);

  let media = await m.quoted.download();
  await m.reply("⌛ *جاري المعالجة...*");

  try {
    let sticker = await createSticker(media, {
      type: StickerTypes.DEFAULT, 
      pack: "My Pack", 
      author: "𝙱𝙾𝚃", 
      quality: 80,
    });

    await conn.sendMessage(m.chat, { sticker }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply("❌ *حدث خطأ أثناء إنشاء الملصق!*");
  }
};

handler.help = ["sticker", "st"];
handler.tags = ["tools"];
handler.command = /^(ملصق|sticker|st)$/i;

export default handler;