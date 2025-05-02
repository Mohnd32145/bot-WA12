const handler = async (m, { conn }) => {

    let groupLink = "https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c";

    

    // إرسال رد فعل (إيموجي)

    await conn.sendMessage(m.chat, { react: { text: '📎', key: m.key } });

    // نص الرسالة

    let message = `

╭─「 *جروب البوت* 」
│🔹 *رابط الجروب:* 
│ ${groupLink}
╰━━━━━━━━━━━━━━━╯

`.trim();

    // إرسال الرسالة مع ذكر المرسل

    await conn.sendMessage(m.chat, { 

        text: message, 

        mentions: [m.sender],

        contextInfo: {

            externalAdReply: {

                title: ' 𝐵𝛩𝑇',

                body: 'انضم إلى جروب البوت الرسمي',

              
                sourceUrl: groupLink,

                mediaType: 1,

                renderLargerThumbnail: true

            }

        }

    });

};

handler.command = ['مجموعة البوت', 'group'];

export default handler;