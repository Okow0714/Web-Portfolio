// Dashboard (dashboard.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in dashboard.html).
Object.assign(window.I18N_STRINGS, {
    // 'dash.titleSub' lives in i18n-strings-shared.js, not here -- it's referenced from the
    // nav on every page, not just this one, and a page-scoped file only loads on its own page.
    'dash.guestTitle': { en: 'Log in to see your dashboard', mn: 'Хянах самбараа үзэхийн тулд нэвтэрнэ үү' },
    'dash.guestBody': { en: 'Your progress, score, and account settings all live here once you have an account.', mn: 'Бүртгэлтэй болмогц таны явц, оноо, бүртгэлийн тохиргоо бүгд энд харагдана.' },

    'dash.editName': { en: 'Edit display name', mn: 'Харагдах нэрээ засах' },
    'dash.save': { en: 'Save', mn: 'Хадгалах' },
    'dash.cancel': { en: 'Cancel', mn: 'Цуцлах' },
    'dash.nameSaved': { en: 'Saved', mn: 'Хадгалагдлаа' },
    'dash.nameSaveFailed': { en: "Couldn't save — try again.", mn: 'Хадгалж чадсангүй — дахин оролдоно уу.' },

    'dash.yourScore': { en: 'Your Score', mn: 'Таны оноо' },
    'dash.you': { en: 'You', mn: 'Та' },
    'dash.average': { en: 'Average', mn: 'Дундаж' },
    'dash.scoreNote': { en: '{n} points per tool for full completion (Word Match, Grammar Connect, Dokkai Reader), 3,000 max. Compared against every registered user.', mn: 'Хэрэгсэл бүрийг бүрэн дуусгавал {n} оноо (Үг холбох тоглоом, Дүрэм холбох, Уншлагын дадлага), дээд тал нь 3,000. Бүх бүртгэлтэй хэрэглэгчтэй харьцуулсан.' },
    'dash.usersCounted': { en: 'Based on {n} registered users.', mn: 'Бүртгэлтэй {n} хэрэглэгчийн дата дээр үндэслэсэн.' },

    'dash.tools.game': { en: 'Word Match', mn: 'Үг холбох тоглоом' },
    'dash.tools.grammar': { en: 'Grammar Connect', mn: 'Дүрэм холбох' },
    'dash.tools.reading': { en: 'Dokkai Reader', mn: 'Уншлагын дадлага' },
    'dash.levelsDone': { en: '{done} / {total} levels', mn: '{done} / {total} шат' },
    'dash.textsDone': { en: '{done} / {total} texts', mn: '{done} / {total} текст' },
    'dash.continue': { en: 'Continue →', mn: 'Үргэлжлүүлэх →' },

    'dash.accountTitle': { en: 'Account settings', mn: 'Бүртгэлийн тохиргоо' },
    'dash.accountBody': { en: 'Password, sessions, and account deletion are managed from the account menu.', mn: 'Нууц үг, сешн, бүртгэл устгах зэргийг бүртгэлийн цэснээс удирдана.' },
    'dash.openAccountMenu': { en: 'Open Account Menu', mn: 'Бүртгэлийн цэс нээх' },
});
