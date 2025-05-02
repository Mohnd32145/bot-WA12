import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) return conn.reply(m.chat, `🤍 مثال: ${usedPrefix}${command} منظر طبيعي جميل`, m);

  // إرسال إشعار ببدء المعالجة

  await conn.sendMessage(m.chat, { text: "⏳ جاري إنشاء الصورة..." }, { quoted: m });

  try {

    const result = await fluximg.create(text);

    if (result && result.imageLink) {

      await conn.sendMessage(

        m.chat,

        {

          image: { url: result.imageLink },

          caption: `*\`النتائج لـ:\`* ${text}`,

        },

        { quoted: m }

      );

    } else {

      throw new Error("تعذر إنشاء الصورة. حاول مرة أخرى.");

    }

  } catch (error) {

    console.error(error);

    conn.reply(m.chat, "❌ حدث خطأ أثناء إنشاء الصورة.", m);

  }

};

handler.help = ["flux *<النص>*"];

handler.tags = ["ai"];

handler.command = ["فلكس"];

export default handler;

const fluximg = {

  defaultRatio: "2:3", 

  create: async (query) => {

    const config = {

      headers: {

        accept: "*/*",

        authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",

        "user-agent": "Postify/1.0.0",

      },

    };

    try {

      const response = await axios.get(

        `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(

          query

        )}&aspect_ratio=${fluximg.defaultRatio}`,

        config

      );

      return {

        imageLink: response.data.image_link,

      };

    } catch (error) {

      console.error(error);

      throw error;

    }

  },

};