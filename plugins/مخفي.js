import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {

    // إنشاء رسالة وهمية للاقتباس

    let fakeMsg = {

        key: {

            participant: '0@s.whatsapp.net',

            remoteJid: '120363413614869774@newsletter' // استخدام معرف النيوزليتر

        },

        message: {

            conversation: ' 𝐵𝛩𝑇 ✨' // اسم البوت الجديد

        }

    }

    

    // الحصول على جميع الأعضاء (أو المشتركين في النيوزليتر)

    let members = participants?.map(u => u.id) || []

    

    // إنشاء محتوى الرسالة

    let message = {

        text: text || '❖ تم الإرسال بنجاح.',

        mentions: members,

        contextInfo: {

            mentionedJid: members

        }

    }

    

    // توليد رسالة الواتساب

    let waMsg = generateWAMessageFromContent(

        m.chat,

        { extendedTextMessage: message },

        { quoted: fakeMsg }

    )

    

    // إرسال الرسالة

    await conn.relayMessage(m.chat, waMsg.message, { messageId: waMsg.key.id })

}

// معلومات الأوامر

handler.help = ['hidetag']

handler.tags = ['group']

handler.command = /^(هيدتاج|hidetag|notify|اشعار|مخفي)$/i

handler.group = true

handler.admin = true

handler.newsletter = true // تفعيل للنشرات الإخبارية

export default handler