import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];
    let mentionedUser = m.mentionedJid[0];
    let xpAmount = args[1] ? parseInt(args[1]) : 0;

    if (!mentionedUser) 
        throw '> *\`『 منشن للي عايز تعملو تحويل 🧚🏻‍♂️ 』\`*\n\n- *مثال↜.تحويل @user 5000*';
    
    if (!args[1] || isNaN(xpAmount) || xpAmount < 1) 
        throw '> *\`『 اكتب الكميه الي عايز تحولها 🧚🏻‍♂️ 』\`*\n\n- *مثال↜.تحويل @user 5000*';

    if (user.exp < xpAmount) 
        throw '> *\`『 الكميه كبيره معكش يكمل 🧚🏻‍♂️ 』\`*';

    await conn.sendMessage(m.chat, { react: { text: "🤝", key: m.key, } });

    let recipient = global.db.data.users[mentionedUser];
    recipient.exp += xpAmount;
    user.exp -= xpAmount;

    let message = `*⌜🏦⌝*
> *\`『 تم التحويل 🧚🏻‍♂️ 』\`*

- *🏮 تم تحويل↜${xpAmount} اكسبي*

- *🤴🏻 المستلم↜* @${mentionedUser.split('@')[0]}

- *💳 رصيد الاكسبي الحالي↜${user.exp}*`.trim();

    try {
        const imgUrl = 'https://l.arzfun.com/9tWRE';
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m, false, {
            mentions: [mentionedUser] // تضمين المنشن الصحيح هنا
        });
    } catch (e) {
        await conn.reply(m.chat, message, m, {
            mentions: [mentionedUser] // تضمين المنشن في حالة النص فقط
        });
    }
}

handler.help = ['تحويل_اكسبي'];
handler.tags = ['الاقتصاد'];
handler.command = ['تحويل'];

handler.group = true;

export default handler;

// مثال على الاستخدام
// الأمر: .تحويل_اكس_بي @المستخدم 100
// النص: قم بتحويل 100 XP إلى المستخدم المذكور.
