let handler = m => m;

handler.all = async function (m) {

    let chat = global.db.data.chats[m.chat];

    if (m.fromMe) return;

    let responses;

    if (/^هلا$/i.test(m.text)) {

        responses = ['> ♡ هـــــــلا بـــــــيك يـــــــاعـــــــمـــــري'];

    } else if (/^السلام عليكم|سلام عليكم ورحمه الله وبركاته|سلام عليكم$/i.test(m.text)) {

        responses = ['> ◇ وَعـلـيـكـمُ الـسـلَـامُ وَرحـمَـةُ اللهِ وَبـركـاتـه'];

    } else if (/^(بوت|مايكي)$/i.test(m.text)) {

        let imagePath = './بوت.jpg';

        this.sendFile(m.chat, imagePath, 'بوت.jpg',

            '> بـــــوت مــــايــــكـــي مــــوجــــود\n> ◇ اكــــتــــب .اوامــــر لـــلاســــتــــخــــدام ◇',

            m);

        return;

    } else if (/ تحبني$/i.test(m.text)) {

        responses = [

            '> ♡ أمــــــوت فــــــيــــــك',

            '> ❌ أكــــــرهــــــك',

            '> ◇ أحــــــبــــــك نــــــص حــــــب'

        ];

    } else if (/^(هاي|هالو)$/i.test(m.text)) {

        responses = ['> ◇ هــــــالــــــو'];

    } else if (/^بحبك/i.test(m.text)) {

        responses = ['> ♡ بــــــحــــــبــــــك أكــــــتــــــر'];

    } else if (/^احبك$/i.test(m.text)) {

        responses = ['> ♡ مــــــي تــــــو'];

    } else if (/^عامل (ايه|اي|اية)$/i.test(m.text)) {

        responses = ['> ◇ الــــــحــــــمــــــد لــــــلــــــه'];

    } else if (/^اهلا$/i.test(m.text)) {

        responses = ['> ♡ أهــــــلا وســــــهــــــلا'];

    } else if (/^مساء$/i.test(m.text)) {

        responses = ['> ◇ مــــــســــــاء الــــــخــــــيــــــر'];

    } else if (/^صباح$/i.test(m.text)) {

        responses = ['> ♡ صــــــبــــــاح الــــــنــــــوــــــر'];

    } else if (/^اوامر$/i.test(m.text)) {

        responses = ['> ◇ لا تــــــنــــــســــــى (.)'];

    } else if (/^مرحبا$/i.test(m.text)) {

        responses = ['> ♡ مــــــرحــــــبــــــا بــــــك'];

    } else if (/^تبا$/i.test(m.text)) {

        responses = ['> ◇ تــــــبــــــا لــــــلأعــــــداء'];

    } else if (/^تست$/i.test(m.text)) {

        responses = [

            '> ♡ شــــــغــــــال يــــــحــــــب',

            '> ◇ الــــــبــــــوت يــــــعــــــمــــــل',

            '> ♡ يــــــاعــــــم ور بــــــنــــــا شــــــغــــــال'

        ];

    } else if (/^الحمدلله$/i.test(m.text)) {

        responses = ['> ◇ أدــــــام الــــــلــــــه حــــــمــــــدك'];

    } else if (/^يب$/i.test(m.text)) {

        responses = ['> ♡ يــــــاعــــــم اســــــتــــــر جــــــل وقــــــول نــــــعــــــم'];

    } else if (/^بتعمل ايه دلوقت$/i.test(m.text)) {

        responses = ['> ◇ بــــــكــــــلــــــمــــــك'];

    } else if (/^انا جيت$/i.test(m.text)) {

        responses = ['> ♡ مــــــنــــــوــــــر'];

    } else if (/^اخرس$/i.test(m.text)) {

        responses = ['> ◇ حــــــاضــــــر'];

    } else if (/^حرامي|سارق$/i.test(m.text)) {

        responses = ['> ♡ لا تــــــتــــــهــــــم أحــــــداً بــــــالــــــســــــر قــــــة دون دلــــــيــــــل'];

    } else if (/^ملل|مللل|ملللل$/i.test(m.text)) {

        responses = ['> ◇ عــــــارفــــــيــــــن ف اســــــكــــــت'];

    } else if (/^تصبح علي خير|تصبحوا علي خير/i.test(m.text)) {

        responses = ['> ♡ وأنــــــت مــــــن أهــــــل الــــــخــــــيــــــر'];

    } else if (/^باي$/i.test(m.text)) {

        responses = ['> ◇ بــــــاي'];

    } else if (/^كيفك|عامل ايه$/i.test(m.text)) {

        responses = ['> ♡ الــــــحــــــمــــــد لــــــلــــــه وأنــــــت؟'];

    } else if (/^شكرا|تسلم|تسلمي$/i.test(m.text)) {

        responses = [

            '> ◇ الــــــعــــــفــــــو',

            '> ♡ ولا يهمك',

            '> ◇ الشكر لله'

        ];

    } else if (/^(مهند|تيربو)$/i.test(m.text)) {

        responses = ['> ◇ مــــــطــــــوــــــري وأســــــطــــــوــــــرتي 🦾🔥'];

    } else if (/^شرح$/i.test(m.text)) {

        responses = ['> ♡ 3•2•1 ⏳\n6•5•4 ⏳\n9•8•7 ⏳'];

    } else if (/^احا$/i.test(m.text)) {

        responses = ['> ◇ اــــــحــــــتــــــيــــــن عــــــلــــــي اــــــحــــــتــــــك 🐦'];

    } else if (/^احبك مايكي$/i.test(m.text)) {

        responses = ['> ♡ أنــــــا أكــــــتــــــر ✨💜'];

    } else if (/^مايكي بحبك|مايكي عاوزه اتجوزك|بحبك|بموت فيك|نتجوز|مايكي هنتجوز امتي|مايكي انت ليا|مايكي بموت فيك$/i.test(m.text)) {

        responses = [

            '> ◇ شــــــكــــــراً 😊',

            '> ♡ هــــــفــــــكــــــر فــــــي الــــــمــــــوــــــضــــــوــــــع 🤔',

            '> ◇ وأنــــــا كــــــمــــــان 💖',

            '> ♡ اســــــتــــــحــــــيــــــت 🙈',

            '> ◇ خــــــلــــــاص لا اــــــتــــــكــــــســــــف 😆',

            '> ♡ عــــــيــــــب الــــــكــــــلام ده 😏',

            '> ◇ طــــــيــــــب وبــــــعــــــدين؟ 🤨'

        ];

    } else if (/^كل خرا|عرص|خول|متناك|كسمك|علق$/i.test(m.text)) {

        responses = ['> ◇ عــــــيــــــب يــــــا مــــــحــــــتــــــرم 🚫'];

    } else if (/^تم تعريب هذا الامر|تم الانتهاء|تمت اضافه|تمت اضافة|تم التعريب|هذا الامر انتهي$/i.test(m.text)) {

        responses = [

            '> ♡ عــــــاشــــــت إيــــــدك 💪',

            '> ◇ تــــــســــــلــــــم إيــــــدك 🙌',

            '> ♡ عــــــاش مــــــايــــــكــــــي ⚡'

        ];

    } else if (/^لول|هههه|ههههه|هههههه|ههههههه|هههههههه|😂😂😂$/i.test(m.text)) {

        responses = [

            '> ◇ دــــــوــــــم الــــــضــــــحــــــكــــــة 🤣',

            '> ♡ إيــــــه الــــــلــــــي بــــــيــــــضــــــحــــــك؟ 😆',

            '> ◇ اــــــضــــــحــــــك مــــــعــــــاك؟ 😏'

        ];

    } else if (/^مايكي|مايكي عمك|يا مايكي$/i.test(m.text)) {

        responses = [

            '> ♡ قــــــلــــــب مــــــايــــــكــــــي مــــــن جــــــوًا 💖',

            '> ◇ مــــــايــــــكــــــي عــــــمــــــك 🤺'

        ];

    } else if (/^🧡|💚|💞|💖|💜|💛|🤍 $/i.test(m.text)) {

        responses = [

            '> ♡ تــــــســــــلــــــم 💕',

            '> ◇ حــــــبــــــيــــــبــــــي 💜'

        ];

    }

    if (responses) {

        let randomIndex = Math.floor(Math.random() * responses.length);

        this.reply(m.chat, responses[randomIndex], m);

    }

    return !0;

};

export default handler;