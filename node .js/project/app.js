import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import requestRouter from './api/routers/Request.js'
import userRouter from './api/routers/User.js'
const app = express()
dotenv.config()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
mongoose.connect(process.env.URI)
    // mongoose.connect(`mongodb://localhost:27017/requestDB`)
    // רק כאשר מחוברים לאינטרנט
    // mongoose.connect(`mongodb+srv://mk0533159433_db_user:327583@cluster0.agv8h71.mongodb.net/

    .then(() => {
        console.log("conected");
    }).catch(error => { console.error(error) })
app.use('/request', requestRouter)
app.use('/user', userRouter)
const port = 3001
app.listen(port, () => {
    console.log(`my app is running on http://localhost:${port}`);
})