import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const device = await getDevice(m.key.id);
    const mentionId = m.key.participant || m.key.remoteJid;

    const uptime = process.uptime();
    const uptimeString = `${Math.floor(uptime / 60)} دقائق ${Math.floor(uptime % 60)} ثواني`;
    m.react('📜');

    if (device !== 'desktop' && device !== 'web') {      
        var joanimiimg = await prepareWAMessageMedia({ image: {url: 'https://files.catbox.moe/97r58w.jpg'}}, { upload: conn.waUploadToServer });
        const interactiveMessage = {
            body: { text: `\n◞❐ *وقـت الـتـشـغـيـل: ${uptimeString}*`.trim() },
            footer: { text: ` *ممنوع سب او شتم البوت = سبيت المطور تمتع اعشيري بالبوت وعنداك تكتر رسائل للبوت الى عندك شي موشكيل اولى باغي شي اضافة لبوت تواصل معا المطور * ◞❐wa.me/994400776021`.trim() },  
            header: {
                title: `◞❐ *نورتينا اعشييري قائمة الاوامر*\n*◞❐ تفضل القائمة يا:* @${mentionId.split('@')[0]}`,
                subtitle: ``,
                hasMediaAttachment: true,
                imageMessage: joanimiimg.imageMessage,
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: '⌝قـائـمـه الاوامـر⌞',
                            sections: [
                                {
                                    title: 'List',
                                    highlight_label: '1',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '◡̈⃝˼‏👤˹ ━━|قسم الجروب│━━˼👤˹◡̈⃝',
                                            id: '.م1'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '2',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '🚻 ◡̈⃝☠︎︎━━ |قسم الالقاب│━━☠︎︎🚻 ◡̈⃝‎',
                                            id: '.م5'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '3',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '🂱◡̈⃝📿━━│قسم الديني│━━◡̈⃝🂱📿',
                                            id: '.م7'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '4',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '◡̈⃝˼‏🏌˹ ━━|قسم الترفيه│━━˼‏🕺🏻˹◡̈⃝',
                                            id: '.م4'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '5',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '⬇️◡̈⃝ ━━│ قسم التحميل │━━◡̈⃝⬇️',
                                            id: '.م11'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '6',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '◡̈⃝˼‏⚡️˹ ━━|قسم الاستقبال│━━˼🔥˹◡̈⃝⃝',
                                            id: '.م9'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '7',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '◡̈⃝⚙️❏━━│قسم الاديت│━━❏◡̈⃝⚙️',
                                            id: '.م8'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '8',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '🏦❏━━│قسم البنك│━━❏◡̈⃝🏦',
                                            id: '.م6'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '9',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '◡̈⃝📢❏━━│قسم الاصوات│━━❏◡̈⃝📢',
                                            id: '.م12'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '10',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '◡̈⃝˼‏👤˹ ━━|قسم الفعليات│━━˼✨˹◡̈⃝',
                                            id: '.م2'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '11',
                                    rows: [
                                        {

                                            title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                            description: '🔧◡̈⃝❏━━│قسم المطور│━━❏◡̈⃝🔧',
                                            id: '.م3'
                                        }
                                    ]
                                },
                                {
                                highlight_label: '12',
                                  rows: [
                                {
                                    title: '𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓',
                                    description: '◡̈⃝˼‏🤖˹ ━━|قسم الذكاء│━━˼😋˹◡̈⃝⃝',
                                    id: '.م10'
                                }
                            ]
                        }
                    ]
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: 'قناتي🤺🔥',
                    url: 'https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c',
                    merchant_url: ''
                })
                    },
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            display_text: 'call',
                            id: '.صوره'
                        })
                    }
                ],
                messageParamsJson: ''
            }
        };        

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m });
        msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: [mentionId] };
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        conn.sendFile(m.chat, 'JoAnimi•Error.jpg', m);      
    };  
    conn.sendMessage(m.chat, { 
    audio: { url: '' }, 
    mimetype: 'audio/mpeg', 
    ptt: true
}, { quoted: m });
};
handler.help = ['imgboton'];
handler.tags = ['For Test'];
handler.command = /^(help|الاوامر|menu|أوامر|menu|اوامر)$/i;
export default handler;