import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

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

            const characters = [

                // شخصيات ون بيس

                { description: "قرصان شاب يرتدي قبعة قشية ويحلم بأن يصبح ملك القراصنة.", name: "لوفي", options: ["لوفي", "كيد", "لاو", "روجر"] },

                { description: "سياف قوي يستخدم ثلاثة سيوف ويطمح لأن يكون أقوى مبارز في العالم.", name: "زورو", options: ["زورو", "ميهوك", "كوجي", "تاشيغي"] },

                { description: "طاهي متحمس يحلم بإيجار البحر الزفير ويستخدم أرجل قوية في القتال.", name: "سانجي", options: ["سانجي", "زيف", "كريمة", "بيدل"] },

                

                // شخصيات ناروتو

                { description: "نينجا من قرية كونوها، يسعى ليصبح الهوكاجي ويحمل وحش الكيوبي داخله.", name: "ناروتو", options: ["ناروتو", "ميناتو", "كاشين", "هيروزن"] },

                { description: "نينجا أنيق يستخدم الشارينغان ويسعى للانتقام من أخيه.", name: "ساسكي", options: ["ساسكي", "ايتاتشي", "مادارا", "أوبيتو"] },

                

                // شخصيات أتاك أون تيتان

                { description: "محارب قصير القامة من فيلق الاستطلاع، يعتبر من أقوى الجنود.", name: "ليفاي", options: ["ليفاي", "إيرين", "ارمين", "جان"] },

            ];

            let randomCharacter = characters[Math.floor(Math.random() * characters.length)];

            let options = [...randomCharacter.options].sort(() => Math.random() - 0.5);

            const interactiveMessage = {

                body: {

                    text: ` 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🎲❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثـانـيـة┇❯*

*❐↞┇الـجـائـزة💰↞ ${poin} XP┇❯* 

*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🎲❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

❀ *الـوصـف:* ${randomCharacter.description}

⚡ *قـم بـاخـتـيـار زر الإجـابـة!* ⚡

🏦 *إسـتـخـدم [ .لــفــل ] لـلإطـلاع عـلـى مــســتــواك*

╰━━━━━━━━━━━━━━━━━━━━╯

> ✦┇𝐘𝐎𝐑𝐔𝐈𝐂𝐇𝐈 |♕| 𝐁𝐎𝐓┇✦`,

                },

                footer: { text: 'اخــتــر الــإجــابــة الــصــحــيــحــة:' },

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

                correctAnswer: randomCharacter.name,

                options: options,

                timer: setTimeout(() => {

                    if (conn.Mori[id]) {

                        conn.reply(m.chat, `⏳ *انــتــهــى الــوقــت!*\n🎯 *الــإجــابــة الــصــحــيــحــة كــانــت:* ${randomCharacter.name}`, m);

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

handler.command = /^(خمن|answer_.+)$/i;

export default handler;