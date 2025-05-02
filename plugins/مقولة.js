let botSignature = `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

let game = global.quoteGame || (global.quoteGame = {});

const handler = async (m, { conn }) => {

    if (game[m.chat]) {

        return conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
⚠️┇ لـديـك جـولـة نـاشـطـة!

↳ الـرجـاء الـتـخـمـيـن أولاً
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

    }

    const quotes = [

        { 

            quote: "أنا سوف أصبح ملك القراصنة!", 

            character: "لوفي",

            options: ["لوفي", "زورو", "شانكس", "أيس"]

        },

        { 

            quote: "أولئك الذين يكسرون القواعد هم حثالة، لكن الذين يتخلون عن أصدقائهم هم أسوأ من الحثالة!", 

            character: "ايتاتشي",

            options: ["ايتاتشي", "ساسكي", "مادارا", "أوبيتو"]

        },

        { 

            quote: "لا تقلل من شأني! سأكون الهوكاجي يومًا ما!", 

            character: "ناروتو",

            options: ["ناروتو", "هيناتا", "جيرايا", "كاكاشي"]

        },

        { 

            quote: "قوة الملك لا تكمن في قوته الجسدية، بل في قدرته على حماية من يحب.", 

            character: "شانكس",

            options: ["شانكس", "بغgy", "وايت بيرد", "كايدو"]

        },

        { 

            quote: "لا فائدة من العيش في عالم بدون ضوء!", 

            character: "لايت",

            options: ["لايت", "إل", "ميسا", "ناير"]

        }

    ];

    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    

    // ترتيب الخيارات عشوائياً

    let shuffledOptions = [...randomQuote.options].sort(() => Math.random() - 0.5);

    

    let optionsText = shuffledOptions.map((opt, index) => `▸ ${index + 1}. ❝${opt}❞`).join('\n');

    game[m.chat] = {

        quote: randomQuote.quote,

        character: randomQuote.character.toLowerCase(),

        options: shuffledOptions,

        timeout: setTimeout(() => {

            if (game[m.chat]) {

                conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『⌛』 انـتـهـى الـوقـت!

『✅』 الإجـابـة الـصـحـيـحـة:

↳ ❝${randomQuote.character}❞
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

                delete game[m.chat];

            }

        }, 30000) // 30 ثانية

    };

    await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🧩』 مـن قـال هـذه الـمـقـولـة؟

『⏳』 الـوقـت الـمـتـاح: 30 ثـانـيـة

『🏆』 جـائـزة الـفـوز: 500 XP
✧═━┅┉《🌺》┅┉━═✧
『📝』 الـمـقـولـة:

↳ ❝${randomQuote.quote}❞

『📜』 اخـتـر الإجـابـة الـصـحـيـحـة:

${optionsText}
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

};

handler.before = async (m, { conn }) => {

    if (!game[m.chat]) return;

    

    const chat = game[m.chat];

    

    // التحقق من رقم الإجابة

    const selectedOption = parseInt(m.text.trim());

    if (selectedOption >= 1 && selectedOption <= 4) {

        const selectedAnswer = chat.options[selectedOption - 1];

        

        if (selectedAnswer.toLowerCase() === chat.character) {

            clearTimeout(chat.timeout);

            await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🎉』 مـبـࢪوك لـقـد فـزت!

『✨』 صـاحـب الـمـقـولـة:

↳ ❝${chat.character}❞

『🏅』 جـمـعـت: 500 XP
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m, { mentions: [m.sender] });

            delete game[m.chat];

        } else {

            await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『❌』 إجـابـة خـاطـئـة!

↳ حـاول مـجـددا
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

        }

    }

};

handler.help = ['مقولة'];

handler.tags = ['games'];

handler.command = /^1مقولة$/i;

export default handler;