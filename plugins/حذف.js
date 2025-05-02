let handler = async (m, { conn, isAdmin, isOwner }) => {

    if (!m.quoted) return m.reply('⚠️ يرجى الإشارة إلى رسالة لحذفها!');

    

    if (!isAdmin && !isOwner) {

        return m.reply(`🚨 يجب أن يكون البوت وأنت مشرفين لاستخدام هذا الأمر!`);

    }

    const key = {

        remoteJid: m.chat,

        fromMe: m.quoted.fromMe,

        id: m.quoted.id,

        participant: m.quoted.sender,

    };

    await conn.sendMessage(m.chat, { delete: key });

};

handler.help = ['حذف', 'مسح'];

handler.tags = ['group'];

handler.command = /^(حذف|مسح)$/i;

handler.admin = true;

handler.group = true;

export default handler;