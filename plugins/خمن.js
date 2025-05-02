let botSignature = `> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

let game = global.guessCharacterGame || (global.guessCharacterGame = {});

const handler = async (m, { conn }) => {

    if (game[m.chat]) {

        return conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
⚠️┇ لـديـك جـولـة نـاشـطـة!

↳ الـرجـاء الـتـخـمـيـن أولاً
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

    }

    const characters = [

        // شخصيات ون بيس

        { description: "قرصان شاب يرتدي قبعة قشية ويحلم بأن يصبح ملك القراصنة.", name: "لوفي", options: ["لوفي", "كيد", "لاو", "روجر"] },

        { description: "سياف قوي يستخدم ثلاثة سيوف ويطمح لأن يكون أقوى مبارز في العالم.", name: "زورو", options: ["زورو", "ميهوك", "كوجي", "تاشيغي"] },

        { description: "طاهي متحمس يحلم بإيجار البحر الزفير ويستخدم أرجل قوية في القتال.", name: "سانجي", options: ["سانجي", "زيف", "كريمة", "بيدل"] },

        

        // شخصيات ناروتو

        { description: "نينجا من قرية كونوها، يسعى ليصبح الهوكاجي ويحمل وحش الكيوبي داخله.", name: "ناروتو", options: ["ناروتو", "ميناتو", "كاشين", "هيروزن"] },

        { description: "نينجا أنيق يستخدم الشارينغان ويسعى للانتقام من أخيه.", name: "ساسكي", options: ["ساسكي", "ايتاتشي", "مادارا", "أوبيتو"] },

        { description: "نينجا يغطي عينيه ويقرأ روايات جيرايا.", name: "كاكاشي", options: ["كاكاشي", "جيرايا", "اوروتشيمارو", "توبي"] },

        

        // شخصيات أتاك أون تيتان

        { description: "محارب قصير القامة من فيلق الاستطلاع، يعتبر من أقوى الجنود.", name: "ليفاي", options: ["ليفاي", "إيرين", "ارمين", "جان"] },

        { description: "فتاة من عائلة أكيرمان، تحمي دائمًا الشخص الذي تحبه.", name: "ميكاسا", options: ["ميكاسا", "هيستوريا", "بيك", "ييمير"] },

        

        // شخصيات جوجوتسو كايسن

        { description: "ساحر قوي ذو شعر أبيض يغطي عينيه، يعتبر الأقوى في عصره.", name: "غوجو", options: ["غوجو", "جيتو", "يوجي", "ميكي"] },

        { description: "طالب يمتلك لعنة سوكونا بداخله.", name: "ايتادوري", options: ["ايتادوري", "ماهيتو", "نانامي", "تودو"] },

        

        // شخصيات هانتر x هانتر

        { description: "صياد متهور يبحث عن والده، يمتلك قدرة النين.", name: "غون", options: ["غون", "كايتو", "جين", "بيسك"] },

        { description: "فتى قاتل من عائلة زولديك، يمتلك مخالب حادة.", name: "كيلوا", options: ["كيلوا", "ايلومي", "كوروتا", "سيلفا"] }

    ];

    let randomCharacter = characters[Math.floor(Math.random() * characters.length)];

    

    // إضافة الإجابة الصحيحة إن لم تكن موجودة

    if (!randomCharacter.options.includes(randomCharacter.name)) {

        randomCharacter.options[0] = randomCharacter.name;

    }

    

    // ترتيب الخيارات عشوائياً

    let shuffledOptions = [...randomCharacter.options].sort(() => Math.random() - 0.5);

    

    let optionsText = shuffledOptions.map((opt, index) => `▸ ${index + 1}. ❝${opt}❞`).join('\n');

    game[m.chat] = {

        description: randomCharacter.description,

        name: randomCharacter.name,

        options: shuffledOptions,

        timeout: setTimeout(() => {

            if (game[m.chat]) {

                conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『⌛』 انـتـهـى الـوقـت!

『✅』 الإجـابـة الـصـحـيـحـة:

↳ ❝${randomCharacter.name}❞
✧═━┅┉《✠》┅┉━═✧

${botSignature}`, m);

                delete game[m.chat];

            }

        }, 60000)

    };

    await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🧩』 مـن هـي الـشـخـصـيـة الـتـي تـتـوافـق مـع هـذا الـوصـف؟

『⏳』 الـوقـت الـمـتـاح: 60 ثـانـيـة

『🏆』 جـائـزة الـفـوز: 500 XP
✧═━┅┉《🌺》┅┉━═✧
『📝』 الـوصـف:

↳ ❝${randomCharacter.description}❞

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

        

        if (selectedAnswer === chat.name) {

            clearTimeout(chat.timeout);

            await conn.reply(m.chat, 

`✧═━┅┉《✠》┅┉━═✧
『🎉』 مـبـࢪوك لـقـد فـزت!

『✨』 الـشـخـصـيـة هـي:

↳ ❝${chat.name}❞

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

handler.help = ['خمن'];

handler.tags = ['games'];

handler.command = /^خمن1$/i;

export default handler;