let handler = async (m, { conn, isPrems }) => {

    let hasil = Math.floor(Math.random() * 5000);

    let time = global.db.data.users[m.sender].lastwork + 600000;

    if (new Date() - global.db.data.users[m.sender].lastwork < 600000) {

        throw `༺━─╃⌬ 🤖 ⌬╄─━༻\n\n*أنت متعب! يجب أن تستريح على الأقل ${msToTime(time - new Date())} للعودة إلى العمل!*\n\n╰━━━━━━━━━━━━━━━━╯\n> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`;

    }

    await delay(3 * 3000);

    m.reply(`༺━─╃⌬ 🤖 ⌬╄─━༻\n\n${pickRandom(global.work)} *${hasil} خبرة*\n\n╰━━━━━━━━━━━━━━━━╯\n> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦`);

    global.db.data.users[m.sender].lastwork = new Date() * 1;

};

handler.help = ['work'];

handler.tags = ['xp'];

handler.command = ['عمل', 'العمل'];

handler.fail = null;

handler.exp = 0;

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function msToTime(duration) {

    var seconds = Math.floor((duration / 1000) % 60),

        minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + " دقائق " + seconds + " ثواني ";

}

function pickRandom(list) {

    return list[Math.floor(list.length * Math.random())];

}

global.work = [

    "💻 مطور مواقع ويب",

    "🎮 مطور ألعاب",

    "🌚 أحد مطوري شادو بوت",

    "👨‍💻 مساعد تنسيق في شادو بوت",

    "👮‍♂️ مساعد مشرف على مجموعات يوسف السلطان",

    "⛏️ عملت في منجم",

    "🎤 منظم حفلات من أجل الحصول على",

    "🩺 مساعد طبيب",

    "👨‍🍳 تعمل كطباخ",

    "🏗️ تعمل كمهندس",

    "🩺 تعمل كطبيب",

    "🏦 تعمل في بنك",

    "🎭 جاء شخص ما وأقام مسرحية وأنت عملت كأحد طاقمها",

    "📦 قمت بشراء وبيع العناصر وكسبت",

    "🍕 تعمل في بيتزا هوت وتكسب",

    "✍️ أنت تعمل ككاتب وتكسب",

    "🛍️ تذهب من خلال حقيبتك وتقرر بيع بعض العناصر غير المفيدة التي لا تحتاج إليها. تبين أن كل هذا الهراء كان يستحق",

    "🤝 تساعد محتاج وتحصل",

    "🎮 أنت تطور الألعاب من أجل لقمة العيش وتفوز",

    "🌶️ لقد ربحت مسابقة أكل الفلفل الحار. الجائزة",

    "🏢 تعمل طوال اليوم في شركة وتربح",

    "⚔️ تنضم لفريق شادو والحزا *ES* وتحصل على",

    "🎨 لقد صممت شعار تيم شادو والجزار *ES* وحصلت على",

    "👑 لقد قمت بالإشراف على مجموعة *ES* عندما لم يكن موجودًا وفزت بـ",

    "🖨️ لقد عملت بأفضل ما لديك في شركة طباعة كانت توظف وحصلت على",

    "⚡ أحد أفراد تيم شادو والجزار *ES*",

    "📱 لقد زاد الطلب على ألعاب الأجهزة المحمولة، لذا يمكنك إنشاء لعبة جديدة مليئة بالمعاملات الصغيرة. مع لعبتك الجديدة تكسب",

    "🎙️ أنت تعمل كممثل صوتي لـ سبونج بوب وتمكنت من الفوز بـ",

    "🌾 كنت تزرع وفزت بـ",

    "🏰 تبني قلعة رملية وتربح",

    "💰 لقد عملت وربحت",

    "🎭 تعمل كصانع لوجوهات لتيم شادو والجزار وتحصل على",

    "📝 تعمل كمدوّن وتحصل على",

    "🎬 تعمل على بريمير لتعديل الفيديوهات وتحصل على"

];