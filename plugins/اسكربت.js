import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url'; 

import { dirname } from 'path';

import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const handler = async (m, { conn }) => {

    const developers = ["994400776021@s.whatsapp.net"];

    const senderJid = m.sender;

    if (!developers.includes(senderJid)) {

        return conn.sendMessage(m.chat, { text: "*❮ ❌ ┇ لا يمكنك استخدام هذا الأمر ❯*" }, { quoted: m });

    }

    const botFolderPath = path.join(__dirname, '../');

    const zipFilePath = path.join(__dirname, '../bot_files.zip');

    const { key } = await conn.sendMessage(m.chat, { text: "⏳ جاري التحقق من الملفات..." }, { quoted: m });

    try {

        const excludedExtensions = ['.zip', '.tar.gz', '.tar', '.rar', '.7z', '.gz'];

        const excludedFolders = ['node_modules', '.npm', '.git', 'cache', '.cache'];

        const files = fs.readdirSync(botFolderPath).filter(file => {

            const filePath = path.join(botFolderPath, file);

            const ext = path.extname(file).toLowerCase();

            const isDirectory = fs.statSync(filePath).isDirectory();

            

            return (isDirectory || ext) && !excludedExtensions.includes(ext) && !excludedFolders.includes(file);

        });

        if (files.length === 0) {

            return conn.sendMessage(m.chat, { text: "⚠️ لا توجد ملفات مناسبة.", edit: key }, { quoted: m });

        }

        await conn.sendMessage(m.chat, { text: `📂 تم العثور على ${files.length} ملفات/مجلدات. جاري إنشاء الملف...`, edit: key }, { quoted: m });

        const zipCommand = `zip -r "${zipFilePath}" . -x "*.zip" "*.tar.gz" "*.tar" "*.rar" "*.7z" "*.gz" "node_modules/*" ".npm/*" ".git/*" "cache/*" ".cache/*"`;

        await conn.sendMessage(m.chat, { text: `⏳ يتم الآن ضغط الملفات...`, edit: key }, { quoted: m });

        exec(zipCommand, { cwd: botFolderPath }, async (error, stdout, stderr) => {

            if (error) {

                return conn.sendMessage(m.chat, { text: `❌ حدث خطأ: ${error.message}`, edit: key }, { quoted: m });

            }

            if (!fs.existsSync(zipFilePath)) {

                return conn.sendMessage(m.chat, { text: "❌ لم يتم إنشاء الملف.", edit: key }, { quoted: m });

            }

            await conn.sendMessage(m.chat, { text: "✅ تم إنشاء الملف بنجاح. يتم الآن إرساله...", edit: key }, { quoted: m });

            await conn.sendMessage(m.chat, {

                document: fs.readFileSync(zipFilePath),

                mimetype: 'application/zip',

                fileName: 'bot_files.zip'

            }, { quoted: m });

            fs.unlink(zipFilePath, async (err) => {

                if (err) {

                    return conn.sendMessage(m.chat, { text: `⚠️ حدث خطأ أثناء حذف الملف: ${err.message}`, edit: key }, { quoted: m });

                }

                conn.sendMessage(m.chat, { text: "🗑️ تم حذف الملف بعد الإرسال.", edit: key }, { quoted: m });

            });

        });

    } catch (err) {

        await conn.sendMessage(m.chat, { text: `❌ فشل في معالجة الملفات: ${err.message}`, edit: key }, { quoted: m });

    }

};

handler.help = ['getplugin'];

handler.tags = ['owner'];

handler.command = /^(اسكربتي)$/i;

handler.owner = true;

export default handler;