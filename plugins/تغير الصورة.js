let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) throw '*❈↲ رد ع الصوره ال انت عاوز تحطها للجروب يحب.*'
await conn.updateProfilePicture(m.chat, img).then(_ => m.reply('❈↲ *تم تغير صوره الجروب*'))
} else throw '*❈↲ رد ع الصوره ال انت عاوز تحطها للجروب يحب.*'}
handler.command = /^تغير-الصوره?|تغيرالصوره$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler

/*import { webp2png } from '../lib/webp2mp4.js'
import { URL_REGEX } from '@adiwajshing/baileys'
let handler = async (m, { conn, args }) => {
let q = m.quoted ? m.quoted : m
if (/image/.test(mime)) {
let url = await webp2png(await q.download())
await conn.updateProfilePicture(m.chat, { url }).then(_ => m.reply('⚘ *_Imagen actualizada con éxito._*'))
} else if (args[0] && args[0].match(URL_REGEX)) {
await conn.updateProfilePicture(m.chat, { url: args[0] }).then(_ => m.reply('⚘ *_Imagen actualizada con éxito._*'))
} else throw '*⚠️️ رد ع الصوره ال انت عاوزه تحطها يحب.*'
}
handler.help = ['setppgrup']
handler.tags = ['group']
handler.alias = ['setppgc', 'setppgrup', 'تغير-صورة']
handler.command = /^setpp(gc|grup|group)$/i
handler.group = handler.admin = handler.botAdmin = true
export default handler*/
