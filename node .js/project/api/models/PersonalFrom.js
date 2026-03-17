import mongoose from 'mongoose'
const personalFromScheme = new mongoose.Schema({
    owner:     { type: String, maxLength: 9 },
    firstName: { type: String, maxLength: 20 },
    lastName:  { type: String, maxLength: 20 },
    address:   { type: String, maxLength: 100 },
    dateB:     { type: String },
    fone:      { type: String, maxLength: 10 }
})
export default mongoose.model("personalFrom", personalFromScheme)
