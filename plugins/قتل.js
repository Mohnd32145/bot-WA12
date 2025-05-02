// تعريف متغير لربط conn بين الوظائف
let botConnection;

let handler = async (m, { conn, text, command, mentionedJid }) => {
    // حفظ اتصال البوت في المتغير العام
    botConnection = conn;
    
    let user;

    if (m.quoted) {
        user = m.quoted.sender;
    } else if (text) {
        if (text.includes('@')) {
            user = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        } else if (!isNaN(text)) {
            user = text + '@s.whatsapp.net';
        } else {
            return m.reply(`༺━──⌬ *تنبيه!* ⌬──━༻\n📌 *مـنـشن الــشـخص أو رد على رسالته !*`);
        }
    } else if (mentionedJid && mentionedJid[0]) {
        user = mentionedJid[0];
    } else {
        return m.reply(`༺━──⌬ *تنبيه!* ⌬──━༻\n📌 *مـنـشن الــشـخص أو رد على رسالته !*`);
    }

    let numberWithoutPrefix = user.split('@')[0];
    if (numberWithoutPrefix.length > 13 || numberWithoutPrefix.length < 11) {
        return m.reply(`༺━──⌬ *خطأ!* ⌬──━༻\n🚫 *الـرقـم غـلط !*`);
    }

    let userData = global.db.data.users[user] || { isDead: false, messageCount: 0 };
    global.db.data.users[user] = userData;

    if (command === 'قتل' || command === 'مات') {
        if (userData.isDead) return m.reply(`@${numberWithoutPrefix} هو بالفعل ميت!`, null, { mentions: [user] });
        
        userData.isDead = true;
        userData.messageCount = 0;

        await conn.sendMessage(m.chat, {
            text: `⚔️ تم قتل المستخدم: @${numberWithoutPrefix}\n🚫 لم يعد بإمكانه إرسال رسائل . لاعادته للحياة اكتب انعاش.`,
            mentions: [user]
        });

        await conn.groupParticipantsUpdate(m.chat, [user], 'mute');

    } else if (command === 'إنعاش' || command === 'revive') {
        if (!userData.isDead) return m.reply(`@${numberWithoutPrefix} ليس ميتًا!`, null, { mentions: [user] });

        userData.isDead = false;
        userData.messageCount = 0;

        await conn.groupParticipantsUpdate(m.chat, [user], 'unmute');

        await conn.sendMessage(m.chat, {
            text: `@${numberWithoutPrefix} تم إنعاشه! 💖`,
            mentions: [user]
        });
    }
};

// دالة معالجة الرسائل للموتى
const handleDeadUserMessages = async (m) => {
    if (!m.key.fromMe && m.key.remoteJid.endsWith('g.us')) {
        const user = m.participant || m.key.participant;
        const userData = global.db.data.users[user] || { isDead: false };
        
        if (userData.isDead) {
            try {
                // حذف الرسالة
                await botConnection.sendMessage(m.key.remoteJid, { 
                    delete: { 
                        remoteJid: m.key.remoteJid, 
                        fromMe: false, 
                        id: m.key.id, 
                        participant: m.key.participant 
                    } 
                });
                
                // زيادة عداد الرسائل
                userData.messageCount = (userData.messageCount || 0) + 1;
                
                // إذا تجاوز عدد الرسائل حد معين (20 رسالة)
                if (userData.messageCount > 20) {
                    await botConnection.groupParticipantsUpdate(m.key.remoteJid, [user], 'remove');
                    await botConnection.sendMessage(m.key.remoteJid, { 
                        text: `🚫 @${user.split('@')[0]} تم طرده لتحقيق التوازنن لا يمكن للأموااات الحدييث!`, 
                        mentions: [user] 
                    });
                    userData.isDead = false;
                    userData.messageCount = 0;
                }
            } catch (error) {
                console.error('حدث خطأ أثناء معالجة رسالة المستخدم الميت:', error);
            }
        }
    }
};

// دالة لربط معالج الأحداث
export function injectBot(conn) {
    botConnection = conn;
    
    // معالج الأحداث لرسائل المجموعات
    conn.ev.on('messages.upsert', async ({ messages }) => {
        for (const m of messages) {
            await handleDeadUserMessages(m);
        }
    });
}

handler.help = ['قتل (@tag)', 'مات (@tag)', 'إنعاش (@tag)', 'revive (@tag)'];
handler.tags = ['group'];
handler.command = ['قتل', 'مات', 'إنعاش', 'revive'];
handler.group = true;
handler.botAdmin = true;

export default handler;