import fetch from "node-fetch";

import fs from "fs";

import path from "path";

import os from "os";

let handler = async (m, { conn }) => {

  let url = 'https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json';

  let data;

  try {

    let response = await fetch(url);

    if (!response.ok) throw new Error("الملف غير موجود، سيتم إنشاء ملف جديد.");

    data = await response.json();

  } catch (err) {

    console.log(err.message);

    // بيانات افتراضية إذا كان الملف غير موجود

    data = [

      {

        cowo: "https://example.com/default_male.jpg",

        cewe: "https://example.com/default_female.jpg"

      }

    ];

    

    // حفظ الملف محليًا حتى لا يتم فقدانه

    fs.writeFileSync("ppcouple.json", JSON.stringify(data, null, 2));

  }

  let cita = data[Math.floor(Math.random() * data.length)];

  // تحديد المسار المناسب للتخزين

  let tempDir = os.tmpdir();

  let cowoPath = path.join(tempDir, "cowo.jpg");

  let cewePath = path.join(tempDir, "cewe.jpg");

  // تحميل الصور وحفظها في المسار المؤقت

  let cowo = await (await fetch(cita.cowo)).buffer();

  await fs.promises.writeFile(cowoPath, cowo);

  await conn.sendFile(m.chat, cowoPath, '', '♂️ ولد *رقم المطور +201222784295*', m);

  let cewe = await (await fetch(cita.cewe)).buffer();

  await fs.promises.writeFile(cewePath, cewe);

  await conn.sendFile(m.chat, cewePath, '', '♀️ بنت *رقم المطور +201222784295*', m);

};

handler.help = ['ppcouple', 'ppcp'];

handler.tags = ['internet'];

handler.command = ['طقم', 'تطقيم'];

export default handler;