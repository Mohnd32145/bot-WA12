import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

let handler = async (m, { conn, usedPrefix }) => {
  // إعداد الأزرار مع الأوامر المرتبطة
  const quickReplies = [
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "🏦 البنك",
        id: `${usedPrefix}بنك`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⚔ مصارعة",
        id: `${usedPrefix}مصارعة`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "🛒 سوق الحيوانات",
        id: `${usedPrefix}سوق-الحيوانات`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "🎁 صندوق",
        id: `${usedPrefix}صندوق`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "📊 إحصائيات",
        id: `${usedPrefix}إحصائيات`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "📌 مهام",
        id: `${usedPrefix}مهام`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "⬆️ ترقية حيوان",
        id: `${usedPrefix}ترقية-حيوان`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "💸 بيع حيوان",
        id: `${usedPrefix}بيع-حيوان`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "🎴 بطاقة حيوان",
        id: `${usedPrefix}بطاقة-حيوان`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "🛒 شراء من السوق",
        id: `${usedPrefix}شراء-سوق`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "🔧 ترقية حيوانات",
        id: `${usedPrefix}ترقية-حيوانات`
      })
    }
  ];

  // إعداد الرسالة مع الردود السريعة
  const buttonMessage = {
    text: `🎮 *لعبة مصارعة الحيوانات* 🎮\n\nاختر أحد الأوامر من الردود السريعة أدناه:`,
    footer: 'Mikey Bot - مصارعة الحيوانات',
    quickReplies: quickReplies,
    headerType: 1
  };

  // إرسال الرسالة للمستخدم
  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.help = ['قائمة'];
handler.tags = ['game'];
handler.command = /^(حيوانات|حيوان)$/i;

export default handler;