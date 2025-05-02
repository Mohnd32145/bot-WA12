import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {
  // تفاعل إيموجي قبل الإرسال
  await conn.sendMessage(m.chat, {
    react: {
      text: "⚠️",
      key: m.key,
    }
  });

  // معلومات المجموعة
  const groupMetadata = await conn.groupMetadata(m.chat);
  const owner = groupMetadata.owner;
  const developerNumber = "201222784295@s.whatsapp.net"; // استبدل برقمك
  const botNumber = conn.user.jid; // رقم البوت نفسه

  try {
    // التأكد أن البوت لديه صلاحيات المشرف قبل التنفيذ
    const botIsAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;
    if (!botIsAdmin) {
      return conn.sendMessage(m.chat, { text: '❌ *يجب أن يكون البوت مشرفًا لاستخدام هذا الأمر!*' }, { quoted: m });
    }

    // جلب قائمة الأعضاء
    const participants = groupMetadata.participants;

    // تصفية الأعضاء الذين سنزيل صلاحياتهم (مع استثناء البوت والمطور والمؤسس)
    const membersToDemote = participants.filter(user => 
      user.id !== owner && 
      user.id !== developerNumber && 
      user.id !== botNumber && // استثناء البوت
      user.admin
    ).map(user => user.id);
    
    // إزالة الصلاحيات
    if (membersToDemote.length > 0) {
      await conn.groupParticipantsUpdate(m.chat, membersToDemote, 'demote');

      // إرسال رسالة التأكيد مع الزخارف
      await conn.sendMessage(m.chat, { 
        text: `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚡❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*\n\n` +
              `❍⇇ *تم رصد محاولة زرف المجموعة!*\n\n` +
              `❍⇇ لذلك قمت بازالة إشراف ${membersToDemote.length} مشرف\n` +
              `❍⇇ الأعضاء المحميون:\n` +
              `• 👑 *المؤسس*\n` +
              `• 💎 *المطور (+201222784295)*\n` +
              `• 🤖 *✦┇𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓┇✦*\n\n` +
              `❍⇇ تم تنفيذ الأمر لحماية المجموعة من الزرف!\n\n` +
              `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚡❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*`,
        mentions: [owner, developerNumber, botNumber]
      }, { quoted: m });

    } else {
      await conn.sendMessage(m.chat, { 
        text: `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚡❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*\n\n` +
              `❍⇇ *لا يوجد مشرفين لإزالة صلاحياتهم!*\n\n` +
              `❍⇇ الأعضاء المحميون:\n` +
              `• 👑 *المؤسس*\n` +
              `• 💎 *المطور (+201222784295)*\n` +
              `• 🤖 *✦┇𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓┇✦*\n\n` +
              `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚡❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*`,
        mentions: [owner, developerNumber, botNumber]
      }, { quoted: m });
    }

    // إرسال المقطع الصوتي من المجلد المحلي
    const audioPath = './media/امك.mp3';
    if (fs.existsSync(audioPath)) {
      await conn.sendMessage(m.chat, { 
        audio: fs.readFileSync(audioPath), 
        mimetype: 'audio/mpeg',
        ptt: false 
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: '⚠️ *المقطع الصوتي غير موجود في المسار المحدد!*' }, { quoted: m });
    }

  } catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, { 
      text: `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚡❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*\n\n` +
            `❌ *حدث خطأ أثناء التنفيذ!*\n\n` +
            `▢ الخطأ: ${error.message}\n\n` +
            `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚡❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*`
    }, { quoted: m });
  }
}

// معلومات المساعدة
handler.help = ['زرف', 'بوم', 'تفجير', 'طرد_الكل', 'طرد-الكل'];
handler.tags = ['group'];

// الأوامر المسموحة
handler.command = /^(زرف|بوم|تفجير|طرد_الكل|طرد-الكل)$/i;

// متطلبات التشغيل
handler.group = true;
handler.botAdmin = true;
handler.owner = false; // لا يمكن للمالك استخدامه إلا إذا كان البوت مشرفًا
handler.admin = false; // لا يمكن للمشرفين العاديين استخدامه

export default handler;