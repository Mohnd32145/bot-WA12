let botSignature = `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

let game = global.game_type || (global.game_type = {});

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

        "ناروتو", "ايتاتشي", "ساسكي", "ساكورا", "كاكاشي", 

        "مادارا", "اوبتو", "زيتسو", "لوفي", "زورو",

        "شانكس", "سانجي", "ايس", "سابو", "اللحية البيضاء",

        "نامي", "ايرين", "ليفاي", "ميكاسا", "هانجي",

        "راينر", "آني", "بيرتهولت", "زيك", "غوكو",

        "فيجيتا", "جوهان", "ترانكس", "كريلين", "فريزا",

        "سيل", "ماجين بوو", "تانجيرو", "نيزوكو", "اينوسكي",

        "زينيتسو", "موزان", "رينغوكو", "توميؤكا", "شينوبو"

    ];

    let randomWord = animeCharacters[Math.floor(Math.random() * animeCharacters.length)];

    game[m.chat] = {

        answer: randomWord,

        timeout: setTimeout(() => {

            if (game[m.chat]) {

                conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『⌛』 انـتـهـى الـوقـت!

『✅』 الإجـابـة الـصـحـيـحـة:

↳ ❝${randomWord}❞
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

                delete game[m.chat];

            }

        }, 30000) // 30 ثانية

    };

    await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🏃』 فـعـالـيـة أسـرع كـتـابـة

『⏳』 الـوقـت الـمـتـاح: 30 ثـانـيـة

『🏆』 جـائـزة الـفـوز: 500 XP
✧═━┅┉《🌺》┅┉━═✧
『📝』 الـكـلـمـة الـمـطـلـوب كـتـابـتـهـا:

↳ ❝${randomWord}❞

『💡』 اكـتـب الـكـلـمـة بـدون أي تـغـيـيـر
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

『✨』 الـكـلـمـة الـصـحـيـحـة:

↳ ❝${chat.answer}❞

『🏅』 جـمـعـت: 500 XP
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m, { mentions: [m.sender] });

        delete game[m.chat];

    }

};

handler.help = ['كت'];

handler.tags = ['games'];

handler.command = /^كت$/i;

export default handler;