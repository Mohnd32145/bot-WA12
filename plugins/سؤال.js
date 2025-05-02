let botSignature = `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

let game = global.animeQuiz || (global.animeQuiz = {});

const handler = async (m, { conn }) => {

    if (game[m.chat]) {

        return conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
⚠️┇ لـديـك جـولـة نـاشـطـة!

↳ الـرجـاء الـتـخـمـيـن أولا
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

    }

    const questions = [

        { 

            question: "من هو النينجا الذي يحمل شعار النار على رأسه؟", 

            answer: "ناروتو",

            options: ["ناروتو", "ساسكي", "كاكاشي", "هيناتا"]

        },

        { 

            question: "من هو سياف قبعة القش؟", 

            answer: "زورو",

            options: ["زورو", "سانجي", "لوفي", "فرانكي"]

        },

        { 

            question: "من هو الكابتن الشهير ذو القبعة القشية؟", 

            answer: "لوفي",

            options: ["لوفي", "أيس", "شanks", "بغgy"]

        },

        { 

            question: "من هو أقوى سايان في دراغون بول؟", 

            answer: "غوكو",

            options: ["غوكو", "فيجيتا", "غوهان", "برولي"]

        },

        { 

            question: "من هو صائد الجوائز ذو الشعر الأبيض في هنتر × هنتر؟", 

            answer: "كيلوا",

            options: ["كيلوا", "غون", "هيسوكا", "كريتوبير"]

        }

    ];

    let randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    

    // ترتيب الخيارات عشوائياً

    let shuffledOptions = [...randomQuestion.options].sort(() => Math.random() - 0.5);

    

    let optionsText = shuffledOptions.map((opt, index) => `▸ ${index + 1}. ❝${opt}❞`).join('\n');

    game[m.chat] = {

        question: randomQuestion.question,

        answer: randomQuestion.answer.toLowerCase(),

        options: shuffledOptions,

        timeout: setTimeout(() => {

            if (game[m.chat]) {

                conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『⌛』 انـتـهـى الـوقـت!

『✅』 الإجـابـة الـصـحـيـحـة:

↳ ❝${randomQuestion.answer}❞
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

                delete game[m.chat];

            }

        }, 30000) // 30 ثانية

    };

    await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🧩』 سـؤال فـي الـأنـيـمـي:

『⏳』 الـوقـت الـمـتـاح: 30 ثـانـيـة

『🏆』 جـائـزة الـفـوز: 500 XP
✧═━┅┉《🌺》┅┉━═✧
『📝』 الـسـؤال:

↳ ❝${randomQuestion.question}❞

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

        

        if (selectedAnswer.toLowerCase() === chat.answer) {

            clearTimeout(chat.timeout);

            await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🎉』 مـبـࢪوك لـقـد فـزت!

『✨』 الـجـواب الـصـحـيـح:

↳ ❝${chat.answer}❞

『🏅』 جـمـعـت: 500 XP
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m, { mentions: [m.sender] });

            delete game[m.chat];

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

handler.help = ['سؤال'];

handler.tags = ['games'];

handler.command = /^سؤال1$/i;

export default handler;