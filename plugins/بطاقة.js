let handler = async (m, { conn, args, usedPrefix, command }) => {
  let name = args[0];
  if (!name) throw `❏ استخدم: ${usedPrefix}${command} [اسم الحيوان]`;

  let user = global.db.data.users[m.sender];
  if (!user.animals || user.animals.length === 0) throw '❌ لا تملك أي حيوانات.';

  let animal = user.animals.find(a => a.name === name);
  if (!animal) throw `❌ لا تملك الحيوان "${name}".`;

  conn.reply(m.chat, `
🎴 بطاقة ${animal.name}

✨ الندرة: ${animal.rarity}
⚔️ الهجوم: ${animal.attack}
🛡️ الدفاع: ${animal.defense}
❤️ الصحة: ${animal.health}
💎 سعر الشراء: ${animal.price}
`, m);
};

handler.help = ['بطاقة-حيوان [الاسم]'];
handler.tags = ['game'];
handler.command = ['بطاقة-حيوان'];

export default handler;