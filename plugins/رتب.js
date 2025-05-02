let botSignature = `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

let game = global.game_sort || (global.game_sort = {});

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

    

    // خلط الحروف عشوائيًا

    let shuffledCharacter = randomCharacter

        .split('')

        .sort(() => 0.5 - Math.random())

        .join(' ');

    game[m.chat] = {

        answer: randomCharacter,

        timeout: setTimeout(() => {

            if (game[m.chat]) {

                conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『⌛』 انـتـهـى الـوقـت!

『✅』 الإجـابـة الـصـحـيـحـة:

↳ ❝${randomCharacter}❞
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

                delete game[m.chat];

            }

        }, 30000) // 30 ثانية

    };

    await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🧩』 فـعـالـيـة تـرتـيـب الـحـروف

『⏳』 الـوقـت الـمـتـاح: 30 ثـانـيـة

『🏆』 جـائـزة الـفـوز: 500 X
✧═━┅┉《🌺》┅┉━═✧
『📝』 الـحـروف الـمـفـكـكـة:

↳ ❝${shuffledCharacter}❞

『💡』 اكـتـب اسـم الـشـخـصـيـة بـشـكـل صـحـيـح
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

『✨』 اسـم الـشـخـصـيـة:

↳ ❝${chat.answer}❞

『🏅』 جـمـعـت: 500 XP
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m, { mentions: [m.sender] });

        delete game[m.chat];

    }

};

handler.help = ['رتب'];

handler.tags = ['games'];

handler.command = /^رتب$/i;

export default handler;