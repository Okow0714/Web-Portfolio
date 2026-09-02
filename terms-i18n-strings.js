// Terms of Service (terms.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in terms.html).
// 'privacy.contact.h' is reused from privacy-i18n-strings.js, which is NOT loaded on this
// page, so it's defined directly below too; harmless duplication since Object.assign here runs
// after i18n-strings-shared.js regardless. The last-updated date is deliberately this page's
// OWN key rather than privacy's: the two documents change independently, and sharing one key
// meant editing the privacy policy silently restamped this page as "updated" as well.
Object.assign(window.I18N_STRINGS, {
    'terms.lastUpdated': { en: 'Last updated: July 31, 2026', mn: 'Сүүлд шинэчилсэн: 2026 оны 7-р сарын 31' },
    'privacy.contact.h': { en: 'Contact', mn: 'Холбоо барих' },

    'terms.title': { en: 'Terms of Service', mn: 'Үйлчилгээний нөхцөл' },

    'terms.whatThisIs.h': { en: 'What this is', mn: 'Энэ юу вэ' },
    'terms.whatThisIs.p': {
        en: "This site is a personal portfolio and a set of free, educational Japanese-learning tools (a vocabulary matching game and a read-aloud practice tool, among others), built and maintained by one individual as a personal project. It isn't a company, and using it doesn't create any commercial relationship between us.",
        mn: 'Энэ сайт нь хувь хүний төслийн хүрээнд бүтээж, арчилдаг хувийн профайл болон үнэгүй, боловсролын зориулалттай япон хэл сурах хэрэгслүүдийн цуглуулга юм (үг холбох тоглоом, дуудаж унших дадлагын хэрэгсэл гэх мэт). Энэ нь компани биш бөгөөд үүнийг ашиглах нь бидний хооронд ямар нэгэн арилжааны харилцаа үүсгэдэггүй.'
    },

    'terms.accounts.h': { en: 'Accounts', mn: 'Бүртгэл' },
    'terms.accounts.p': {
        en: "You need an account only to save progress, post comments, bookmark projects, or send a message. You must be at least 13 years old to create one. You're responsible for keeping your password secure and for anything done through your account. Give an email you actually control, since it's how you'd recover access.",
        mn: 'Явц хадгалах, сэтгэгдэл бичих, төсөл тэмдэглэх, эсвэл зурвас илгээхийн тулд л бүртгэл шаардлагатай. Бүртгэл үүсгэхийн тулд та 13-аас дээш настай байх ёстой. Нууц үгээ хамгаалалттай байлгах, бүртгэлээрээ дамжуулан хийгдсэн бүх зүйлийг хариуцах нь таны үүрэг. Хандалтаа сэргээхэд хэрэг болох тул та бодитоор эзэмшдэг и-мэйл хаягаа өгнө үү.'
    },

    'terms.acceptableUse.h': { en: 'Acceptable use', mn: 'Ашиглалтын хязгаарлалт' },
    'terms.acceptableUse.p': {
        en: "Don't post anything illegal, abusive, or harassing in comments or messages; don't try to disrupt, scrape abusively, or gain unauthorized access to the site or its backend. I can remove content or suspend an account that violates this.",
        mn: 'Сэтгэгдэл, зурваст хууль бус, доромжилсон, дарамталсан агуулга бүү нийтэл; сайт болон түүний backend-д саад учруулах, хэт их scrape хийх, эрхгүйгээр нэвтрэхийг бүү оролдо. Үүнийг зөрчсөн контентыг устгах, бүртгэлийг түдгэлзүүлэх эрхийг би эдэлнэ.'
    },

    'terms.contentYouPost.h': { en: 'Content you post', mn: 'Таны нийтэлдэг контент' },
    'terms.contentYouPost.p': {
        en: "You keep ownership of comments and messages you submit, but by posting a comment you agree it's shown publicly next to your display name. Don't post anything you don't have the right to share.",
        mn: 'Таны илгээсэн сэтгэгдэл, зурвасны эзэмшил тань дээр үлдэнэ, гэхдээ сэтгэгдэл бичснээр энэ нь таны харагдах нэрийн хажууд нийтэд харагдахыг зөвшөөрч байна гэсэн үг. Хуваалцах эрхгүй зүйлээ бүү нийтэл.'
    },

    'terms.studyAccuracy.h': { en: 'Study content accuracy', mn: 'Сургалтын агуулгын үнэн зөв байдал' },
    'terms.studyAccuracy.p': {
        en: 'The Japanese vocabulary, reading passages, and level classifications (N5–N1, etc.) in the learning tools are compiled from community and open-data sources for educational practice — they are <strong>not</strong> official JLPT materials, and I don\'t guarantee they\'re error-free or exam-accurate. Don\'t rely on them as your only source if you\'re preparing for an actual exam.',
        mn: 'Сургалтын хэрэгслүүд дэх япон үг хэллэг, уншлагын хэсгүүд, түвшний ангилал (N5–N1 гэх мэт) нь дадлага хийх зорилгоор нийгэмлэг болон нээлттэй эх сурвалжаас цуглуулагдсан болно — эдгээр нь албан ёсны JLPT материал <strong>биш</strong> бөгөөд алдаагүй, шалгалтад бүрэн тохирсон гэдгийг би баталгаажуулдаггүй. Бодит шалгалтад бэлдэж байгаа бол эдгээрийг цорын ганц эх сурвалж болгон бүү найд.'
    },

    'terms.noWarranty.h': { en: 'No warranty', mn: 'Баталгаа өгөхгүй' },
    'terms.noWarranty.p': {
        en: 'This is a personal project provided "as is," with no guarantee of uptime, availability, or that it\'s free of bugs. Features may change or be removed as it\'s developed further.',
        mn: 'Энэ бол "байгаа хэвээр нь" ашиглах хувийн төсөл бөгөөд тасралтгүй ажиллах, үргэлж хүртээмжтэй байх, эсвэл алдаагүй байх баталгаа өгдөггүй. Цаашид хөгжүүлэх явцад онцлогууд өөрчлөгдөх, эсвэл устах магадлалтай.'
    },

    'terms.limitationLiability.h': { en: 'Limitation of liability', mn: 'Хариуцлагын хязгаарлалт' },
    'terms.limitationLiability.p': {
        en: "To the extent the law allows, I'm not liable for any damages or losses arising from your use of this site. Use it at your own discretion.",
        mn: 'Хууль зөвшөөрсөн хэмжээнд, энэ сайтыг ашигласнаас үүдэн гарсан аливаа хохирол, алдагдлыг би хариуцахгүй. Өөрийн үзэмжээр ашиглана уу.'
    },

    'terms.termination.h': { en: 'Termination', mn: 'Дуусгавар болгох' },
    'terms.termination.p': {
        en: 'You can delete your own account at any time. I can remove or suspend an account that violates these terms.',
        mn: 'Та хүссэн үедээ өөрийн бүртгэлийг устгах боломжтой. Эдгээр нөхцөлийг зөрчсөн бүртгэлийг би устгах, эсвэл түдгэлзүүлэх эрхтэй.'
    },

    'terms.changes.h': { en: 'Changes to these terms', mn: 'Энэ нөхцөлийн өөрчлөлт' },
    'terms.changes.p': {
        en: "If these terms change, I'll update the date at the top of this page. Continuing to use the site after a change means you accept the update.",
        mn: 'Хэрэв эдгээр нөхцөл өөрчлөгдвөл энэ хуудасны дээд хэсэгт байгаа огноог шинэчилнэ. Өөрчлөлтийн дараа сайтыг үргэлжлүүлэн ашиглавал та шинэчлэлийг зөвшөөрч байна гэсэн үг.'
    },

    'terms.contact.p': {
        en: 'Questions about these terms: <a href="mailto:ganzorig2003@gmail.com">ganzorig2003@gmail.com</a>',
        mn: 'Эдгээр нөхцөлтэй холбоотой асуулт байвал: <a href="mailto:ganzorig2003@gmail.com">ganzorig2003@gmail.com</a>'
    },
});
