import { googleImage } from '@bochilteam/scraper';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // التحقق من وجود النص
    if (!text) throw `*[❗ خطأ ❗] مثال على الأمر: ${usedPrefix + command} مايكي*`;
    
    // منع المحتوى المحظور
    const forbidden = ['gore', 'cp', 'porno', 'Gore', 'rule', 'CP', 'Rule34'];
    if (forbidden.some(word => m.text.toLowerCase().includes(word.toLowerCase()))) {
        return m.reply('[❗ خطأ ❗] لا يمكنني إرسال هذا المحتوى، المجموعة محظورة.\nإذا كنت مشرفًا وتريد تنشيطها، أخبر المطور.');
    }
    
    try {
        // جلب الصور من جوجل
        const res = await googleImage(text);
        let image = await res.getRandom();
        let link = image;

        // إنشاء مجلد مؤقت إذا لم يكن موجودًا
        const tmpDir = './tmp';
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }

        // حفظ الصورة مؤقتًا
        const tempPath = path.join(tmpDir, `${Date.now()}.jpg`);
        const writer = fs.createWriteStream(tempPath);

        const response = await axios({
            method: 'GET',
            url: link,
            responseType: 'stream'
        });

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // إرسال الصورة مع الرسالة المطلوبة بدون رابط
        await conn.sendFile(
            m.chat,
            tempPath,
            'image.jpg',
            `🔎 *النتيجة ل:* ${text}\n\n╰━━━━━━━━━━━━━━━━━━━━╯\n> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`,
            m
        );

        // حذف الملف المؤقت بعد الإرسال
        fs.unlink(tempPath, (err) => {
            if (err) console.error('⚠️ فشل في حذف الملف المؤقت:', err);
        });

    } catch (error) {
        console.error('حدث خطأ:', error);
        m.reply('[❗ خطأ ❗] تعذر جلب الصورة، يرجى المحاولة لاحقًا.');
    }
};

handler.help = ['gimage <query>', 'imagen <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(صورة|image|صوره|imagen)$/i;

export default handler;