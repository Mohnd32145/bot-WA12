let game = global.quiz_game || (global.quiz_game = {});

let botSignature = `

╰━━━━━━━━━━━━━━━━━━━━╯

`;

let questions = [

    { question: "ما هو أكبر كوكب في المجموعة الشمسية؟", answer: "المشتري" },

    { question: "ما هو العنصر الكيميائي الذي يرمز له بـ O؟", answer: "الأكسجين" },

    { question: "كم عدد قارات العالم؟", answer: "سبعة" },

    { question: "ما هو لون السماء الصافية؟", answer: "أزرق" },

    { question: "ما الحيوان الذي يطلق عليه لقب ملك الغابة؟", answer: "الأسد" },

    { question: "من هو مخترع المصباح الكهربائي؟", answer: "توماس إديسون" },

    { question: "ما هي عاصمة كندا؟", answer: "أوتاوا" },

    { question: "ما هو أكبر محيط في العالم؟", answer: "المحيط الهادئ" },

    { question: "كم عدد العظام في جسم الإنسان البالغ؟", answer: "206" },

    { question: "من هو أول شخص صعد إلى الفضاء؟", answer: "يوري جاجارين" }

];

let handler = async (m, { conn }) => {

    if (game[m.chat]) {

        return m.reply("⚠️ هناك مسابقة جارية بالفعل! حاول الإجابة أولًا.");

    }

    let randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    game[m.chat] = {

        question: randomQuestion.question,

        answer: randomQuestion.answer.toLowerCase(),

        timeout: setTimeout(() => {

            if (game[m.chat]) {

                m.reply(`

✦⋆┈┈⦉🔱⦊┈┈⋆✦

❖ فـاعـلـيـة ⦂ مسابقة المعلومات ⦂↯

╔⏤⏤⏤⏤༻⚡༺⏤⏤⏤⏤╗ 
⌝ انتهت المسابقة! ❌⌞ 
╚⏤⏤⏤⏤༻⚡༺⏤⏤⏤⏤╝

📢 لم يتمكن أحد من الإجابة في الوقت المحدد.

💡 الإجابة الصحيحة كانت: ${randomQuestion.answer}

🎁 حظًا أوفر في الجولة القادمة!

` + botSignature);

                delete game[m.chat];

            }

        }, 30000) // 30 ثانية

    };

    m.reply(`

✦⋆┈┈⦉🔱⦊┈┈⋆✦

❖ فـاعـلـيـة ⦂ مسابقة المعلومات ⦂↯

╔⏤⏤⏤⏤༻⚡༺⏤⏤⏤⏤╗ 
⌝ استعدوا للتحدي والحماس! 🎉⌞ 
╚⏤⏤⏤⏤༻⚡༺⏤⏤⏤⏤╝

✦✧━━━◆◇◆━━━✧✦

✾ ⸂🕰️⸃┆ الوقت ⦂ 『 30 ثانية 』

✾ ⸂🎤⸃┆ مقدم الفعالية ⦂ 『 مايكي 』

✾ ⸂🛠️⸃┆ مطور البوت ⦂ 『 إيزانا 』

✾ ⸂🏆⸃┆ الجائزة ⦂ 『 500 نقطة 』

✦✧━━━◆◇◆━━━✧✦

📢 شرح الفعالية:

🔥 السؤال المطروح: قم بالإجابة على السؤال المطروح قبل انتهاء الوقت!

⚡ أول شخص يجيب إجابة صحيحة يحصل على نقاط!

🏆 الفائز هو من يجمع أكبر عدد من النقاط في نهاية الفعالية!

🎁 جاهزون للفوز؟ لا تفوتوا الفرصة!

❓ السؤال: ${randomQuestion.question}

✦⋆┈┈⦉🔱⦊┈┈⋆✦

` + botSignature);

};

// فحص الإجابة

handler.before = async function (m, { conn }) {

    let chat = game[m.chat];

    if (chat && chat.answer) {

        let userAnswer = (m.text || "").trim().toLowerCase();

        if (!userAnswer) return;

        if (userAnswer === chat.answer) {

            let winner = m.sender;

            let mentionText = `

✦⋆┈┈⦉🔱⦊┈┈⋆✦

❖ فـاعـلـيـة ⦂ مسابقة المعلومات ⦂↯

╔⏤⏤⏤⏤༻⚡༺⏤⏤⏤⏤╗ 
⌝ انتهت المسابقة! 🎉⌞ 
╚⏤⏤⏤⏤༻⚡༺⏤⏤⏤⏤╝

✦✧━━━◆◇◆━━━✧✦

🏆 الرابح: @${winner.split('@')[0]} ✅

🎁 حصل على 500 XP!

💡 الإجابة الصحيحة كانت: ${chat.answer}

🔥 أحسنت! استمر في التحديات القادمة!

` + botSignature;

            conn.reply(m.chat, mentionText, m, { mentions: [winner] });

            clearTimeout(chat.timeout);

            delete game[m.chat];

        }

    }

};

// تحديد الأوامر

handler.help = ['مسابقة'];

handler.tags = ['game'];

handler.command = ['مسابقة'];

export default handler;