let handler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'وصف') {
        if (!m.isGroup) {
            return conn.sendMessage(m.chat, { text: "❌ هذا الأمر يعمل فقط في المجموعات." }, { quoted: m });
        }

        let groupMetadata = await conn.groupMetadata(m.chat);
        let groupName = groupMetadata.subject;
        let groupDesc = groupMetadata.desc || "لا يوجد وصف متاح لهذه المجموعة.";

        let message = `༺━─╃⌬ 🤖 ⌬╄─━༻  
✨ **وصف مجموعة ${groupName}** ✨  
༺━─╃⌬ 🤖 ⌬╄─━༻  

📜 **الوصف الحالي:**  
${groupDesc}    
⁩*
╰━━━━━━━━━━━━━━━━╯


        `;

        conn.sendMessage(m.chat, { text: message });
    }
};

handler.help = ['وصف'];
handler.tags = ['group'];
handler.command = ['وصف'];
handler.fail = null;

export default handler;