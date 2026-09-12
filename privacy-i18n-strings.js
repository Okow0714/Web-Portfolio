// Privacy Policy (privacy.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in privacy.html).
Object.assign(window.I18N_STRINGS, {
    'privacy.title': { en: 'Privacy Policy', mn: 'Нууцлалын бодлого' },
    'privacy.lastUpdated': { en: 'Last updated: September 4, 2026', mn: 'Сүүлд шинэчилсэн: 2026 оны 9-р сарын 4' },

    'privacy.whoThisIs.h': { en: 'Who this is', mn: 'Энэ хэн бэ' },
    'privacy.whoThisIs.p': {
        en: 'This site (Khan Japanese) is a personal portfolio and a set of free Japanese-learning tools built and run by one individual (Sarantsatsral Ganzorig), not a company. This policy explains what happens to your information when you use it.',
        mn: 'Энэ сайт (Khan Japanese) нь компани биш, ганц хүний (Sarantsatsral Ganzorig) бүтээж ажиллуулдаг хувийн профайл болон үнэгүй япон хэл сурах хэрэгслүүдийн цуглуулга юм. Энэ бодлого нь та сайтыг ашиглах үед таны мэдээлэлд юу тохиолддогийг тайлбарладаг.'
    },

    'privacy.whatICollect.h': { en: 'What I collect', mn: 'Юу цуглуулдаг вэ' },
    'privacy.whatICollect.p': {
        en: 'If you never create an account, almost nothing is collected beyond standard web server activity (see "Hosting & logs" below). If you sign up, the following is stored, tied to your account:',
        mn: 'Хэрэв та бүртгэл үүсгээгүй бол стандарт веб серверийн үйл ажиллагаанаас (доор буй "Хостинг ба лог" хэсгийг үзнэ үү) өөр бараг юу ч цуглуулдаггүй. Хэрэв та бүртгүүлбэл дараах зүйлс бүртгэлтэй тань холбогдож хадгалагдана:'
    },
    'privacy.whatICollect.li1': {
        en: '<strong>Email and password</strong> — handled entirely by Supabase, the authentication provider this site uses. Your password is never stored or visible to me in readable form; Supabase hashes it.',
        mn: '<strong>И-мэйл болон нууц үг</strong> — энэ сайтын ашигладаг нэвтрэлтийн үйлчилгээ Supabase бүрэн зохицуулдаг. Таны нууц үг надад уншигдах хэлбэрээр хэзээ ч хадгалагдахгүй, харагдахгүй; Supabase үүнийг хэш (шифрлэсэн) хэлбэрээр хадгалдаг.'
    },
    'privacy.whatICollect.li2': {
        en: '<strong>Display name</strong> — a neutral one like "Reader 4821" is assigned when you sign up, and you can change it from your dashboard. It is public, so avoid putting your email address in it.',
        mn: '<strong>Харагдах нэр</strong> — бүртгүүлэхэд «Reader 4821» гэх мэт энгийн нэр өгөгдөх бөгөөд хянах самбараасаа өөрчилж болно. Энэ нэр нийтэд ил байдаг тул и-мэйл хаягаа бүү оруулаарай.'
    },
    'privacy.whatICollect.li3': {
        en: '<strong>Bookmarks</strong> you save on portfolio project entries.',
        mn: 'Портфолиогийн төслүүд дээр таны хадгалсан <strong>тэмдэглэгээ (bookmark)</strong>.'
    },
    'privacy.whatICollect.li4': {
        en: '<strong>Messages</strong> you send through the "Send a Message" contact form.',
        mn: '"Зурвас илгээх" маягтаар та илгээсэн <strong>зурвасууд</strong>.'
    },
    'privacy.whatICollect.li5': {
        en: "<strong>Study progress</strong> — which Word Match levels you've completed and your best time/moves, which Grammar Connect levels you've completed and your best time/mistakes, and which Dokkai Reader texts you've completed per track.",
        mn: '<strong>Суралцах явц</strong> — таны дуусгасан Үг холбох тоглоомын шатууд, тэдгээрийн шилдэг хугацаа/хөдөлгөөн, дуусгасан Дүрэм холбохын шатууд, тэдгээрийн шилдэг хугацаа/алдаа, мөн зам бүрээр дуусгасан Уншлагын дадлагын текстүүд.'
    },

    'privacy.whatICollect.days': {
        en: '<strong>Which days you studied</strong> — one row per calendar day you practised on, holding the date and how many attempts it held, so the site can show a study streak. The date comes from your own device, so your streak follows your midnight rather than the server’s. No clock times, and nothing about which tool or for how long.',
        mn: '<strong>Аль өдрүүдэд суралцсан</strong> — дасгал хийсэн хуанлийн өдөр бүрд нэг мөр: огноо болон тухайн өдрийн оролдлогын тоо. Ингэснээр суралцсан өдрийн цувааг харуулна. Огноог таны төхөөрөмжөөс авдаг тул цуваа нь серверийнх биш, таны шөнө дундаас эхэлнэ. Цагийн бүртгэл байхгүй, ямар хэрэгсэл дээр хэр удсан нь ч бүртгэгддэггүй.'
    },

    'privacy.whatICollect.words': {
        en: '<strong>Which words you get wrong, and what you picked instead</strong> — when a pair, tile or reading trips you up, the word and the answer you chose are counted against your account, so the site can show you what you keep missing and bring it back for review. Counts only — how long you took is never recorded; the dates you studied are kept separately, below.',
        mn: '<strong>Аль үгэнд алдаж байгаа, оронд нь юуг сонгосон</strong> — хос, хавтан, уншлагын аль нэгэнд алдвал тухайн үг болон таны сонгосон хариултыг бүртгэлд чинь тоолж тэмдэглэнэ. Ингэснээр байнга алддаг үгсийг чинь харуулж, давтахаар буцааж гаргаж ирнэ. Зөвхөн тоо — хэр удсаныг тань бүртгэдэггүй; суралцсан өдрүүдийг тань доор тусад нь бичдэг.'
    },

    'privacy.whatIDontCollect.h': { en: "What I don't collect", mn: 'Юу цуглуулдаггүй вэ' },
    'privacy.whatIDontCollect.voice': {
        en: '<strong>Your voice is not collected either.</strong> Dokkai Reader’s microphone is live only between pressing Start Reading and stopping it, and the audio never reaches this site — I never receive it, record it or store it. What does happen is that your browser transcribes it, and browsers generally do that by streaming the audio to their own vendor’s speech service. That step is the browser’s, not mine: it is outside my control and governed by your browser vendor’s privacy policy. It is listed again under who it’s shared with, because using the reader is what causes it.',
        mn: '<strong>Таны дуу хоолойг ч мөн цуглуулдаггүй.</strong> «Уншлагын дадлага»-ын микрофон нь «Унших» товчийг дарснаас зогсоох хүртэл л асаалттай байх бөгөөд дуу нь энэ сайт руу огт ирдэггүй — би түүнийг хүлээж авдаггүй, бичиж авдаггүй, хадгалдаггүй. Харин таны хөтөч түүнийг бичвэр болгон хөрвүүлдэг ба хөтчүүд үүнийг ихэвчлэн дуу таних өөрсдийн үйлчилгээ рүү дуу бичлэгийг дамжуулж хийдэг. Тэр алхам бол миний биш, хөтчийнх: миний хяналтаас гадуур бөгөөд таны хөтчийн нууцлалын бодлогоор зохицуулагдана. Уншлагын хэрэгслийг ашигласнаас болж энэ явдал болдог тул «Хэнтэй хуваалцдаг вэ» хэсэгт дахин дурдсан болно.'
    },

    'privacy.whatIDontCollect.p': {
        en: "No analytics or tracking scripts, no advertising networks, no third-party cookies, and no payment information run on this site — there's nothing to sell and nothing behind a paywall. The only stored data is what's listed above.",
        mn: 'Энэ сайтад аналитик болон хянах скрипт, зар сурталчилгааны сүлжээ, гуравдагч талын күүки, төлбөрийн мэдээлэл огт ажилладаггүй — юу ч зарахгүй, төлбөртэй хэсэг ч байхгүй. Дээр жагсаасан зүйлс л цорын ганц хадгалагддаг өгөгдөл юм.'
    },

    'privacy.howUsed.h': { en: "How it's used", mn: 'Хэрхэн ашигладаг вэ' },
    'privacy.howUsed.p': {
        en: "Solely to make the site work: signing you in, saving your progress across visits and letting me reply if you send a message. Nothing here is used for advertising, and I don't sell or share it with anyone for marketing purposes.",
        mn: 'Зөвхөн сайтыг ажиллуулахад: таныг нэвтрүүлэх, явц болон сэтгэгдлийг тань хадгалах, таны бичсэн зүйлийн хажууд нэрийг тань харуулах, зурвас илгээвэл хариулах боломж олгох зэрэгт л ашигладаг. Энд юу ч сурталчилгаанд ашиглагддаггүй, зах зээлийн зорилгоор хэнд ч зарж, хуваалцдаггүй.'
    },

    'privacy.sharedWith.h': { en: "Who it's shared with", mn: 'Хэнтэй хуваалцдаг вэ' },
    'privacy.sharedWith.p': {
        en: '<strong>Supabase</strong> (supabase.com) is the database and authentication provider behind this site — it processes and stores your account data and content on my behalf, under its own <a href="https://supabase.com/privacy" target="_blank" rel="noopener">privacy policy</a>. <strong>GitHub Pages</strong> hosts the site\'s files and, like any web host, sees standard request logs (IP address, browser type) as a normal part of serving web pages — I don\'t separately access or collect these. The one other thing that leaves this site is the audio your browser sends to its own speech service while Dokkai Reader is listening, described above — I neither receive nor store it. Nothing else is fetched from anyone else: the typefaces and the Supabase library are served from this site rather than from their vendors’ networks, so opening a page does not announce your IP address to any company beyond the two named here.',
        mn: '<strong>Supabase</strong> (supabase.com) нь энэ сайтын өгөгдлийн сан болон нэвтрэлтийн үйлчилгээг хариуцдаг — миний өмнөөс таны бүртгэлийн мэдээлэл, контентыг өөрийн <a href="https://supabase.com/privacy" target="_blank" rel="noopener">нууцлалын бодлогын</a> дагуу боловсруулж, хадгалдаг. <strong>GitHub Pages</strong> нь сайтын файлуудыг хостлодог бөгөөд ямар ч веб хостын адил стандарт хүсэлтийн лог (IP хаяг, хөтчийн төрөл) хардаг — эдгээрийг би тусад нь хандаж, цуглуулдаггүй. Энэ сайтаас гарах цорын ганц зүйл бол Уншлагын дадлага сонсож байх үед хөтөч таны дууг өөрийн дуу таних үйлчилгээ рүү илгээдэг нь — үүнийг би хүлээж ч авахгүй, хадгалж ч үлдэхгүй. Мөн хуудас ачаалах бүрд хоёр файлыг бусдын серверээс татдаг: сайтын үсгийн фонтыг <strong>Бусад ямар ч газраас юу ч татдаггүй: үсгийн фонт болон Supabase номын санг үйлдвэрлэгчийнх нь сүлжээнээс биш, энэ сайтаас өөрөөс нь дуудаж байгаа тул хуудас нээхэд таны IP хаяг дээр дурдсан хоёроос өөр компанид мэдэгдэхгүй. Файл татах үед тэр сервер таны IP хаяг, хөтчийг мэдэх бөгөөд энэ нь ямар ч хүсэлтийн адил юм. Би тэднээс таны талаар юу ч асуухгүй, хариуд нь юу ч авахгүй. Өөр юу ч хэнд ч дамжуулагдахгүй.'
    },

    'privacy.cookies.h': { en: 'Cookies & local storage', mn: 'Күүки ба локал хадгалалт' },
    'privacy.cookies.p': {
        en: "Staying logged in relies on your browser's local storage holding a session token, managed by Supabase. This is functional, not tracking — it's not used to follow you across other sites or build an advertising profile.",
        mn: 'Нэвтэрсэн байдлаа хадгалахын тулд таны хөтчийн локал хадгалалтад Supabase-ийн зохицуулдаг сешн токен хадгалагддаг. Энэ нь функциональ зориулалттай, хяналтын зориулалттай биш — таныг өөр сайтууд дээр мөрдөх, эсвэл зар сурталчилгааны профайл бүтээхэд ашигладаггүй.'
    },

    'privacy.yourRights.h': { en: 'Your rights', mn: 'Таны эрх' },
    'privacy.yourRights.p': {
        en: "You can delete your own account and everything tied to it at any time — from your account menu once logged in, or by emailing me at the address below. Deleting your account removes your profile, bookmarks, messages, and study progress; nothing is kept afterward.",
        mn: 'Та хүссэн үедээ өөрийн бүртгэл болон түүнтэй холбоотой бүх зүйлийг устгах боломжтой — нэвтэрсний дараа бүртгэлийн цэснээс, эсвэл доорх хаягаар надад и-мэйл бичих замаар. Бүртгэлээ устгавал профайл, тэмдэглэгээ, зурвас, суралцах явц бүгд устана; дараа нь юу ч үлдэхгүй.'
    },

    'privacy.deleteAccount.h': { en: 'Deleting your account', mn: 'Бүртгэлээ устгах' },
    'privacy.deleteAccount.inApp': {
        en: '<strong>On the site or in the app:</strong> open the account menu, choose Settings, then Delete My Account, and type DELETE to confirm. It takes effect immediately.',
        mn: '<strong>Сайт дээр эсвэл аппаас:</strong> бүртгэлийн цэсээ нээж, «Тохиргоо» дотроос «Бүртгэлээ устгах»-ыг сонгоод, баталгаажуулахын тулд DELETE гэж бичнэ үү. Тэр даруй хүчин төгөлдөр болно.'
    },
    'privacy.deleteAccount.byEmail': {
        en: '<strong>Without installing anything:</strong> email me at <a href="mailto:ganzorig2003@gmail.com">ganzorig2003@gmail.com</a> from the address you signed up with. I’ll delete the account as soon as I can, and within 30 days at the latest.',
        mn: '<strong>Юу ч суулгахгүйгээр:</strong> бүртгүүлсэн хаягаасаа <a href="mailto:ganzorig2003@gmail.com">ganzorig2003@gmail.com</a> руу захидал бичээрэй. Би аль болох хурдан, хамгийн оройдоо 30 хоногийн дотор устгана.'
    },
    'privacy.deleteAccount.whatGoes': {
        en: '<strong>What is deleted:</strong> your account and everything tied to it — your profile and display name, saved bookmarks, any message you sent through the contact form, your Word Match, Dokkai Reader and Grammar Connect progress, the per-word counts behind your review list, and the record of which days you studied. It is a single database deletion that cascades to all of them; nothing is held back.',
        mn: '<strong>Юу устах вэ:</strong> таны бүртгэл, түүнд холбоотой бүх зүйл — хувийн мэдээлэл, харагдах нэр, хадгалсан хавчуургууд, холбоо барих маягтаар илгээсэн захидал, «Үг холбох тоглоом», «Уншлагын дадлага», «Дүрэм холбох»-ын явц, давтах жагсаалтын ард байгаа үг тус бүрийн тоолол, мөн суралцсан өдрүүдийн бүртгэл. Энэ бол өгөгдлийн сангийн ганц удаагийн устгал бөгөөд бүгдэд нь дамжин үйлчилнэ; юу ч үлдэхгүй.'
    },
    'privacy.deleteAccount.whatStays': {
        en: '<strong>What isn’t mine to delete:</strong> my web host’s standard request logs and my database provider’s routine backups, which age out on their own schedules. I don’t read either one and can’t pick your rows out of them.',
        mn: '<strong>Миний устгах эрхгүй зүйл:</strong> вэб хостын энгийн хандалтын лог, өгөгдлийн сан хариуцагчийн ердийн нөөц хуулбар. Эдгээр нь тус тусын хугацаагаар аяндаа устдаг. Би аль алийг нь уншдаггүй, доторх таны мөрүүдийг ялгаж ч чадахгүй.'
    },
    'privacy.deleteAccount.note': {
        en: 'You never needed an account to use the five study tools, and deleting yours leaves every one of them working.',
        mn: 'Таван хэрэгслийг ашиглахад бүртгэл огт шаардлагагүй байсан бөгөөд бүртгэлээ устгасан ч бүгд хэвээрээ ажиллана.'
    },

    'privacy.childrens.h': { en: "Children's privacy", mn: 'Хүүхдийн нууцлал' },
    'privacy.childrens.p': {
        en: "This site isn't directed at children under 13, and I don't knowingly collect information from anyone under that age.",
        mn: 'Энэ сайт 13-аас доош насны хүүхдэд зориулагдаагүй бөгөөд би энэ насны хэн нэгний мэдээллийг мэдэж байж цуглуулдаггүй.'
    },

    'privacy.changes.h': { en: 'Changes to this policy', mn: 'Энэ бодлогын өөрчлөлт' },
    'privacy.changes.p': {
        en: "If this policy changes, I'll update the date at the top of this page. Continuing to use the site after a change means you accept the update.",
        mn: 'Хэрэв энэ бодлого өөрчлөгдвөл энэ хуудасны дээд хэсэгт байгаа огноог шинэчилнэ. Өөрчлөлтийн дараа сайтыг үргэлжлүүлэн ашиглавал та шинэчлэлийг зөвшөөрч байна гэсэн үг.'
    },

    'privacy.contact.h': { en: 'Contact', mn: 'Холбоо барих' },
    'privacy.contact.p': {
        en: 'Questions about this policy or your data: <a href="mailto:ganzorig2003@gmail.com">ganzorig2003@gmail.com</a>',
        mn: 'Энэ бодлого болон таны мэдээлэлтэй холбоотой асуулт байвал: <a href="mailto:ganzorig2003@gmail.com">ganzorig2003@gmail.com</a>'
    },
});
