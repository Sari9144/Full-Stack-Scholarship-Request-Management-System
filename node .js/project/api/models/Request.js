
import mongoose from 'mongoose'

const requestScheme = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['waiting', 'allow', 'reject', 'draft'],
        default: 'waiting'
    },
    tz: {
        type: String,
        maxLength: 20
    },
    // האם זו טיוטה (לא הוגשה עדיין)
    isDraft: {
        type: Boolean,
        default: false
    },
    personal: {
        type: mongoose.Types.ObjectId,
        ref: "personalFrom"
    },
    family: {
        type: mongoose.Types.ObjectId,
        ref: "familyFrom"  // שים לב: תקן את שם ה-ref
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "curseFrom"
    },
    bank: {
        type: mongoose.Types.ObjectId,
        ref: "bankFrom"
    }
}, {
    timestamps: true  // מוסיף createdAt ו-updatedAt אוטומטית
})

export default mongoose.model("Request", requestScheme)
