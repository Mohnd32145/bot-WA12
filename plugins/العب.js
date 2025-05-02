// تخزين التحديات النشطة
let activeGames = {}; 
// حفظ عدد مرات الفوز لكل لاعب
let scores = {}; 

let handler = async (m, { conn, text, command }) => {
    if (command === "العب") {
        let [mentioned] = m.mentionedJid || []; // أخذ الشخص المميز

        if (!mentioned) return m.reply("⚠ يرجى منشن الشخص الذي تريد تحديه!"); // التأكد من وجود شخص مميز

        let opponent = mentioned;

        // التحقق إذا كان هناك تحدي قيد اللعب
        if (activeGames[m.chat]) {
            return m.reply("⚠ هناك لعبة قيد التحدي بالفعل!");
        }

        // تخزين التحدي في activeGames مع اللاعبين واختياراتهم
        activeGames[m.chat] = { player1: m.sender, player2: opponent, choices: {} };

        // إعلام اللاعبين ببدء التحدي
        conn.sendMessage(m.chat, { text: `🎮 *تحدي جديد!* 🎮\n\n👤 *${m.sender.split('@')[0]}* تحدى *${opponent.split('@')[0]}*!\n📩 تم إرسال التعليمات في الخاص.` });

        // إرسال التعليمات الخاصة بكل لاعب
        let message = `👊 *حجرة ✋ ورقة ✌ مقص!*\n\n🤖 *أرسل اختيارك هنا في الخاص:*\n- "حجرة" 🪨\n- "ورقة" 📄\n- "مقص" ✂\n\n⏳ لديك *90 ثانية* لاختيارك!`;

        conn.sendMessage(m.sender, { text: message });
        conn.sendMessage(opponent, { text: message });

        // التحقق بعد 90 ثانية إذا لم يتم اختيار أحد اللاعبين
        setTimeout(() => {
            if (activeGames[m.chat] && Object.keys(activeGames[m.chat].choices).length < 2) {
                conn.sendMessage(m.chat, { text: "⏳ انتهى الوقت! لم يقم أحد اللاعبين باختيار." });
                delete activeGames[m.chat];
            }
        }, 90000); // 90 ثانية

    } else if (["حجرة", "ورقة", "مقص"].includes(command)) {
        // البحث عن التحدي باستخدام اللاعب بدلاً من المجموعات فقط
        let game = Object.values(activeGames).find(g => [g.player1, g.player2].includes(m.sender));

        if (!game) {
            return m.reply("⚠ لا يوجد تحدي نشط حاليًا! تأكد من أنك بدأت تحديًا باستخدام الأمر `العب`.");
        }

        if (![game.player1, game.player2].includes(m.sender)) {
            return m.reply("⚠ أنت لست ضمن هذا التحدي!");
        }

        if (game.choices[m.sender]) {
            return m.reply("⚠ لقد اخترت بالفعل!");
        }

        game.choices[m.sender] = command;

        if (Object.keys(game.choices).length === 2) {
            let { player1, player2, choices } = game;
            let choice1 = choices[player1];
            let choice2 = choices[player2];
            let winner;

            if (choice1 === choice2) {
                winner = "🤝 تعادل!";
            } else if ((choice1 === "حجرة" && choice2 === "مقص") ||
                       (choice1 === "ورقة" && choice2 === "حجرة") ||
                       (choice1 === "مقص" && choice2 === "ورقة")) {
                winner = `🏆 *${player1.split('@')[0]} فاز!*`;
                scores[player1] = (scores[player1] || 0) + 1;
            } else {
                winner = `🏆 *${player2.split('@')[0]} فاز!*`;
                scores[player2] = (scores[player2] || 0) + 1;
            }

            let resultMessage = `🎮 *نتيجة التحدي!*\n\n👤 *${player1.split('@')[0]}* اختار: *${choice1}*\n👤 *${player2.split('@')[0]}* اختار: *${choice2}*\n\n${winner}\n\n🏅 *النتائج:*\n- ${player1.split('@')[0]}: ${scores[player1] || 0} فوز\n- ${player2.split('@')[0]}: ${scores[player2] || 0} فوز\n\n⚡ *يمكنك بدء تحدي جديد الآن!* ⚡`;

            conn.sendMessage(m.chat, { text: resultMessage });

            delete activeGames[m.chat];
        } else {
            m.reply("✅ تم تسجيل اختيارك! انتظر اللاعب الآخر.");
        }
    }
};

handler.help = ['العب @المستخدم', 'حجرة', 'ورقة', 'مقص'];
handler.tags = ['game'];
handler.command = ['العب', 'حجرة', 'ورقة', 'مقص'];

export default handler;

