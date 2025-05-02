import { canLevelUp, xpRange } from '../lib/levelling.js'

import { levelup } from '../lib/canvas.js'

import fetch from 'node-fetch'

let ranks = [

    "مبتدئ 🐣",

    "مقاتل تحت التدريب 🥋",

    "مقاتل محترف ⚔️",

    "نينجا خفي 🥷",

    "ساموراي متمرس 🏯",

    "صياد وحوش 🎯",

    "مستخدم طاقة خارقة 🔥",

    "سيد القتال 🏆",

    "حاكم المعركة 👑",

    "ملك الساحة 🦾",

    "متخطي الحدود 🚀"

];

let handler = async (m, { conn }) => {

    try {

        let who = m.isGroup ? (m.mentionedJid[0] ? m.mentionedJid[0] : m.sender) : m.sender;

        let url = await conn.profilePictureUrl(who, 'image').catch(() => null);

        let name = conn.getName(m.sender);

        let user = global.db.data.users[m.sender];

        let rankIndex = Math.min(user.level, ranks.length - 1);

        let rank = ranks[rankIndex];

        if (!canLevelUp(user.level, user.exp, global.multiplier)) {

            let { min, xp, max } = xpRange(user.level, global.multiplier);

            let keke = `

༺━─╃⌬ 🤖 ⌬╄─━༻

╭─━━⊱ *📊 مستوى المستخدم* ⊰━━─╮

│ 📌 *الاسم* : ${name}

│ 🎚️ *المستوى* : ${user.level}

│ 🎭 *الرتبة* : ${rank}

│ 💎 *الألماس* : ${user.limit}

│ 🔥 *نقاط XP* : ${user.exp - min}/${xp}

╰─━━━⊱【🔝】⊰━━━─╯

💡 تحتاج إلى *${max - user.exp} XP* لرفع مستواك! 🎯

╰━━━━━━━━━━━━━━━━╯

> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦

            `.trim();

            try {

                if (url) {

                    await conn.sendFile(m.chat, url, 'profile.jpg', keke, m);

                } else {

                    await m.reply(keke);

                }

            } catch (e) {

                await m.reply(keke);

            }

        } else {

            await checkLevelUp(m, conn);

        }

    } catch (error) {

        console.error(error);

        await m.reply('❌ حدث خطأ أثناء معالجة الأمر. يرجى المحاولة مرة أخرى.');

    }

};

export async function checkLevelUp(m, conn) {

    let user = global.db.data.users[m.sender];

    if (canLevelUp(user.level, user.exp, global.multiplier)) {

        let before = user.level;

        

        while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

        let rankIndexBefore = Math.min(before, ranks.length - 1);

        let rankIndexAfter = Math.min(user.level, ranks.length - 1);

        let oldRank = ranks[rankIndexBefore];

        let newRank = ranks[rankIndexAfter];

        let teks = `🎊 تهانينا ${conn.getName(m.sender)}! لقد ارتقيت إلى المستوى التالي!`;

        let str = `

༺━─╃⌬ 🆙 ⌬╄─━༻

╭─━━⊱ *🎖️ تمت ترقيتك!* ⊰━━─╮

│ 🔙 *المستوى السابق* : ${before}

│ 🎭 *الرتبة السابقة* : ${oldRank}

│ 🔝 *المستوى الجديد* : ${user.level}

│ 🏅 *الرتبة الجديدة* : ${newRank}

│ 🔥 *نقاط XP الحالية* : ${user.exp}

╰─━━━⊱【🚀】⊰━━━─╯

💡 استمر في التفاعل لرفع مستواك أكثر! 🚀🔥

╰━━━━━━━━━━━━━━━━╯

> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦

        `.trim();

        try {

            const img = await levelup(teks, user.level);

            await conn.sendFile(m.chat, img, 'levelup.jpg', str, m);

        } catch (e) {

            await m.reply(str);

        }

    }

}

handler.help = ['levelup'];

handler.tags = ['xp'];

handler.command = ['لفل', 'lvl', 'levelup', 'مستواي', 'مستوا'];

export default handler;