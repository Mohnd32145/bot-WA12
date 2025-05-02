import { watchFile, unwatchFile } from 'fs'

import chalk from 'chalk'

import { fileURLToPath } from 'url'

import fs from 'fs'

/* ~ إعدادات المالكين والمشرفين ~ */

global.owner = [

  ['994400776021', '𝚃𝙴𝚁𝙱𝚘', true],

]

global.mods = []  // المشرفون الإضافيون

global.prems = []  // المستخدمون المميزون

/* ~ إعدادات البوت الأساسية ~ */

global.botname = "𝑌𝑜𝑟𝑢𝑖𝑐ℎ𝑖 𝐵𝑜𝓉 𝑀𝐷"

global.packname = "𝙔𝙤𝙧𝙪𝙞𝙘𝙝𝙞_𝘽𝙤𝙩_𝙈𝘿"

global.author = "𝙏𝙚𝙧𝙗𝙤"

global.wm = "𝕐𝕠𝕣𝕦𝕚𝕔𝕙𝕚 𝔹𝕠𝕥 𝕄𝔻"

global.version = "1.9.5"

global.gatabot = true // تفعيل وضع التكرار التلقائي

/* ~ إعدادات القنوات ~ */

global.ch = {

  main: '120363375271927592@newsletter', // القناة الرئيسية

  backup: '120363375271927592@newsletter' // قناة احتياطية

}

/* ~ روابط التواصل ~ */

global.social = {

  youtube: 'https://www.youtube.com/@terbo_0109',

  tiktok: 'tiktok.com/@mohndalcot',

  facebook: 'https://www.facebook.com/mohndalcot',

  instagram: 'https://instagram.com/terbo_001',

  whatsapp: 'https://chat.whatsapp.com/KI1sBGRQlYxGdwoVXZHH2N'

}

/* ~ إعدادات الوسائط ~ */

global.media = {

  thumbnail: 'https://qu.ax/TjNaY.jpg',

  menu: fs.readFileSync('./media/Menu.jpg'),

  sticker: {

    packname: '𝑌𝑜𝑟𝑢𝑖𝑐ℎ𝑖 𝐵𝑜𝓉 𝑀𝐷',

    author: '𝙏𝙚𝙧𝙗𝙤'

  }

}

/* ~ إعدادات الأدمن ~ */

global.maxwarn = 4 // الحد الأقصى للتحذيرات

global.autoread = true // قراءة الرسائل تلقائياً

/* ~ إعدادات API ~ */

global.keys = {

  openai: 'sk-...OzYy', // مفتاح OpenAI

  violetics: 'beta',

  lolhuman: '𝙏𝙚𝙧𝙗𝙤'

}

global.APIs = {

  xteam: 'https://api.xteam.xyz',

  lolhuman: 'https://api.lolhuman.xyz',

  violetics: 'https://violetics.pw'

}

/* ~ رسائل البوت ~ */

global.messages = {

  wait: '⏳ جاري المعالجة...',

  success: '✅ تم التنفيذ بنجاح',

  error: '❌ حدث خطأ',

  admin: '⚠️ هذا الأمر للادمن فقط',

  group: '⚠️ هذا الأمر للمجموعات فقط',

  owner: '⚠️ هذا الأمر للمالك فقط',

  premium: '⚠️ هذا الأمر للأعضاء المميزين فقط'

}

/* ~ إيموجيات ~ */

global.emojis = {

  success: '✅',

  error: '❌',

  warning: '⚠️',

  loading: '⏳'

}

/* ~ التحديث التلقائي ~ */

let file = fileURLToPath(import.meta.url)

watchFile(file, () => {

  unwatchFile(file)

  console.log(chalk.redBright("تم تحديث ملف الإعدادات (config.js)"))

  import(`${file}?update=${Date.now()}`)

})