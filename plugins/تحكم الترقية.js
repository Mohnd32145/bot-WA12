let handler = async (m, { conn, args, command }) => {

    let chat = global.db.data.chats[m.chat] || {};

    

    // التحقق من صلاحيات المشرف بشكل أدق

    let participants = await conn.groupMetadata(m.chat).catch(e => null);

    let isAdmin = participants ? participants.participants.find(p => p.id === m.sender)?.admin : null;

    

    if (!isAdmin) {

        return conn.sendMessage(m.chat, {

            text: '╭───『 ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦ 』\n│\n│ ⚠️ *عذراً!*\n│ هذا الأمر للمشرفين فقط\n╰───『 🛡️ 𝑀𝐼𝐾𝐸𝑌 𝐵𝛩𝑇 』',

            mentions: [m.sender]

        }, { quoted: m });

    }

    if (!args[0]) {

        return conn.sendMessage(m.chat, {

            text: `

╭───『 الترقية 』
│ ⚙️ *طريقة الاستخدام:*
│ ▢ ${command} on
│   ↳ لتفعيل النظام
│ ▢ ${command} off
│   ↳ لإيقاف النظام
╰───『 𝑌𝑜𝑟𝑢𝑖𝑐ℎ𝑖 𝐵𝑜𝓉 𝑀𝐷
 』

            `.trim(),

            mentions: [m.sender]

        }, { quoted: m });

    }

    let action = args[0].toLowerCase();

    chat.autolevelup = action === 'on';

    conn.sendMessage(m.chat, {

        text: `

╭───『 الترقية 』
│ ✅ *تم ${chat.autolevelup ? 'تشغيل' : 'إيقاف'}*
│    نظام الترقية التلقائية
╰───『 𝑌𝑜𝑟𝑢𝑖𝑐ℎ𝑖 𝐵𝑜𝓉 𝑀𝐷
 』

        `.trim(),

        mentions: [m.sender]

    }, { quoted: m });

}

handler.command = ['الترقية','autolevel'];

handler.tags = ['group'];

handler.group = true;

export default handler;