let handler = async (m, { conn, usedPrefix, command }) => {

    if (command === 'استقبال') {

        let taguser = m.sender.split('@')[0];

        let groupName = m.isGroup ? (await conn.groupMetadata(m.chat)).subject : "𝓖𝓻𝓸𝓾𝓹 𝓝𝓪𝓶𝓮"; 

        let form = `حقوق: **تيربو الفنان**  

˼‏☘︎˹┊═┈┈┈┈┈ ⋄ ┉「🍻」┉ ⋄ ┈┈┈┈┈═┊˼‏☘︎˹  

❴✾❵──━━❨ ✓ استمارة دخول ✓ ❩━━──❴✾❵  

|┈ 🌹 **لـــــقـــــبــــــك** ⏎〘〙┈|  

|┈ 👀 **من اي انمــــي** ⏎〘〙┈|  

|┈ 👨🏻‍⚖️ **ذكر ام انـثـــى** ⏎〘〙┈|  

|┈ 🌹 **من طرف مين** ⏎〘〙┈|  

❴✾❵──━━━━❨ ✓ انــتــبـه‍ ✓ ❩━━━──❴✾❵  

① ⏎ يرجى ارسال الاستمارة مع صورة للشخصية التي اخترتها  

② ⏎ منشن أحد المشرفين بعد إكمال الاستمارة  

③ ⏎ يمنع اختيار لقب أنثى إذا كنت ذكرًا أو العكس  

˼‏☘︎˹┊═┈┈┈┈┈ ⋄ ┉「🍻」┉ ⋄ ┈┈┈┈┈═┊˼‏☘︎˹  

⸙ **مـع تـحـ🖊️ـيـات ادارة⬄**  

⬄⿻『 ${groupName} 』⿻⬄  

`;

        // إرسال الرسالة النصية فقط بدون صورة

        conn.sendMessage(m.chat, { text: form, mentions: [m.sender] });

    }

};

handler.help = ['استقبال'];

handler.tags = ['group'];

handler.command = ['استقبال'];

handler.fail = null;

export default handler;