import { readdirSync, unlinkSync, existsSync, promises as fs, statSync, rmdirSync } from 'fs';

import path from 'path';

const handler = async (m, { conn, isOwner }) => {

  if (!isOwner) {

    return conn.sendMessage(m.chat, { text: '*[❗] هذا الأمر مخصص للمالك فقط*' }, { quoted: m });

  }

  // المجلدات التي سيتم تنظيفها

  const pathsToClean = ['logs', 'tmp', 'cache', 'node_modules/.cache'];

  try {

    let filesDeleted = 0;

    

    for (const dirPath of pathsToClean) {

      if (!existsSync(dirPath)) continue;

      const files = await fs.readdir(dirPath);

      for (const file of files) {

        const filePath = path.join(dirPath, file);

        

        try {

          const stats = statSync(filePath);

          if (stats.isFile()) {

            await fs.unlink(filePath);

            filesDeleted++;

          } else if (stats.isDirectory()) {

            rmdirSync(filePath, { recursive: true });

            filesDeleted++;

          }

        } catch (err) {

          console.error(`خطأ أثناء حذف الملف ${filePath}:`, err);

        }

      }

    }

    if (filesDeleted === 0) {

      return conn.sendMessage(m.chat, { text: '*[❗] لا توجد ملفات غير ضرورية لحذفها*' }, { quoted: m });

    }

    await conn.sendMessage(m.chat, { text: `*[✔] تم حذف ${filesDeleted} ملفًا غير ضروري من البوت*` }, { quoted: m });

  } catch (err) {

    console.error('خطأ أثناء تنظيف الملفات غير الضرورية:', err);

    await conn.sendMessage(m.chat, { text: '*[❗] حدث خطأ أثناء تنظيف الملفات غير الضرورية*' }, { quoted: m });

  }

};

handler.help = ['تنظيف'];

handler.tags = ['owner'];

handler.command = /^(تنظيف)$/i;

handler.rowner = true; // هذا الأمر للمالك فقط

export default handler;