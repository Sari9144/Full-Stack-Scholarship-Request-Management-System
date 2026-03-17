
import { Router } from 'express'
import { getAll,  login, register,  } from '../controler/User.js'
import { auth, validateLogin, validateRegister } from '../../middlewares.js'

const router = Router()

router.get('/',          getAll)
// router.get('/me',        auth)
router.post('/login',    validateLogin,    login)     // ← בדיקות לפני כניסה
router.post('/register', validateRegister, register)  // ← בדיקות לפני הרשמה
// router.post('/logout')

export default router
