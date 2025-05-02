import fetch from 'node-fetch';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

let handler = async (m, { text, conn }) => {
  if (!text) throw '*[❗] يرجى إدخال اسم التطبيق الذي تريد البحث عنه.*';

  let source = `https://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(text)}&limit=1`;

  try {
    let response = await fetch(source);
    let json = await response.json();

    if (json && json.datalist && json.datalist.list.length > 0) {
      let app = json.datalist.list[0];
      let apkUrl = app.file.path;
      let fileSize = app.file.filesize / (1024 * 1024);
      let filePath = `./${app.package}.apk`;

      let caption = `📥 *تحميل من 𝑀𝐼𝐾𝐸𝑌 𝐵𝛩𝑇*\n\n` +
                    `📌 *الاسم:* ${app.name}\n` +
                    `📦 *الباكيج:* ${app.package}\n` +
                    `🕒 *آخر تحديث:* ${app.file.upload_time}\n` +
                    `📂 *الحجم:* ${fileSize.toFixed(2)} MB\n` +
                    `🔗 *رابط التحميل:* [اضغط هنا](${apkUrl})\n\n` +
                    `╰━━━━━━━━━━━━━━━━╯\n` +
                    `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

      let apkResponse = await fetch(apkUrl);
      if (!apkResponse.ok) throw '*❌ فشل تحميل ملف الـ APK.*';

      let buffer = await apkResponse.buffer();
      await writeFile(filePath, buffer);

      await conn.sendMessage(m.chat, { 
        document: fs.readFileSync(filePath), 
        mimetype: 'application/vnd.android.package-archive', 
        fileName: `${app.name}.apk`
      }, { quoted: m });

      await conn.sendFile(m.chat, app.icon, 'app_icon.jpg', caption, m);

      await unlink(filePath); // حذف الملف بعد الإرسال

    } else {
      throw '*❌ لم يتم العثور على نتائج.*';
    }
  } catch (e) {
    console.error(`خطأ أثناء البحث:`, e);
    throw '*❌ حدث خطأ أثناء البحث. حاول مرة أخرى لاحقًا.*';
  }
};

handler.command = ['apk'];

export default handler;