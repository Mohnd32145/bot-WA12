import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

import fetch from 'node-fetch';

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

            const response = await fetch('https://gist.githubusercontent.com/Kyutaka101/4e01c190b7d67225ad7a86d388eeedf6/raw/67f0de059cea4b965a3f3bf211c12fc9c48043e5/gistfile1.txt');

            const flagsData = await response.json();

            if (!flagsData) {

                throw new Error('فشل في الحصول على بيانات الأعلام.');

            }

            const flagItem = flagsData[Math.floor(Math.random() * flagsData.length)];

            const { img, name } = flagItem;

            let options = [name];

            while (options.length < 4) {

                let randomItem = flagsData[Math.floor(Math.random() * flagsData.length)].name;

                if (!options.includes(randomItem)) {

                    options.push(randomItem);

                }

            }

            options.sort(() => Math.random() - 0.5);

            const media = await prepareWAMessageMedia({ image: { url: img } }, { upload: conn.waUploadToServer });

            const interactiveMessage = {

                body: {

                    text: ` 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🏳️❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثـانـيـة┇❯*

*❐↞┇الـجـائـزة💰↞ ${poin} XP┇❯* 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🏳️❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

⚡ *قـم بـاخـتـيـار إسـم الـعـلـم الـصـحـيـح!* ⚡

🏦 *إسـتـخـدم [ .لــفــل ] لـلإطـلاع عـلـى مــســتــواك*

╰━━━━━━━━━━━━━━━━━━━━╯

> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`,

                },

                footer: { text: 'اخــتــر الــإجــابــة الــصــحــيــحــة:' },

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

                correctAnswer: name,

                options: options,

                timer: setTimeout(() => {

                    if (conn.Mori[id]) {

                        conn.reply(m.chat, `⏳ *انــتــهــى الــوقــت!*\n🎯 *الــإجــابــة الــصــحــيــحــة كــانــت:* ${name}`, m);

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

handler.command = /^(عين|answer_.+)$/i;

export default handler;