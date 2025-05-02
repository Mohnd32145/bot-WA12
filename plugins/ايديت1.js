const dir = [

    'https://telegra.ph/file/d6269a1f7f2bf94a406df.mp4',

    'https://telegra.ph/file/8034305ce5330ebc11a99.mp4',

    'https://telegra.ph/file/5c70fbac268fb54ff847e.mp4',

    'https://telegra.ph/file/f2a6bec5b7635364d6768.mp4',

    'https://telegra.ph/file/d7f5799da8e64b9aff5aa.mp4',

    'https://telegra.ph/file/261100ff5fe590b08e35d.mp4',

    'https://telegra.ph/file/6214d68e0da156ef8e54a.mp4',

    'https://telegra.ph/file/960bece94cac521c5fd68.mp4',

    'https://telegra.ph/file/759c10b0e0a1605ae9716.mp4',

    'https://telegra.ph/file/1d4d8d50e19929f4870f6.mp4',

    'https://telegra.ph/file/07941ba2e117fea621e5d.mp4',

    'https://telegra.ph/file/5fb988f765cd747cde120.mp4',

    'https://telegra.ph/file/5ddb8eec9a8d4883dde9c.mp4',

    'https://telegra.ph/file/bc4cafca3f25376e7cb2e.mp4',

    'https://telegra.ph/file/2243a5e4d437536f7dc8b.mp4',

    'https://telegra.ph/file/65ffa16e5eaee2715e713.mp4',

    'https://telegra.ph/file/d1ae62ec93fdfbfb44f11.mp4',

    'https://telegra.ph/file/539d50387958f5d58e76c.mp4',

    'https://telegra.ph/file/aa6c00ce3e0e07d6775dd.mp4',

    'https://telegra.ph/file/6a8818cad48e79495390a.mp4'

];

let handler = async (m, { conn }) => {

    try {

        let randomVideo = dir[Math.floor(Math.random() * dir.length)];

        await conn.sendFile(m.chat, randomVideo, 'video.mp4', '', m);

        m.react('🎞');

    } catch (e) {

        console.error(e);

        await m.reply('❌ حدث خطأ أثناء إرسال الفيديو.');

    }

};

handler.help = ['ايديت-مختلط', 'اديت'];

handler.tags = ['game'];

handler.command = ['ايديت-مختلط', 'اديت'];

export default handler;