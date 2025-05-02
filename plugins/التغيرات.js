let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {

if (!m.messageStubType || !m.isGroup) return

const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  

let chat = global.db.data.chats[m.chat]

let usuario = `@${m.sender.split`@`[0]}`

let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/QGAVS.jpg'  

let nombre, foto, edit, newlink, status, admingp, noadmingp

nombre = `[⚡]⌯ تـــم تــغــيــر اســم الــجــروب\n⌯ الــاســم الــجــديــد : @subject`

foto = `'[⚡]⌯ تــم صوره الــجــروب`

edit = `[⚡]⌯ حد لعب ف الاعدادات بتاعت الجروب`

newlink = `[⚡]⌯ تــم تـغـيـر رابــط الـمـجـمــوعــه\n⌯ الــرابــط الـجـديـد : @revoke`

status = edit

admingp = `[⚡]⌯  لقد اصبحت الآن مشرفا\n\nالي رفعك ادمن ${usuario}`

noadmingp =  `[⚡]⌯  لم تعد مشرفا بعد الان\n\nالي نزاك من ادمن ${usuario}`

if (chat.detect && m.messageStubType == 21) {

await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })   

} else if (chat.detect && m.messageStubType == 22) {

await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 23) {

await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })    

} else if (chat.detect && m.messageStubType == 25) {

await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  

} else if (chat.detect && m.messageStubType == 26) {

await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  

} else if (chat.detect && m.messageStubType == 29) {

await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

} if (chat.detect && m.messageStubType == 30) {

await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

} else {

console.log({ messageStubType: m.messageStubType,

messageStubParameters: m.messageStubParameters,

type: WAMessageStubType[m.messageStubType]})

}}