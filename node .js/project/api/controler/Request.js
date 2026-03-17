
import requestModel from '../models/Request.js'
import personalModel from '../models/PersonalFrom.js'
import familyModel   from '../models/FamilyFrom.js'
import courseModel   from '../models/CurseFrom.js'
import bankModel     from '../models/BankFrom.js'

const withPopulate = (query) =>
    query.populate('personal').populate('family').populate('course').populate('bank')

// כל הבקשות — בקשה אחת לכל משתמש (הכי אחרונה), רק waiting ו-reject
export const getAll = async (req, res) => {
    try {
        // מביא את כל ה-waiting וה-reject, ממוינות מהחדש לישן
        const requests = await withPopulate(
            requestModel.find({ isDraft: false, status: { $in: ['waiting', 'reject'] } })
                .sort({ createdAt: -1 })
        )
        // שומר רק בקשה אחת לכל tz — הכי אחרונה
        const seen = new Set()
        const unique = requests.filter(r => {
            if (seen.has(r.tz)) return false
            seen.add(r.tz)
            return true
        })
        res.status(200).send(unique)
    } catch (err) {
        res.status(500).send(err)
    }
}

// סטטוס הבקשה האחרונה של המשתמש המחובר
export const getMyStatus = async (req, res) => {
    try {
        const request = await withPopulate(
            requestModel.findOne({ tz: req.user.owner, isDraft: false })
                .sort({ createdAt: -1 })
        )
        if (!request) return res.status(404).send({ message: 'לא נמצאה בקשה' })
        res.status(200).send(request)
    } catch (err) {
        res.status(500).send(err)
    }
}

// אישור בקשה
export const allowRequest = async (req, res) => {
    try {
        const updated = await requestModel.findByIdAndUpdate(
            req.params.id,
            { status: 'allow' },
            { new: true }
        )
        if (!updated) return res.status(404).send('לא נמצאה בקשה')
        res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

// דחיית בקשה
export const rejectRequest = async (req, res) => {
    try {
        const updated = await requestModel.findByIdAndUpdate(
            req.params.id,
            { status: 'reject' },
            { new: true }
        )
        if (!updated) return res.status(404).send('לא נמצאה בקשה')
        res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

// שמירת טיוטה
export const saveDraft = async (req, res) => {
    const { personalForm, familyForm, courseForm, bankForm } = req.body
    const userId = req.user.owner
    try {
        let draft = await requestModel.findOne({ tz: userId, isDraft: true })
        if (!draft) {
            draft = await new requestModel({ tz: userId, status: 'draft', isDraft: true }).save()
        }
        if (personalForm) {
            if (draft.personal) await personalModel.findByIdAndUpdate(draft.personal, personalForm)
            else { const p = await new personalModel(personalForm).save(); draft.personal = p._id }
        }
        if (familyForm) {
            if (draft.family) await familyModel.findByIdAndUpdate(draft.family, familyForm)
            else { const f = await new familyModel(familyForm).save(); draft.family = f._id }
        }
        if (courseForm) {
            if (draft.course) await courseModel.findByIdAndUpdate(draft.course, courseForm)
            else { const c = await new courseModel(courseForm).save(); draft.course = c._id }
        }
        if (bankForm) {
            if (draft.bank) await bankModel.findByIdAndUpdate(draft.bank, bankForm)
            else { const b = await new bankModel(bankForm).save(); draft.bank = b._id }
        }
        await draft.save()
        const populated = await withPopulate(requestModel.findById(draft._id))
        res.status(200).send(populated)
    } catch (err) {
        res.status(500).send({ error: 'שגיאה בשמירה', details: err.message })
    }
}

// טעינת טיוטה
export const getDraft = async (req, res) => {
    try {
        const draft = await withPopulate(
            requestModel.findOne({ tz: req.user.owner, isDraft: true })
        )
        if (!draft) return res.status(404).send({ message: 'אין טיוטה' })
        res.status(200).send(draft)
    } catch (err) {
        res.status(500).send(err)
    }
}

// הגשה סופית
export const submitRequest = async (req, res) => {
    try {
        const draft = await requestModel.findOne({ tz: req.user.owner, isDraft: true })
        if (!draft) return res.status(404).send({ error: 'לא נמצאה טיוטה' })
        draft.isDraft = false
        draft.status  = 'waiting'
        await draft.save()
        res.status(200).send(draft)
    } catch (err) {
        res.status(500).send(err)
    }
}
