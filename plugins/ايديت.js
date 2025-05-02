import axios from "axios";

const handler = async (m, { conn, usedPrefix, command }) => {

  // قائمة مصادر الفيديو

  const videoSources = [

    "https://streamable.com/myggxy",

    "https://streamable.com/qmxxyh",

    "https://streamable.com/hpp0wj",

    "https://streamable.com/70kzzy",

    "https://streamable.com/zjid11",

    "https://streamable.com/a2qn8f",

    "https://streamable.com/4t0yyp",

    "https://streamable.com/ja9s17",

    "https://streamable.com/e6rnmm",

    "https://streamable.com/7wtbdm",

    "https://streamable.com/1dbyl1",

    "https://streamable.com/3thy5m",

    "https://streamable.com/wnkrhy",

    "https://streamable.com/ycr8um",

    "https://streamable.com/x4x55o",

    "https://streamable.com/h6kp2z",

    "https://streamable.com/ugb25s",

    "https://streamable.com/c57ug9"

  ];

  try {

    // إرسال رسالة انتظار

    const loadingMsg = await conn.sendMessage(m.chat, {

      text: '⏳ جاري تحميل فيديو الأنمي...',

      mentions: [m.sender]

    }, { quoted: m });

    // اختيار رابط فيديو عشوائي

    const randomSource = videoSources[Math.floor(Math.random() * videoSources.length)];

    const videoUrl = await handleStreamable(randomSource);

    if (!videoUrl) {

      throw new Error("لم يتم العثور على رابط الفيديو");

    }

    // إرسال الفيديو بدون رابط

    await conn.sendMessage(m.chat, {

      video: { url: videoUrl },

      caption: `🎬 *تفضل الإيديت*\n✨ لو عايز كمان اكتب *${usedPrefix + command}*\n╰━━━━━━━━━━━━━━━━╯\n> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`,

      mentions: [m.sender]

    }, { quoted: m });

    // حذف رسالة الانتظار

    await conn.sendMessage(m.chat, {

      delete: loadingMsg.key

    });

  } catch (error) {

    console.error('حدث خطأ:', error);

    await conn.sendMessage(m.chat, {

      text: `❌ حدث خطأ: ${error.message}\nيرجى المحاولة مرة أخرى لاحقًا.`,

      mentions: [m.sender]

    }, { quoted: m });

  }

};

// دالة استخراج رابط الفيديو من Streamable

async function handleStreamable(url) {

  try {

    const videoId = url.split('/').pop();

    const apiUrl = `https://api.streamable.com/videos/${videoId}`;

    

    const { data } = await axios.get(apiUrl, { timeout: 10000 });

    

    if (data?.files?.mp4?.url) {

      return data.files.mp4.url.startsWith('http') 

        ? data.files.mp4.url 

        : `https:${data.files.mp4.url}`;

    }

    

    // الطريقة البديلة إذا فشلت API

    const htmlResponse = await axios.get(url, { timeout: 10000 });

    const videoUrlMatch = htmlResponse.data.match(/"video_url":"(https?:\/\/[^"]+)"/i);

    

    if (videoUrlMatch) {

      return videoUrlMatch[1].replace(/\\\//g, '/');

    }

    

    throw new Error("تعذر استخراج الفيديو من Streamable");

  } catch (error) {

    throw new Error(`خطأ في معالجة Streamable: ${error.message}`);

  }

}

// إعدادات الأوامر

handler.help = ['ايدت'];

handler.tags = ['anime', 'media'];

handler.command = /^(ايدت|ايديت|animeedit|edit)$/i;

export default handler;