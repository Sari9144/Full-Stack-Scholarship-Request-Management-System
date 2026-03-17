
import jwt from 'jsonwebtoken'

// ─── Auth ────────────────────────────────────────────────────────────────────
export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).send('Access denied. No token provided.')
    try {
        const token = authHeader.split(' ')[1]
        req.user = jwt.verify(token, process.env.SECRET)
        next()
    } catch {
        return res.status(401).send('Invalid token.')
    }
}

// ─── helpers ─────────────────────────────────────────────────────────────────

// בדיקת ת.ז ישראלית (אלגוריתם Luhn)
const isValidIsraeliId = (id) => {
    if (!id || id.length !== 9 || !/^\d+$/.test(id)) return false
    let sum = 0
    for (let i = 0; i < 9; i++) {
        let n = Number(id[i]) * ((i % 2) + 1)
        sum += n > 9 ? n - 9 : n
    }
    return sum % 10 === 0
}

// תאריך בעבר (לפני היום)
const isPastDate = (val) => {
    const d = new Date(val)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return !isNaN(d.getTime()) && d < today
}

// מספר חיובי או אפס
const isPositiveOrZero = (val) => val !== undefined && val !== '' && Number(val) >= 0

// טקסט תקין (אותיות עברית/אנגלית/מספרים)
const isValidText = (val) => val && /[A-Za-zא-ת0-9]/.test(val)

// טלפון ישראלי 9-10 ספרות
const isValidPhone = (val) => val && /^[0-9]{9,10}$/.test(val)

// ─── Validate Personal ───────────────────────────────────────────────────────
export const validatePersonal = (req, res, next) => {
    const { personalForm } = req.body
    if (!personalForm) return next()

    const errors = {}
    if (personalForm.dateB !== undefined && !isPastDate(personalForm.dateB))
        errors.dateB = 'תאריך לידה לא תקין — חייב להיות בעבר'
    if (personalForm.address !== undefined && !isValidText(personalForm.address))
        errors.address = 'כתובת לא תקינה'
    if (personalForm.fone !== undefined && !isValidPhone(personalForm.fone))
        errors.fone = 'מספר טלפון לא תקין — 9-10 ספרות'

    if (Object.keys(errors).length > 0)
        return res.status(400).send({ errors })
    next()
}

// ─── Validate Family ─────────────────────────────────────────────────────────
export const validateFamily = (req, res, next) => {
    const { familyForm } = req.body
    if (!familyForm) return next()

    const errors = {}
    if (familyForm.fatherName !== undefined && !isValidText(familyForm.fatherName))
        errors.fatherName = 'שם אב לא תקין'
    if (familyForm.motherName !== undefined && !isValidText(familyForm.motherName))
        errors.motherName = 'שם אם לא תקין'
    if (familyForm.countOfChildren !== undefined && !isPositiveOrZero(familyForm.countOfChildren))
        errors.countOfChildren = 'מספר ילדים חייב להיות 0 או יותר'
    if (familyForm.countOfOldChildren !== undefined && !isPositiveOrZero(familyForm.countOfOldChildren))
        errors.countOfOldChildren = 'מספר ילדים מעל 18 חייב להיות 0 או יותר'

    if (Object.keys(errors).length > 0)
        return res.status(400).send({ errors })
    next()
}

// ─── Validate Course ─────────────────────────────────────────────────────────
export const validateCourse = (req, res, next) => {
    const { courseForm } = req.body
    if (!courseForm) return next()

    const errors = {}
    if (courseForm.courseName !== undefined && !isValidText(courseForm.courseName))
        errors.courseName = 'שם קורס לא תקין'
    if (courseForm.yearPrice !== undefined && !isPositiveOrZero(courseForm.yearPrice))
        errors.yearPrice = 'מחיר שנתי חייב להיות 0 או יותר'
    if (courseForm.learningHour !== undefined && !isPositiveOrZero(courseForm.learningHour))
        errors.learningHour = 'שעות לימוד חייבות להיות 0 או יותר'

    if (Object.keys(errors).length > 0)
        return res.status(400).send({ errors })
    next()
}

// ─── Validate Bank ───────────────────────────────────────────────────────────
const bankDictionary = {
    מזרחי:   [111, 222, 333, 444],
    הפועלים: [555, 666, 777, 888, 999],
    יהב:     [333, 444, 555, 666, 777],
    הדואר:   [555, 666, 777, 888],
    דיסקונט: [444, 555, 666, 777, 888, 999]
}

export const validateBank = (req, res, next) => {
    const { bankForm } = req.body
    if (!bankForm) return next()

    const errors = {}
    if (bankForm.Name !== undefined && !isValidText(bankForm.Name))
        errors.Name = 'שם בעל חשבון לא תקין'
    if (bankForm.owner !== undefined && !isValidIsraeliId(bankForm.owner))
        errors.owner = 'ת.ז לא תקינה'
    if (bankForm.BankName !== undefined && !bankDictionary[bankForm.BankName])
        errors.BankName = 'שם בנק לא תקין'
    if (bankForm.BankName && bankForm.bankNumber !== undefined) {
        const validBranches = bankDictionary[bankForm.BankName] || []
        if (!validBranches.includes(Number(bankForm.bankNumber)))
            errors.bankNumber = 'סניף לא תקין עבור הבנק שנבחר'
    }

    if (Object.keys(errors).length > 0)
        return res.status(400).send({ errors })
    next()
}

// ─── Validate Draft (כולל הכל) ───────────────────────────────────────────────
export const validateDraft = (req, res, next) => {
    const fns = [validatePersonal, validateFamily, validateCourse, validateBank]
    let i = 0
    const runNext = () => {
        if (i >= fns.length) return next()
        fns[i++](req, res, runNext)
    }
    runNext()
}

// ─── Validate Login ──────────────────────────────────────────────────────────
export const validateLogin = (req, res, next) => {
    const { owner, password } = req.body
    const errors = {}

    if (!isValidIsraeliId(owner))
        errors.owner = 'ת.ז לא תקינה'
    if (!password || password.trim() === '')
        errors.password = 'סיסמה לא יכולה להיות ריקה'

    if (Object.keys(errors).length > 0)
        return res.status(400).send({ errors })
    next()
}

// ─── Validate Register ───────────────────────────────────────────────────────
export const validateRegister = (req, res, next) => {
    const { owner, firstName, lastName, password } = req.body
    const errors = {}

    if (!isValidIsraeliId(owner))
        errors.owner = 'ת.ז לא תקינה'
    if (!isValidText(firstName))
        errors.firstName = 'שם פרטי לא תקין'
    if (!isValidText(lastName))
        errors.lastName = 'שם משפחה לא תקין'
    if (!password || password.trim() === '')
        errors.password = 'סיסמה לא יכולה להיות ריקה'

    if (Object.keys(errors).length > 0)
        return res.status(400).send({ errors })
    next()
}
