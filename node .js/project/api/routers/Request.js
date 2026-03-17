
import express from 'express'
import { getAll, getMyStatus, saveDraft, submitRequest, getDraft, allowRequest, rejectRequest } from '../controler/Request.js'
import { auth, validateDraft } from '../../middlewares.js'

const router = express.Router()

router.get('/',             auth, getAll)
router.get('/my-status',    auth, getMyStatus)
router.get('/draft',        auth, getDraft)
router.post('/draft',       auth, validateDraft, saveDraft)  // ← בדיקות לפני שמירה
router.post('/submit',      auth, submitRequest)
router.patch('/allow/:id',  auth, allowRequest)
router.patch('/reject/:id', auth, rejectRequest)

export default router
