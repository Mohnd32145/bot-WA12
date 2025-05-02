import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

import fs from 'fs';

const timeout = 60000;

const poin = 2000;

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

            let tekateki = JSON.parse(fs.readFileSync('./src/game/عواصم.json'));

            let json = tekateki[Math.floor(Math.random() * tekateki.length)];

            let correctAnswer = json.response;

            let options = [correctAnswer];

            while (options.length < 4) {

                let randomChoice = tekateki[Math.floor(Math.random() * tekateki.length)].response;

                if (!options.includes(randomChoice)) options.push(randomChoice);

            }

            options = options.sort(() => Math.random() - 0.5);

            const interactiveMessage = {

                body: {

                    text: ` 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🏛️❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثـانـيـة┇❯*

*❐↞┇الـجـائـزة💰↞ ${poin} XP┇❯* 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🏛️❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

❀ *السؤال:* ${json.question}

⚡ *قـم بـاخـتـيـار زر الإجـابـة!* ⚡

🏦 *إسـتـخـدم [ .لــفــل ] لـلإطـلاع عـلـى مــســتــواك*

╰━━━━━━━━━━━━━━━━━━━━╯

> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`,

                },

                footer: { text: 'اخــتــر الــعــاصــمــة الــصــحــيــحــة:' },

                header: {

                    title: 'مــرحــبــا',

                    subtitle: 'اخــتــر أحــد الــخــيــارات أدنــاه:',

                    hasMediaAttachment: false

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

                correctAnswer: correctAnswer,

                options: options,

                timer: setTimeout(() => {

                    if (conn.Mori[id]) {

                        conn.reply(m.chat, `⏳ *انــتــهــى الــوقــت!*\n🎯 *الــإجــابــة الــصــحــيــحــة كــانــت:* ${correctAnswer}`, m);

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

handler.command = /^(عاصمة|answer_.+)$/i;

export default handler;