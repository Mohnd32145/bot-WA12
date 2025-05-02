let handler = async (m, { conn, participants }) => {

    let member = participants[Math.floor(Math.random() * participants.length)]; // اختيار شخص عشوائي

    let who = member?.id || m.sender; // التأكد من أن هناك شخصًا محددًا

    m.reply(`*🏳️‍🌈 أكبر شاذ هو @${who.split('@')[0]} 🏳️‍🌈*`, null, { mentions: [who] });

}

handler.help = ['شاذ'];

handler.tags = ['fun'];

handler.command = /^(جاي)$/i;

export default handler;