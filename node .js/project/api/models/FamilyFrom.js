import mongoose from 'mongoose'
const familyFromScheme = new mongoose.Schema({
    fatherName:       { type: String, maxLength: 20 },
    motherName:       { type: String, maxLength: 20 },
    countOfChildren:    { type: Number },
    countOfOldChildren: { type: Number }
})
export default mongoose.model("familyFrom", familyFromScheme)
