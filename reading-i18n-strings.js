// Dokkai Reader (reading.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in reading.html).
Object.assign(window.I18N_STRINGS, {
    'reading.title': { en: 'Dokkai Reader', mn: 'Уншлагын дадлага' },
    'reading.subtitle': {
        en: "Read passages aloud and watch the highlight follow your voice. Any reasonable pronunciation is accepted — pause for 3 seconds on a word and its reading and meaning pop up. Finishing a text moves you straight into the next one, and clearing a level unlocks the next.",
        mn: 'Текстийг чангаар уншихад тодотгол дуу хоолойг чинь дагана. Дуудлага яг таг байх албагүй — үг дээр 3 секунд гацвал уншлага, утга нь гарч ирнэ. Нэг текстийг дуусгамагц дараагийнх нь эхэлж, шатыг гүйцээвэл дараагийн шат нээгдэнэ.'
    },
    'reading.micHint': { en: "Needs microphone access and works best in Chrome or Edge — other browsers don't support live speech recognition.", mn: 'Микрофоны хандалт шаардлагатай бөгөөд Chrome эсвэл Edge дээр хамгийн сайн ажилладаг — бусад хөтчүүд бодит цагийн дуу таних функцийг дэмждэггүй.' },
    'reading.guestHint': { en: "Log in to save which texts you've completed across visits.", mn: 'Дуусгасан текстүүдээ хадгалахын тулд нэвтэрнэ үү.' },
    'reading.tracks': { en: 'Tracks', mn: 'Зам' },
    'reading.trackFoundation': { en: 'Foundation · N5 → N3', mn: 'Суурь · N5 → N3' },
    'reading.trackAdvanced': { en: 'Advanced · N3 → N1', mn: 'Ахисан · N3 → N1' },
    'reading.trackFoundationShort': { en: 'Foundation', mn: 'Суурь' },
    'reading.trackAdvancedShort': { en: 'Advanced', mn: 'Ахисан' },
    'reading.texts': { en: 'Texts', mn: 'Текстүүд' },
    'reading.skippedWords': { en: 'Skipped Words', mn: 'Алгассан үгс' },
    'reading.skippedEmptyHint': { en: 'Words the voice matcher jumps past without hearing directly will show up here.', mn: 'Дуу таних систем шууд сонсохгүй алгассан үгс энд харагдана.' },
    'reading.startReading': { en: 'Start Reading', mn: 'Унших эхлэх' },
    'reading.skipWord': { en: 'Skip Word', mn: 'Үг алгасах' },
    'reading.textComplete': { en: 'Text Complete!', mn: 'Текст дууслаа!' },
    'reading.textCompleteDesc': { en: 'Nice reading. Moving on to the next text…', mn: 'Сайхан уншлаа. Дараагийн текст рүү шилжиж байна…' },
    'reading.continueNow': { en: 'Continue Now', mn: 'Одоо үргэлжлүүлэх' },

    'reading.textsComplete': { en: '{done} / {total} texts complete', mn: '{done} / {total} текст дууссан' },
    'reading.finishPreviousToUnlock': { en: 'Finish the previous level to unlock', mn: 'Нээхийн тулд өмнөх шатыг дуусгана уу' },
    'reading.trackLevelHint': { en: '{track} — Level {n} (~{hint})', mn: '{track} — {n}-р шат (~{hint})' },
    'reading.charsCount': { en: '~{n} chars', mn: '~{n} тэмдэгт' },
    'reading.levelDashTitle': { en: 'Level {n} — {title}', mn: '{n}-р шат — {title}' },
    'reading.speechNotSupported': { en: "Speech recognition isn't supported in this browser — try Chrome or Edge.", mn: 'Энэ хөтөч дуу таних функцийг дэмждэггүй — Chrome эсвэл Edge ашиглана уу.' },
    'reading.wordsCount': { en: '{n} / {total} words', mn: '{n} / {total} үг' },
    'reading.levelCompleteUnlocked': { en: 'Level complete! Level {n} is now unlocked.', mn: 'Шат дууслаа! {n}-р шат нээгдлээ.' },
    'reading.trackComplete': { en: "You've completed the entire {track} track!", mn: 'Та {track} замыг бүхэлд нь дуусгалаа!' },
    'reading.viewLevels': { en: 'View Levels', mn: 'Шатуудыг харах' },
    'reading.micDenied': { en: 'Microphone access was denied.', mn: 'Микрофоны хандалтыг татгалзсан байна.' },
    'reading.stop': { en: 'Stop', mn: 'Зогсоох' },
    'reading.listening': { en: 'Listening…', mn: 'Сонсож байна…' },

    // Speech-recognition failure states. Every one of these used to be silent: the button sat
    // on "Listening…" while nothing happened, which is exactly what the reader sees when the
    // microphone is simply muted, so there was no telling a dead end from a quiet room.
    'reading.noSpeech': { en: "Not picking anything up — check your microphone is on and selected.", mn: 'Дуу сонсогдохгүй байна — микрофоноо асаалттай, сонгогдсон эсэхийг шалгаарай.' },
    'reading.noMic': { en: 'No microphone found. Connect one, or pick a different input device.', mn: 'Микрофон олдсонгүй. Микрофон холбох эсвэл өөр төхөөрөмж сонгоно уу.' },
    'reading.speechOffline': { en: "Speech recognition needs an internet connection — it can't run offline.", mn: 'Дуу таних функц интернэт холболт шаарддаг — офлайн ажиллахгүй.' },
    'reading.speechStalled': { en: 'Speech recognition keeps dropping out. Press Start Reading to try again.', mn: 'Дуу таних тасарсаар байна. «Унших эхлэх» дарж дахин оролдоно уу.' },
    'reading.insecureOrigin': { en: 'Speech recognition only works over a secure (https) connection.', mn: 'Дуу таних функц зөвхөн https холболтоор ажиллана.' },
    'reading.speechError': { en: 'Speech recognition stopped ({error}). Press Start Reading to try again.', mn: 'Дуу таних зогслоо ({error}). «Унших эхлэх» дарж дахин оролдоно уу.' },
    'reading.tapHint': { en: 'Tap any word to move the highlight there.', mn: 'Аль ч үг дээр дарвал тодотгол тэр үг рүү шилжинэ.' },
});
