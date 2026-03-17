import mongoose from 'mongoose'
const bankFromScheme = new mongoose.Schema({
    owner:      { type: String, maxLength: 9 },
    Name:       { type: String, maxLength: 20 },
    BankName:   { type: String, maxLength: 20 },
    bankNumber: { type: String, maxLength: 9 }
})
export default mongoose.model("bankFrom", bankFromScheme)
