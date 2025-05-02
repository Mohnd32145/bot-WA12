import axios from "axios";

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    let resp = `*[❗معلومة❗] الرجاء كتابة اسم دولتك أو مدينتك*`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
    return;
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = response.data;
    const name = res.name;
    const country = res.sys.country;
    const weather = res.weather[0].description;
    const temperature = res.main.temp + "°C";
    const minTemperature = res.main.temp_min + "°C";
    const maxTemperature = res.main.temp_max + "°C";
    const humidity = res.main.humidity + "%";
    const wind = res.wind.speed + "كم/س";
    const wea = `「 📍 」الموقع: ${name}\n「 🗺️ 」الدولة: ${country}\n「 🌤️ 」الطقس: ${weather}\n「 🌡️ 」درجة الحرارة: ${temperature}\n「 💠 」أدنى درجة حرارة: ${minTemperature}\n「 📛 」أقصى درجة حرارة: ${maxTemperature}\n「 💦 」الرطوبة: ${humidity}\n「 🌬️ 」سرعة الرياح: ${wind}`.trim();

    let txt = '';
    let count = 0;
    for (const c of wea) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
  } catch (e) {
    let resp = " *[❗معلومة❗] خطأ!\n _لم يتم العثور على نتائج، حاول كتابة اسم دولة أو مدينة موجودة._* ";
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
  }
};

handler.help = ['الطقس *<المدينة/الدولة>*'];
handler.tags = ['أدوات'];
handler.command = /^(الطقس|المناخ)$/i;
export default handler;