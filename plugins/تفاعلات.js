let handler = m => m;

handler.all = async function (m) {

    if (m.fromMe || !m.text) return;

    // قائمة الأسماء المطلوبة

    const targetNames = [

        'لا', 'بوت', 'تيربو',

        'يوريتشي', 'مم', 'ه', 'رول'

    ];

    // أول 20 إيموجي فقط

    const top20Emojis = [

        '❤️', '✨', '⚡', '👑', '🍥',

        '🗡️', '👁️', '💻', '🤖', '🦾',

        '🔥', '💯', '🌟', '🎯', '🫶',

        '🤍', '💘', '💝', '💖', '💗'

    ];

    // التحقق من وجود أي اسم من الأسماء المطلوبة

    const nameFound = targetNames.some(name => new RegExp(name, 'i').test(m.text));

    

    if (nameFound) {

        const randomEmoji = top20Emojis[Math.floor(Math.random() * top20Emojis.length)];

        await this.sendMessage(m.chat, {

            react: {

                text: randomEmoji,

                key: m.key

            }

        });

    }

};

export default handler;