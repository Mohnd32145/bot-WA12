let botSignature = `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

let game = global.game_decrypt || (global.game_decrypt = {});

const handler = async (m, { conn }) => {

    if (game[m.chat]) {

        return conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
⚠️┇ لـديـك جـولـة نـاشـطـة!

↳ الـرجـاء الـتـخـمـيـن أولاً
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

    }

    const animeCharacters = [

        "ناروتو", "ايتاتشي", "ساسكي", "لوفي", "زورو", 

        "شانكس", "ايرين", "ليفاي", "غوكو", "فيجيتا",

        "تانجيرو", "نيزوكو", "إدوارد", "لايت", "إيتشيغو",

        "ريوك", "كونان", "هيسوكا", "كيلوا", "غون"

    ];

    let randomCharacter = animeCharacters[Math.floor(Math.random() * animeCharacters.length)];

    let correctAnswer = randomCharacter.split('').join(' ');

    game[m.chat] = {

        original: randomCharacter,

        answer: correctAnswer,

        timeout: setTimeout(() => {

            if (game[m.chat]) {

                conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『⌛』 انـتـهـى الـوقـت!

『✅』 الإجـابـة الـصـحـيـحـة:

↳ ❝${correctAnswer}❞
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

                delete game[m.chat];

            }

        }, 30000) // 30 ثانية

    };

    await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🧩』 فـعـالـيـة تـفـكـيـك الـكـلـمـة

『⏳』 الـوقـت الـمـتـاح: 30 ثـانـيـة

『🏆』 جـائـزة الـفـوز: 500 XP
✧═━┅┉《🌺》┅┉━═✧
『📝』 الـكـلـمـة الـمـطلـوب تـفـكـيـكـهـا:

↳ ❝${randomCharacter}❞

『💡』 اكـتـب الـكـلـمـة مـفـكـكـة بـفـضـاء بـيـن كـل حـرف
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

};

handler.before = async (m, { conn }) => {

    if (!game[m.chat]) return;

    

    const chat = game[m.chat];

    const userAnswer = m.text.trim();

    

    if (userAnswer === chat.answer) {

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

    }

};

handler.help = ['تفكيك'];

handler.tags = ['games'];

handler.command = /^فكك$/i;

export default handler;