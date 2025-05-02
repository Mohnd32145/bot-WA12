import axios from 'axios';
import * as cheerio from 'cheerio';

const tikvid = {
    link: 'https://tikvid.io',
    regex: /(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[\w.-]+\/video\/\d+|vm\.tiktok\.com\/\w+|vt\.tiktok\.com\/\w+)/,

    headers: {
        'accept': '*/*',
        'accept-language': 'id-MM,id;q=0.9',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://tikvid.io',
        'referer': 'https://tikvid.io/',
        'user-agent': 'Postify/1.0.0'
    },

    download: async (url) => {
        if (!tikvid.regex.test(url)) return { error: "> *\`『 هات رابط فيديو تيك توك صحيح لتحميله 🎥 』\`*" };
        try {
            const { data } = await axios.post(`${tikvid.link}/api/ajaxSearch`, new URLSearchParams({
                q: url,
                lang: 'en'
            }), { headers: tikvid.headers });

            const $ = cheerio.load(data.data);
            const result = {
                videoUrl: null,
                audioUrl: null
            };

            $('.dl-action a').each((_, el) => {
                const $el = $(el);
                const href = $el.attr('href');
                const text = $el.text().trim().toLowerCase();
                if (href && text.includes('mp4')) {
                    result.videoUrl = href;
                } else if (href && text.includes('mp3')) {
                    result.audioUrl = href;
                }
            });

            if (!result.videoUrl) return { error: "> *\`『 لم يتم العثور على رابط لتحميل الفيديو 🚫 』\`*" };

            return result;
        } catch (error) {
            return { error: "> *\`『 حدث خطأ أثناء التحميل، حاول مرة أخرى ❌ 』\`*", details: error.message };
        }
    }
};

let handler = async (m, { text, conn }) => {
    if (!text) return m.reply("> *\`『 هات رابط فيديو تيك توك لتحميله 🎥 』\`*");

    const result = await tikvid.download(text);

    if (result.error) {
        m.reply(result.error);
    } else {
        // إرسال الفيديو
        if (result.videoUrl) {
            await conn.sendFile(m.chat, result.videoUrl, '', null, m, true);
        }

        // إرسال الصوت
        if (result.audioUrl) {
            await conn.sendFile(m.chat, result.audioUrl, '', null, m, true);
        }
    }
};

handler.help = ['تيك'];
handler.tags = ['downloader'];
handler.command = /^(تيك)$/i;
export default handler;