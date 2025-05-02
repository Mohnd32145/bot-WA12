let الحد_الاقصى_للانذارات = global.maxwarn || 3; // تأكد من وجود قيمة افتراضية إذا لم يكن maxwarn محدد
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
    let الشخص;
    if (m.isGroup) {
        الشخص = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        الشخص = m.chat;
    }
    if (!الشخص) throw '> *「 منشن الشخص اللي عايز تديله إنذار 」*';
    if (!(الشخص in global.db.data.users)) throw '> *「 الشخص مش موجود في قاعدة البيانات 」*';
    
    let اسم_الادمن = conn.getName(m.sender);
    let انذارات = global.db.data.users[الشخص].warn;

    if (انذارات < الحد_الاقصى_للانذارات) {
        global.db.data.users[الشخص].warn += 1;
        m.reply(`> *「 إنذار 🧚🏻‍♂️ 」*

@${الشخص.split`@`[0]} *\`『 انذار من 』\`*: ${اسم_الادمن}
•*\`『 عدد الانذرات 』\`* ${انذارات + 1}/${الحد_الاقصى_للانذارات}
• *\`『 السبب 』\`*: ${text}`, null, { mentions: [الشخص] });
    } else if (انذارات >= الحد_الاقصى_للانذارات) {
        global.db.data.users[الشخص].warn = 0;
        m.reply(`⚠️ العضو عدى الحد الأقصى للإنذارات (${الحد_الاقصى_للانذارات}) وهينطرد من الجروب...`);
        await time(3000);
        await conn.groupParticipantsUpdate(m.chat, [الشخص], 'remove');
    }
};

// تعريب الأوامر
handler.help = ['انذار @user'];
handler.tags = ['جروب'];
handler.command = ['انذار', 'تحذير'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};