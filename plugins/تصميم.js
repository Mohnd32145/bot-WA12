import fs from 'fs'

import path from 'path'

let handler = async (m, { args, conn }) => {

  if (!args[0]) throw 'نسيت النص!'

  m.reply('_المرجو الانتظار..._')

  let saveDir = './saved_files'  // اسم مجلد الحفظ الجديد

  if (!fs.existsSync(saveDir)) {

    fs.mkdirSync(saveDir, { recursive: true })  // إنشاء المجلد إذا لم يكن موجودًا

  }

  // إزالة التكرار في معلمات الرابط واستخدام النص المدخل من المستخدم مع ترميز صحيح

  let text = encodeURIComponent(args.join(' '))

  let res = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=fluffy-logo&fontsize=100&doScale=true&scaleWidth=800&scaleHeight=500&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=${text}`

  

  let filePath = path.join(saveDir, 'Noureddine.jpg')  // حفظ الصورة داخل المجلد الجديد

  conn.sendFile(m.chat, res, filePath, `مفيش شكرا كده ولا حاجه ❤`, m, false)

}

handler.help = ['flaming1 <text>']

handler.tags = ['maker', 'logo']

handler.command = /^(تصميم)$/i

export default handler