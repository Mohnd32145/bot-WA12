import ffmpeg from 'fluent-ffmpeg';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';

let handler = async (m, { conn }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = q.mimetype || (q.msg && q.msg.mimetype) || '';
        
        if (!/video|audio/.test(mime)) {
            throw '✳️ قم بالرد على فيديو أو مقطع صوتي لتحويله إلى صوت';
        }

        let media = await q.download?.();
        if (!media || media.length === 0) {
            throw '❎ فشل تحميل الوسائط';
        }

        // حفظ الملف مؤقتًا
        const inputPath = `./temp_input_${Date.now()}.mp4`;
        const outputPath = `./temp_output_${Date.now()}.mp3`;
        
        writeFileSync(inputPath, media);

        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .output(outputPath)
                .audioCodec('libmp3lame')
                .on('end', () => resolve())
                .on('error', (err) => reject(err))
                .run();
        });

        const audioData = readFileSync(outputPath);
        await conn.sendFile(m.chat, audioData, 'audio.mp3', '', m, null, { mimetype: 'audio/mpeg' });

        // حذف الملفات المؤقتة
        unlinkSync(inputPath);
        unlinkSync(outputPath);

    } catch (err) {
        m.reply('❎ حدث خطأ: ' + err.message);
    }
};

handler.help = ['tomp3'];
handler.tags = ['tools'];
handler.command = /^(لصوت|لفويس|tomp3)$/i;

export default handler;