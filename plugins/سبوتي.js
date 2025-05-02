import fetch from 'node-fetch';

const handler = async (m, { text, conn, command, args }) => {

  try {

    if (!args.length) {

      return await m.reply("❌ يرجى توفير اسم الأغنية أو رابط Spotify للبحث.");

    }

    let query = args.join(" ");

    let apiUrl;

    // التحقق مما إذا كان الإدخال رابط Spotify

    if (query.includes("spotify.com/track/")) {

      apiUrl = `https://takamura-api.joanimi-world.site/api/spotify?url=${encodeURIComponent(query)}`;

    } else {

      apiUrl = `https://takamura-api.joanimi-world.site/api/search/spotify?name=${encodeURIComponent(query)}`;

    }

    let response = await fetch(apiUrl);

    let data = await response.json();

    if (!data.status || !data.results.length) {

      return await m.reply("❌ لم يتم العثور على أي نتائج.");

    }

    let msg = `🎵 *نتائج البحث عن:* _${query}_\n\n`;

    data.results.slice(0, 5).forEach((song, index) => {

      msg += `*${index + 1}. ${song.title}*\n`;

      msg += `🎤 *الفنان:* ${song.artist}\n`;

      msg += `⏱ *المدة:* ${song.duration}\n`;

      msg += `🔗 [الاستماع على Spotify](${song.url})\n\n`;

    });

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

  } catch (error) {

    console.error("Error:", error);

    await m.reply("❌ حدث خطأ أثناء تنفيذ الأمر.");

  }

};

handler.help = ["spotify"];

handler.tags = ["music"];

handler.command = ['سبوتي', 'سبوتيفاي'];

export default handler;