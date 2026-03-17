import mongoose from 'mongoose'
const curseFromScheme = new mongoose.Schema({
    courseName:   { type: String,  maxLength: 20 },
    yearPrice:    { type: Number },
    learningHour: { type: Number }
})
export default mongoose.model("curseFrom", curseFromScheme)
