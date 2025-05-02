import hispamemes from 'hispamemes'
let handler = async (m, { conn, usedPrefix, command }) => {
const meme = hispamemes.meme()
conn.sendFile(m.chat, meme, 'error.jpg', `😂😂🤣`, m)
//await conn.sendButton(m.chat, `*_${command}_*`.trim(), wm, meme, [['التالي 🆕', `/${command}`]], m)
}
handler.command = ['ميمز2', 'ميم2'] 
handler.level = 3
export default handler
