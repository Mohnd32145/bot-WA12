import axios from 'axios'

let handler = async (m, { conn }) => {

    let res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/Messi.json`)).data  

    let url = res[Math.floor(res.length * Math.random())]

    conn.sendFile(m.chat, url, 'messi.jpg', `*مااااء*`, m)

}

handler.help = ['مسي', 'ميسي']

handler.tags = ['internet']

handler.command = /^(ميسي|مسي)$/i

export default handler