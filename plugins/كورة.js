import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const timeout = 60000;

const poin = 2000;

const players = [

  { name: 'نوير', image: 'https://i.ibb.co/vLrZcSW/manuel-neuer.jpg', options: ['نويـر', 'مودريتش', 'كامافينغا', 'خوسيلو'] },

  { name: 'ميسي', image: 'https://i.ibb.co/Yc7C2Ry/messi.jpg', options: ['ميسي', 'رونالدو', 'نيمار', 'ديبالا'] },

  // بقية اللاعبين...

];

let handler = async (m, { conn, command }) => {

    if (!global.db.data.users[m.sender]) {

        global.db.data.users[m.sender] = { exp: 0 };

    }

    let user = global.db.data.users[m.sender];

    if (command.startsWith('answer_')) {

        let id = m.chat;

        let Mori = conn.Mori[id];

        if (!Mori) {

            return conn.reply(m.chat, `❌ *لَا يــوجــد اخــتــبــار نــشــط فــي الــوقــت الــحــالــي*`, m);

        }

        let selectedAnswer = command.split('_')[1];

        let isCorrect = Mori.correctAnswer === selectedAnswer;

        if (isCorrect) {

            user.exp += poin;

            await conn.reply(m.chat, `✅ *إجــابــة صــحــيــحــة! ربحــت ${poin} مــن XP!📍*`, m);

            clearTimeout(Mori.timer);

            delete conn.Mori[id];

        } else {

            Mori.attempts -= 1;

            if (Mori.attempts > 0) {

                await conn.reply(m.chat, `❌ *إجــابــة خــاطــئــة. تــبــقــى ${Mori.attempts} مــحــاولات.*`, m);

            } else {

                await conn.reply(m.chat, `❌ *انــتــهــت الــمــحــاولات. الــإجــابــة الــصــحــيــحــة هــي:* ${Mori.correctAnswer}`, m);

                clearTimeout(Mori.timer);

                delete conn.Mori[id];

            }

        }

    } else {

        try {

            conn.Mori = conn.Mori || {};

            let id = m.chat;

            if (conn.Mori[id]) {

                return conn.reply(m.chat, `⌛ *لَا يــمــكــنــك بــدء اخــتــبــار جــديــد حــتــى تــنــتــهــي مــن الاخــتــبــار الــحــالــي.*`, m);

            }

            let player = players[Math.floor(Math.random() * players.length)];

            let options = [...player.options].sort(() => Math.random() - 0.5);

            const media = await prepareWAMessageMedia({ image: { url: player.image } }, { upload: conn.waUploadToServer });

            const interactiveMessage = {

                body: {

                    text: ` 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚽❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثـانـيـة┇❯*

*❐↞┇الـجـائـزة💰↞ ${poin} XP┇❯* 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪⚽❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

⚡ *مـن هـذا الـلاعـب؟* ⚡

🏦 *إسـتـخـدم [ .لــفــل ] لـلإطـلاع عـلـى مــســتــواك*

╰━━━━━━━━━━━━━━━━━━━━╯

> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`,

                },

                footer: { text: 'اخــتــر اســم الــلاعــب الــصــحــيــح:' },

                header: {

                    title: 'مــرحــبــا',

                    subtitle: 'اخــتــر أحــد الــخــيــارات أدنــاه:',

                    hasMediaAttachment: true,

                    imageMessage: media.imageMessage,

                },

                nativeFlowMessage: {

                    buttons: options.map((option) => ({

                        name: 'quick_reply',

                        buttonParamsJson: JSON.stringify({

                            display_text: `✦┇ ${option} ┇✦`,

                            id: `.answer_${option}`

                        })

                    })),

                },

            };

            let msg = generateWAMessageFromContent(m.chat, {

                viewOnceMessage: {

                    message: { interactiveMessage },

                },

            }, { userJid: conn.user.jid, quoted: m });

            conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

            conn.Mori[id] = {

                correctAnswer: player.name,

                options: options,

                timer: setTimeout(() => {

                    if (conn.Mori[id]) {

                        conn.reply(m.chat, `⏳ *انــتــهــى الــوقــت!*\n🎯 *الــإجــابــة الــصــحــيــحــة كــانــت:* ${player.name}`, m);

                        delete conn.Mori[id];

                    }

                }, timeout),

                attempts: 2

            };

        } catch (e) {

            console.error(e);

            conn.reply(m.chat, `❌ *حــدث خــطــأ فــي إرــســال الــرســالــة.*`, m);

        }

    }

};

handler.command = /^(كورة|answer_.+)$/i;

export default handler;