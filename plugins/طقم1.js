import fetch from 'node-fetch';

let handler = async (message, { conn }) => {

    let response = await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json');

    let data = await response.json();

    // اختيار صورة عشوائية

    let randomCouple = data[Math.floor(Math.random() * data.length)];

    // تحميل وإرسال الصورة الأولى (للشاب)

    let maleImage = await (await fetch(randomCouple.cowo)).buffer();

    await conn.sendFile(message.chat, maleImage, '', 'هذا هو الطقم الأول 🧑‍🦰', message);

    // تحميل وإرسال الصورة الثانية (للفتاة)

    let femaleImage = await (await fetch(randomCouple.cewe)).buffer();

    await conn.sendFile(message.chat, femaleImage, '', 'هذا هو الطقم الثاني 👩‍🦰', message);

};

handler.help = ['طقم1', 'تطقيم'];

handler.tags = ['anime'];

handler.command = ['طقم1', 'تطقيم'];

export default handler;