// Import the database from the library

// import db from '../lib/database.js'

const free = 5000; // Free user reward

const prem = 20000; // Premium user reward

let handler = async (m, { conn, isPrems }) => {

  let time = global.db.data.users[m.sender].lastclaim + 86400000; // 24 hours in milliseconds

  // Check if the user has already claimed the daily reward

  if (new Date() - global.db.data.users[m.sender].lastclaim < 86400000) {

    throw `🎁 *Anda telah mengumpulkan hadiah harian Anda*\n\n🕚 Masuk kembali *${msToTime(time - new Date())}* `;

  }

  // Add XP to the user based on their premium status

  global.db.data.users[m.sender].exp += isPrems ? prem : free;

  // Send a message confirming the reward

  m.reply(`

༺━─╃⌬ 🤖 ⌬╄─━༻

╰━━━━━━━━━━━━━━━━╯

🎁 *HADIAH HARIAN*

▢ *Anda telah menerima:*

🆙 *XP* : +${isPrems ? prem : free}

╰━━━━━━━━━━━━━━━━╯
> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦

`);

  // Update the last claim time

  global.db.data.users[m.sender].lastclaim = new Date() * 1;

};

// Command handler setup

handler.help = ['daily'];

handler.tags = ['econ'];

handler.command = ['daily', 'يومي'];

export default handler;

// Function to convert milliseconds to a readable time format

function msToTime(duration) {

  var milliseconds = parseInt((duration % 1000) / 100),

    seconds = Math.floor((duration / 1000) % 60),

    minutes = Math.floor((duration / (1000 * 60)) % 60),

    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;

  minutes = minutes < 10 ? "0" + minutes : minutes;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + " Horas " + minutes + " Minutos";

}