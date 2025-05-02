let handler = async (m, { conn }) => {

    let ownerNumbers = ["201222784295", "201094423209", "201282896127"];

    let senderNumber = m.sender.split("@")[0];

    // التحقق مما إذا كان المستخدم من المطورين

    if (!ownerNumbers.includes(senderNumber)) {

        return await m.reply("❌ *هذا الأمر مخصص للمطورين فقط!*");

    }

    // الحصول على قائمة المجموعات التي فيها البوت

    let groups = Object.keys(conn.chats).filter(chat => chat.endsWith("@g.us"));

    for (let group of groups) {

        await conn.sendMessage(group, {

            text: "⚠️ *بأمر من المطورين، سأخرج من المجموعة.*\n📩 *للمزيد من المعلومات، تواصل مع المطورين:*\n- wa.me/201222784295 (IZANA)\n- wa.me/201094423209 (الفؤش)\n- wa.me/201282896127 (Sasuke)",

        });

        await conn.groupLeave(group);

    }

};

handler.command = /^(outall|leaveall|اخرج-الكل)$/i;

handler.rowner = true; // الأمر خاص بالمطورين فقط

export default handler;