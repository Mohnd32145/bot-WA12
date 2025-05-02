import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'messageCount.json');

// تحميل بيانات الرسائل

let messageCount = {};

if (fs.existsSync(filePath)) {

    try {

        messageCount = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    } catch (error) {

        console.error('❌ خطأ في تحميل بيانات الرسائل:', error);

        messageCount = {};

    }

} else {

    fs.writeFileSync(filePath, JSON.stringify({}, null, 2));

}

// تحديث عدد الرسائل للمستخدم

const updateMessageCount = async (user) => {

    messageCount[user] = (messageCount[user] || 0) + 1;

    await fs.promises.writeFile(filePath, JSON.stringify(messageCount, null, 2));

};

// تصفير جميع حسابات الأعضاء بحذف الملف

const resetMessageCount = async () => {

    if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath); // حذف الملف نهائيًا

    }

    messageCount = {}; // إعادة تعيين البيانات

};

// حساب الرتبة بناءً على عدد الرسائل

const getRank = (messages) => {

    const ranks = [

        { limit: 10000, rank: '👑 ملك' },

        { limit: 7500, rank: '🔥 أسطورة' },

        { limit: 5000, rank: '⚡ محترف' },

        { limit: 2500, rank: '✨ خبير' },

        { limit: 1000, rank: '🏅 متقدم' },

        { limit: 500, rank: '🌟 نشيط' },

        { limit: 250, rank: '🔆 متفاعل' },

        { limit: 100, rank: '📢 مبتدئ' },

        { limit: 30, rank: '🟢 عضو جديد' },

        { limit: 0, rank: '🥉 غير نشط' }

    ];

    return ranks.find(r => messages >= r.limit).rank;

};

const formatStats = (user, count) => {

    let rank = getRank(count);

    return `*❐═━━━═╊⊰🏯⊱╉═━━━═❐*\n*إحــصــائــيــات الــعــضــو ✅*\n\n`

        + `🆔 *الــعــضــو :* *@${user.split('@')[0]}*\n`

        + `📨 *عــدد الــرســائــل :* *${count}*\n`

        + `🥇 *الــرتــبــة :* *${rank}*\n*❐═━━━═╊⊰🏯⊱╉═━━━═❐*\n`

        + `╰━━━━━━━━━━━━━━━━╯\n`

        + `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

};

const handler = async (m, { conn, command, args, participants, isAdmin, isOwner }) => {

    let chat = m.chat;

    let mentionedUser = args[0] ? args[0].replace(/@/g, '') + '@s.whatsapp.net' : null;

    let targetUser = mentionedUser || m.sender;

    let count = messageCount[targetUser] || 0;

    let caption;

    if (command === 'رسايلي') {

        caption = formatStats(m.sender, count);

    } else if (command === 'حسبته' && mentionedUser) {

        caption = formatStats(targetUser, count);

    } else if (command === 'تصفير') {

        if (!isAdmin && !isOwner) {

            return conn.sendMessage(chat, { text: '❌ *هذا الأمر مخصص للمشرفين فقط!*' }, { quoted: m });

        }

        await resetMessageCount();

        return conn.sendMessage(chat, { text: '✅ *تم تصفير جميع الرسائل وحذف السجل بنجاح!*' }, { quoted: m });

    } else {

        let sortedUsers = Object.entries(messageCount)

            .filter(([user]) => participants.some(p => p.id === user))

            .sort((a, b) => b[1] - a[1]);

        caption = `*حــســبــه الــتــفــاعــل ⚡*\n\n`;

        sortedUsers.forEach(([user, count], index) => {

            caption += `${formatStats(user, count)}\n\n`;

        });

    }

    // إرسال الرسالة مع صورة

    return conn.sendMessage(

        chat,

        {

            image: { url: 'https://files.catbox.moe/egwifo.jpg' },

            caption: caption,

            mentions: participants.map(p => p.id)

        },

        { quoted: m }

    );

};

// السماح للأوامر فقط في المجموعات

handler.command = ['حسبه', 'رسايلي', 'حسبته', 'تصفير'];

handler.group = true;

// تحديث عدد الرسائل عند إرسال أي رسالة

handler.before = async (m) => {

    if (!m.sender || !m.isGroup) return;

    

    // إعادة إنشاء ملف التخزين إذا لم يكن موجودًا

    if (!fs.existsSync(filePath)) {

        fs.writeFileSync(filePath, JSON.stringify({}, null, 2));

    }

    

    await updateMessageCount(m.sender);

};

export default handler;