import mongoose from 'mongoose'
const userScheme=new mongoose.Schema({
    owner:{
    type:String,
    required:true,
    maxLength:9
},
firstName:{
    type:String,
    required:true,
    maxLength:20
},
lastName:{
    type:String,
    required:true,
    maxLength:20
},
password:{
    type:String,
    required:true,
    maxLength:200
}
})
export default mongoose.model("user",userScheme)