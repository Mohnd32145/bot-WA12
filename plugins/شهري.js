// Import the database from the library

// import db from '../lib/database.js'

const freeMonthly = 500000; // Free user monthly reward

const premMonthly = 1500000; // Premium user monthly reward

let handler = async (m, { conn, isPrems }) => {

  let time = global.db.data.users[m.sender].lastmonthly + 2592000000; // 30 days in milliseconds

  // Check if the user has already claimed the monthly reward

  if (new Date() - global.db.data.users[m.sender].lastmonthly < 2592000000) {

    throw `🎁 *Anda telah mengumpulkan hadiah bulanan Anda*\n\n🕚 Masuk kembali *${msToTime(time - new Date())}* `;

  }

  // Add XP to the user based on their premium status

  global.db.data.users[m.sender].exp += isPrems ? premMonthly : freeMonthly;

  // Send a message confirming the reward

  m.reply(`

༺━─╃⌬ 🤖 ⌬╄─━༻

╰━━━━━━━━━━━━━━━━╯

🎁 *HADIAH BULANAN*

▢ *Anda telah menerima:*

🆙 *XP* : +${isPrems ? premMonthly : freeMonthly}

╰━━━━━━━━━━━━━━━━╯
> ✦┇𝐌𝐈𝐊𝐄𝐘 |♕| 𝐁𝐎𝐓┇✦

`);

  // Update the last monthly claim time

  global.db.data.users[m.sender].lastmonthly = new Date() * 1;

};

// Command handler setup

handler.help = ['monthly'];

handler.tags = ['econ'];

handler.command = ['monthly', 'شهري'];

export default handler;

// Function to convert milliseconds to a readable time format

function msToTime(duration) {

  var milliseconds = parseInt((duration % 1000) / 100),

    seconds = Math.floor((duration / 1000) % 60),

    minutes = Math.floor((duration / (1000 * 60)) % 60),

    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),

    days = Math.floor(duration / (1000 * 60 * 60 * 24));

  days = days < 10 ? "0" + days : days;

  hours = hours < 10 ? "0" + hours : hours;

  minutes = minutes < 10 ? "0" + minutes : minutes;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return days + " Hari " + hours + " Jam " + minutes + " Menit";

}