// Reset Password (reset-password.html)-specific translation strings. Extends
// window.I18N_STRINGS, which i18n-strings-shared.js must have already created (loaded first).
// This page has no shared header (standalone, no account-menu per CLAUDE.md), so there's no
// language toggle UI here -- it just respects whatever site-lang preference was already set on
// another page via localStorage, same engine as everywhere else.
Object.assign(window.I18N_STRINGS, {
    'reset.title': { en: 'Set a New Password', mn: 'Шинэ нууц үг тохируулах' },
    'reset.waitingIntro': { en: 'Waiting for the reset link to verify…', mn: 'Сэргээх холбоосыг баталгаажуулж байна…' },
    'reset.newPassword': { en: 'New password', mn: 'Шинэ нууц үг' },
    'reset.confirmNewPassword': { en: 'Confirm new password', mn: 'Шинэ нууц үгээ давтана уу' },
    'reset.setPassword': { en: 'Set Password', mn: 'Нууц үг тохируулах' },
    'reset.linkInvalid': { en: 'This reset link is invalid or has expired. Request a new one from the login form.', mn: 'Энэ сэргээх холбоос хүчингүй эсвэл хугацаа нь дууссан байна. Нэвтрэх маягтаас шинээр хүсэлт гаргана уу.' },
    'reset.passwordsDontMatch': { en: "Passwords don't match.", mn: 'Нууц үг таарахгүй байна.' },
    'reset.passwordUpdated': { en: 'Password updated! Redirecting…', mn: 'Нууц үг шинэчлэгдлээ! Шилжиж байна…' },
});
