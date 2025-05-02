import { canLevelUp } from '../lib/levelling.js';
import axios from 'axios';

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    if (!('autolevelup' in user)) user.autolevelup = true;
    if (!user.autolevelup) return;

    let before = user.level;
    while (canLevelUp(user.level, user.exp, global.multiplier)) {
        user.level++;
    }

    const roles = [
        'عضو عصابة مبتدئ🕵️‍♂️', 'مسجل في العصابة🔫', 'مقاتل عصابة💣', 'رجل عصابة مخضرم🔪',
        'مساعد رئيس العصابة🎩', 'رئيس عصابة صغير⚡', 'زعيم عصابة سري🔒', 'مجرم محترف💀',
        'أمير العصابة👑', 'زعيم عصابة كبير💼', 'اليد اليمنى للزعيم🖤', 'زعيم عصابة قوي⚔️',
        'إمبراطور العصابات👹', 'ملك العصابات🌑', 'حاكم الجريمة🏙️', 'إله الجريمة👁️',
        'زعيم الظلال🖤', 'أعلى مستوى في العصابة💎', 'نجم الجريمة💥', 'ملك الجريمة الكبرى🖤',
        'أمير الظلام🌙', 'زعيم الجريمة الدولية🌎', 'الوحش الأزرق💀', 'نقيب الجريمة⚠️',
        'ملك الإجرام 🏰', 'سيد العصابات🎩', 'أمير الجريمة الكبرى💥', 'زعيم الإمبراطورية الجريمة🦹‍♂️',
        'ملك الجرائم المظلمة👑', 'سيد الجريمة🖤', 'إمبراطور الفوضى👁️', 'ملك الظلال🖤',
        'أب الفوضى👹', 'زعيم اللصوص👾', 'إمبراطور السرقة💎', 'ملك الجريمة المظلمة🌑',
        'زعيم العصابة الكبرى💣', 'ملك الجريمة الأخير⚔️', 'الإمبراطور الجهنمي🔥', 'إله العالم السفلي💀',
        'ملك الجريمة الأبدي💀', 'الزعيم المطلق للعصابات👑'
    ];

    user.role = roles[Math.min(Math.floor(user.level / 2), roles.length - 1)];

    if (before !== user.level) {
        const caption = `
╭─┈━⚵━ ═⟞◈⟝═ ━⚵━┈─╮
╎🏅❯ لقد ارتفع مستواك ❮🏅╎
╰─┈━⚵━ ═⟞◈⟝═ ━⚵━┈─╯
║🀄║لــفـلـك الـقـديـم ◃◂◃ ⌈${before}⌋ 
║🎴║لــفـلـك الـجـديـد ◃◂◃ ⌈ ${user.level}⌋
╭─┈━⚵━ ═⟞◈⟝═ ━⚵━┈─╮
> كلما تفاعلت مع البوت ارتفع مستواك
> اكتب #لفل لمعرفه مستواك
╰─┈━⚵━ ═⟞◈⟝═ ━⚵━┈─╯
`.trim();

        try {
            const imageBuffer = await axios.get('https://tinyurl.com/23cv4gq3', { responseType: 'arraybuffer' });
            await conn.sendMessage(m.chat, {
                image: imageBuffer.data,
                caption,
                mentions: [m.sender]
            }, { quoted: m });
        } catch (err) {
            console.error("خطأ في تحميل الصورة:", err);
            await conn.sendMessage(m.chat, {
                text: caption,
                mentions: [m.sender]
            }, { quoted: m });
        }
    }
}

export const disabled = false;