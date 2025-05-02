const مهلة_عدم_النشاط_بالثواني = 30 * 60 * 1000; 

async function حذف_بيانات_المستخدم_غير_النشط(م) {
  const المستخدم = global.chatgpt.data.users[م.sender];
  if (!المستخدم) return; // إذا لم يكن المستخدم موجودًا، لا تفعل شيئًا

  const وقت_آخر_تحديث = المستخدم.lastUpdate || 0; 
  const الوقت_الحالي = new Date().getTime();

  if (الوقت_الحالي - وقت_آخر_تحديث > مهلة_عدم_النشاط_بالثواني) {
    delete global.chatgpt.data.users[م.sender];
    //console.log(`تم حذف بيانات المستخدم ${م.sender} بعد ${مهلة_عدم_النشاط_بالثواني / 1000 / 60} دقيقة من عدم النشاط.`);
  }
}

export async function الكل(م) {
  let المستخدم = global.chatgpt.data.users[م.sender];

  if (المستخدم) {
    المستخدم.lastUpdate = new Date().getTime();
    global.chatgpt.data.users[م.sender] = المستخدم;
  } else {
    return; // إذا لم يكن المستخدم موجودًا، لا تفعل شيئًا
  }

  setTimeout(() => حذف_بيانات_المستخدم_غير_النشط(م), مهلة_عدم_النشاط_بالثواني);
}