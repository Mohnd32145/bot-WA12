
           import translate from '@vitalets/google-translate-api';

import { Anime } from '@shineiichijo/marika';

const client = new Anime();

const handler = async (m, { conn, text, command, usedPrefix }) => {

    if (!text) return m.reply(`⚠️ يرجى إدخال اسم الأنمي الذي تريد البحث عنه!`);

    try {

        const anime = await client.searchAnime(text);

        if (!anime || !anime.data || anime.data.length === 0) {

            return m.reply(`❌ لم يتم العثور على أي نتائج للبحث: *${text}*`);

        }

        const result = anime.data[0];

        // التحقق من وجود البيانات قبل الترجمة

        const الخلفية = result.background ? (await translate(result.background, { to: 'ar' })).text : "غير متوفر";

        const الملخص = result.synopsis ? (await translate(result.synopsis, { to: 'ar' })).text : "غير متوفر";

        const معلومات_الأنمي = `

🎥 *معلومات الأنمي*  

📌 *الاسم:* ${result.title || "غير متوفر"}  

🎬 *عدد الحلقات:* ${result.episodes || "غير متوفر"}  

🔗 *المصدر:* ${result.source?.toUpperCase() || "غير متوفر"}  

🗓 *تاريخ الإصدار:* ${result.aired?.from || "غير متوفر"}  

⭐ *الشعبية:* ${result.popularity || "غير متوفر"}  

💖 *عدد المفضلات:* ${result.favorites || "غير متوفر"}  

⌛ *مدة الحلقة:* ${result.duration || "غير متوفر"}  

📊 *التقييم:* ${result.rating || "غير متوفر"}  

🎞 *رابط العرض الترويجي:* ${result.trailer?.url || "غير متوفر"}  

🔗 *رابط MAL:* ${result.url || "غير متوفر"}

`;

        conn.sendButton(

            m.chat,

            معلومات_الأنمي,

            null,

            result.images?.jpg?.image_url || null,

            [

                ['🔎 قائمة البحث', '#buscarmenu'],

                ['✨ القائمة الكاملة', '.allmenu'],

                ['☘️ العودة إلى القائمة', '/menu']

            ],

            null,

            [['📸 إنستغرام', 'https://instagram.com']],

            m

        );

    } catch (e) {

        await conn.reply(m.chat, `⚠️ حدث خطأ أثناء البحث عن الأنمي! جرب مرة أخرى أو أبلغ عن المشكلة باستخدام: #report`, m);

        console.log(`❗❗ خطأ في الأمر ${usedPrefix + command} ❗❗`);

        console.log(e);

    }

};

// تعريب أمر التشغيل

handler.command = /^(أنمي|معلومات_أنمي|anime|animeinfo)$/i;

export default handler;
            

