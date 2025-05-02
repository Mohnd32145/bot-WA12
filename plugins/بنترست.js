import axios from 'axios';

import fetch from 'node-fetch';

const { generateWAMessageContent, generateWAMessageFromContent, proto } = 

  (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text }) => { 

  if (!text) { 

    return conn.reply(message.chat, "🖊️ يرجى كتابة شيء للبحث عنه!", message); 

  }

  try { 

    let { data } = await axios.get(

      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(text)}&siteSearch=pinterest.com&key=AIzaSyDcq-1qM4JXMF1R1DpiK9AAHpuFbabRUF4&cx=116e76b57fad2451a`

    );

    if (!data || !data.items || data.items.length === 0) {

      return conn.reply(message.chat, "🚫 لم يتم العثور على أي صور!", message);

    }

    let imageUrls = data.items.slice(0, 5).map(item => item.link);

    console.log("روابط الصور:", imageUrls); // طباعة الروابط للتأكد من أنها صحيحة

    for (let i = 0; i < imageUrls.length; i++) {

      try {

        let res = await fetch(imageUrls[i]);

        if (!res.ok) continue; // إذا لم تكن الصورة صالحة، انتقل للصورة التالية

        

        let buffer = await res.buffer();

        await conn.sendMessage(

          message.chat, 

          { image: buffer, caption: `🖼️ صورة رقم: ${i + 1}\n🌸 𝑀𝐼𝐾𝐸𝑌 𝐵𝛩𝑇 🌸` }, 

          { quoted: message }

        );

      } catch (error) {

        console.error("خطأ في تحميل الصورة:", error);

      }

    }

  } catch (error) { 

    console.error(error); 

    conn.reply(message.chat, "⚠️ حدث خطأ أثناء جلب الصور!", message); 

  } 

};

handler.help = ["pinterest"]; 

handler.tags = ["downloader"]; 

handler.command = /^(بينتر|بينتريست|بين)$/i;

export default handler;