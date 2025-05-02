const handler = async (m, { conn }) => {

  const botName = "𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓";

  const channelLink = "https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c";

  const message = {

    text: `🔹 *${botName}* 🔹`, // لا يوجد رابط نصي هنا

    mentions: [m.sender],

    contextInfo: {

      externalAdReply: {

        title: botName,

        body: "تابع آخر التحديثات هنا! 🔥",

        thumbnailUrl: channelLink, // يجبر WhatsApp على عرض المعاينة الصحيحة

        mediaType: 1,

        renderLargerThumbnail: true,

        sourceUrl: channelLink // يجعل الرابط قابلًا للنقر فقط في المعاينة

      }

    }

  };

  await conn.sendMessage(m.chat, message, { quoted: m });

};

handler.command = /^(تجربة)$/i;

export default handler;