import fs from 'fs';

import path from 'path';

import { readFile } from 'fs/promises';

const imagesPath = '/home/container/views/img/عيون/';

const characters = {

    1: "توبي", 2: "مادارا", 3: "ساسكي", 4: "نيزيكو", 5: "بوروتو",

    6: "كونان", 7: "استا", 8: "تنغن", 9: "كوروما", 10: "ماكي",

    11: "اكازا", 12: "موزان", 13: "شانكس", 14: "سينكو", 15: "ناروتو",

    16: "ايساغي", 17: "نوبارا", 18: "كانيكي", 19: "كاكاشي", 20: "سوكونا",

    21: "ايرين", 22: "ايتاشي", 23: "غوجو", 24: "سارادا", 25: "اوبيتو"

};

const botSignature = `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦ `;

const handler = async (m, { conn }) => {

    if (global.game && global.game[m.chat]) {

        return conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
⚠️┇ لـديـك جـولـة نـاشـطـة!

↳ الـرجـاء الـتـخـمـيـن أولاً
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

    }

    const randomId = Math.floor(Math.random() * Object.keys(characters).length) + 1;

    const correctAnswer = characters[randomId];

    const correctAnswerCopy = correctAnswer; // حفظ الإجابة الصحيحة لاستخدامها في المؤقت

    const imagePath = path.join(imagesPath, `${randomId}.jpg`);

    try {

        await fs.promises.access(imagePath, fs.constants.F_OK);

    } catch (error) {

        console.error('❌ الصورة غير موجودة:', imagePath);

        return conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
❌┇ فـشـل فـي تـحـمـيـل الـصـورة!

↳ يـرجـى الـمـحـاولة لـاحـقـا
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

    }

    const options = [correctAnswer];

    while (options.length < 4) {

        const randomChar = characters[Math.floor(Math.random() * Object.keys(characters).length) + 1];

        if (!options.includes(randomChar)) options.push(randomChar);

    }

    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    const imageBuffer = await readFile(imagePath);

    let optionsText = shuffledOptions.map((opt, index) => `▸ ${index + 1}. ❝${opt}❞`).join('\n');

    await conn.sendMessage(m.chat, {

        image: imageBuffer,

        caption: 

`✧═━┅┉《✠》┅┉━═✧
『👁️』 مـن هـو صـاحـب هـذه الـعـيـن؟

『⏳』 الـوقـت الـمـتـاح: 60 ثـانـيـة

『🏆』 جـائـزة الـفـوز: 500 XP

✧═━┅┉《🌺》┅┉━═✧
『📜』 اخـتـر الإجـابـة الـصـحـيـحـة:

${optionsText}
✧═━┅┉《✠》┅┉━═✧

${botSignature}`

    });

    global.game = {

        ...(global.game || {}),

        [m.chat]: {

            correctAnswer,

            options: shuffledOptions,

            timeout: setTimeout(() => {

                if (global.game[m.chat]) {

                    conn.sendMessage(m.chat, { 

                        text: 

`✧═━┅┉《✠》┅┉━═✧
『⌛』 انـتـهـى الـوقـت!

『✅』 الإجـابـة الـصـحـيـحـة:

↳ ❝${correctAnswerCopy}❞
✧═━┅┉《✠》┅┉━═✧

${botSignature}`

                    });

                    delete global.game[m.chat];

                }

            }, 60000)

        }

    };

};

handler.before = async (m, { conn }) => {

    if (!m.text || !global.game?.[m.chat]) return;

    const gameData = global.game[m.chat];

    const userAnswer = m.text.trim();

    if (/^[1-4]$/.test(userAnswer)) {

        const selectedIndex = parseInt(userAnswer) - 1;

        const selectedAnswer = gameData.options[selectedIndex];

        if (selectedAnswer === gameData.correctAnswer) {

            clearTimeout(gameData.timeout);

            await conn.sendMessage(m.chat, { 

                text: 

`✧═━┅┉《✠》┅┉━═✧
『🎉』 مـبـࢪوك لـقـد فـزت!

『✨』 صـاحـب الـعـيـن هـو:
↳ ❝${gameData.correctAnswer}❞

『🏅』 جـمـعـت: 500 XP
✧═━┅┉《✠》┅┉━═✧

${botSignature}`

            });

            delete global.game[m.chat];

        } else {

            await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『❌』 إجـابـة خـاطـئـة!

↳ حـاول مـجـدداً
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

        }

    }

};

handler.help = ['عين'];

handler.tags = ['games'];
 
handler.command = /^(عين1)$/i;

export default handler;