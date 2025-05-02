import fs from 'fs';

import sharp from 'sharp';

import path from 'path';

let handler = async (m, { conn, usedPrefix, command }) => {

    if (command === 'جودة') {

        let taguser = m.sender.split('@')[0];

        // التحقق مما إذا كان المستخدم رد على صورة

        if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.startsWith('image/')) {

            return conn.sendMessage(m.chat, { text: '❌ يرجى الرد على صورة بالأمر "جودة" لتحسينها إلى HD.' });

        }

        // إنشاء مجلد temp إذا لم يكن موجودًا

        let tempDir = './temp';

        if (!fs.existsSync(tempDir)) {

            fs.mkdirSync(tempDir);

        }

        // تنزيل الصورة من الرسالة المقتبسة

        let media = await m.quoted.download();

        let inputPath = path.join(tempDir, `input_${taguser}.jpg`);

        let outputPath = path.join(tempDir, `enhanced_${taguser}.jpg`);

        fs.writeFileSync(inputPath, media);

        try {

            // تحسين جودة الصورة إلى HD باستخدام Sharp

            await sharp(inputPath)

                .resize({ width: 2000, height: 2000, fit: 'inside' }) // زيادة الأبعاد مع الحفاظ على النسبة

                .sharpen() // زيادة الوضوح

                .modulate({ brightness: 1.1, saturation: 1.2 }) // تحسين الألوان

                .jpeg({ quality: 95 }) // تحسين الجودة إلى أعلى مستوى

                .toFile(outputPath);

            // إرسال الصورة المحسنة للمستخدم

            await conn.sendMessage(m.chat, { 

                image: fs.readFileSync(outputPath), 

                caption: `✅ تم تحسين الصورة إلى **HD** يا @${taguser}!`, 

                mentions: [m.sender] 

            });

            // حذف الملفات المؤقتة بعد الإرسال

            fs.unlinkSync(inputPath);

            fs.unlinkSync(outputPath);

        } catch (error) {

            console.error("❌ خطأ في تحسين الصورة:", error);

            conn.sendMessage(m.chat, { text: '❌ حدث خطأ أثناء تحسين الصورة إلى HD.' });

        }

    }

};

handler.help = ['جودة'];

handler.tags = ['image'];

handler.command = ['جودة'];

handler.fail = null;

export default handler;