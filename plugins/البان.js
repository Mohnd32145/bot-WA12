// import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    let who;

    

    if (command === 'المتبندين' || command === 'حذف-المتبندين') {

        who = null; // لا حاجة لتحديد شخص معين

    } else {

        if (m.isGroup) {handler.help

            who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;

        } else {

            who = m.chat;

        }

        if (!who) throw '❒ منشن الشخص لاستخدام هذا الأمر';

    }

    let users = global.db.data.users;

    

    switch (command) {

        case 'الغاء_البان':

            if (!users[who].banned) throw '❒ هذا المستخدم غير محظور بالفعل';

            users[who].banned = false;

            conn.reply(m.chat, `༺━─╃⌬ 🔓 ⌬╄─━༻\n\nتم إلغاء البان عن @${who.split('@')[0]}\n╰━━━━━━━━━━━━━━━━╯\n❖ 𓆩 ⫷✧ 𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓 ✧⫸ 𓆪 ❖`, m, { mentions: [who] });

            break;

        case 'بان':

            if (users[who].banned) throw '❒ هذا المستخدم محظور بالفعل';

            users[who].banned = true;

            conn.reply(m.chat, `༺━─╃⌬ 🔒 ⌬╄─━༻\n\nتم حظر @${who.split('@')[0]}\n╰━━━━━━━━━━━━━━━━╯\n❖ 𓆩 ⫷✧ 𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓 ✧⫸ 𓆪 ❖`, m, { mentions: [who] });

            break;

        case 'المتبندين':

            let bannedUsers = Object.entries(users).filter(([jid, data]) => data.banned);

            if (bannedUsers.length === 0) throw '❒ لا يوجد أي مستخدم محظور';

            let list = bannedUsers.map(([jid]) => `• @${jid.split('@')[0]}`).join('\n');

            conn.reply(m.chat, `❒ قائمة المتبندين:\n\n${list}\n╰━━━━━━━━━━━━━━━━╯\n❖ 𓆩 ⫷✧ 𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓 ✧⫸ 𓆪 ❖`, m, { mentions: bannedUsers.map(([jid]) => jid) });

            break;

        case 'حذف-المتبندين':

            let bannedCount = 0;

            for (let jid in users) {

                if (users[jid].banned) {

                    users[jid].banned = false;

                    bannedCount++;

                }

            }

            conn.reply(m.chat, `✅ تم إلغاء البان عن ${bannedCount} مستخدم(s)\n╰━━━━━━━━━━━━━━━━╯\n❖ 𓆩 ⫷✧ 𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓 ✧⫸ 𓆪 ❖`, m);

            break;

    }

};

handler.help = ['بان @user', 'الغاء_البان @user', 'المتبندين', 'حذف-المتبندين'];

handler.tags = ['owner'];

handler.command = /^(بان|الغاء_البان|المتبندين|حذف-المتبندين)$/i;

handler.rowner = true;

export default handler;