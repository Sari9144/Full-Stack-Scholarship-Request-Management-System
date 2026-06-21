
// import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
// import * as 
// requestService from '../services/requestService'

// const cleanDoc = (doc) => {
//     if (!doc || typeof doc !== 'object' || typeof doc === 'string') return null
//     const plain = JSON.parse(JSON.stringify(doc))
//     if (!plain || typeof plain !== 'object' || Array.isArray(plain)) return null
//     const { _id, __v, createdAt, updatedAt, ...rest } = plain
//     return Object.keys(rest).length > 0 ? rest : null
// }

// const mapDraftToState = (state, draft) => {
//     const personal = cleanDoc(draft.personal)
//     const family   = cleanDoc(draft.family)
//     const course   = cleanDoc(draft.course)
//     const bank     = cleanDoc(draft.bank)
//     if (personal) state.current.personalForm = personal
//     if (family)   state.current.familyForm   = family
//     if (course)   state.current.courseForm   = course
//     if (bank)     state.current.bankForm     = bank
// }

// export const fetchAll      = createAsyncThunk('request/fetchAll',    () =>           requestService.getAll())
// export const fetchDraft    = createAsyncThunk('request/fetchDraft',  () =>           requestService.getDraft())
// export const saveDraft     = createAsyncThunk('request/saveDraft',   (formData) =>   requestService.saveDraft(formData))
// export const submitRequest = createAsyncThunk('request/submit',      () =>           requestService.submitRequest())
// export const fetchMyStatus = createAsyncThunk('request/myStatus',    () =>           requestService.getMyStatus())
// export const allowRequest  = createAsyncThunk('request/allow',       (id) =>         requestService.allowRequest(id))
// export const rejectRequest = createAsyncThunk('request/reject',      (id) =>         requestService.rejectRequest(id))

// const emptyForms = { personalForm: {}, familyForm: {}, courseForm: {}, bankForm: {} }

// const requestSlice = createSlice({
//     name: 'request',
//     initialState: {
//         requestList: [],   // רשימת בקשות למנהל
//         myStatus:    null, // סטטוס הבקשה של המשתמש הנוכחי
//         current:     { ...emptyForms },
//         loading:     false,
//         error:       null
//     },
//     reducers: {
//         setPersonalForm: (state, action) => { state.current.personalForm = action.payload },
//         setFamilyForm:   (state, action) => { state.current.familyForm   = action.payload },
//         setCourseForm:   (state, action) => { state.current.courseForm   = action.payload },
//         setBankForm:     (state, action) => { state.current.bankForm     = action.payload },
//         cancellation:    (state)         => { state.current = { ...emptyForms } },
        

//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAll.fulfilled,      (state, action) => { state.requestList = action.payload })
//             .addCase(fetchDraft.fulfilled,    (state, action) => { mapDraftToState(state, action.payload) })
//             .addCase(saveDraft.fulfilled,     (state, action) => { mapDraftToState(state, action.payload) })
//             .addCase(submitRequest.fulfilled, (state)         => { state.current = { ...emptyForms } })
//             .addCase(fetchMyStatus.fulfilled, (state, action) => { state.myStatus = action.payload })
//             .addCase(fetchMyStatus.rejected,  (state)         => { state.myStatus = null })
//             // אחרי אישור — מוחק מהרשימה (כי אושר, לא מוצג יותר)
//             .addCase(allowRequest.fulfilled,  (state, action) => {
//                 state.requestList = state.requestList.filter(r => r._id !== action.payload._id)
//             })
//             // אחרי דחייה — מעדכן סטטוס ברשימה
//             .addCase(rejectRequest.fulfilled, (state, action) => {
//                 const i = state.requestList.findIndex(r => r._id === action.payload._id)
//                 if (i !== -1) state.requestList[i].status = 'reject'
//             })
            
            

//             .addCase(fetchDraft.pending, (state) => {
//     state.loading = true;
//     state.current = { ...emptyForms }; // ניקוי הנתונים הקודמים כדי שלא יוצגו בזמן הטעינה
// })
//             .addMatcher(a => a.type.endsWith('/pending'),   state => { state.loading = true })
//             .addMatcher(a => a.type.endsWith('/rejected'),  (state, action) => { state.loading = false; state.error = action.error.message })
//             .addMatcher(a => a.type.endsWith('/fulfilled'), state => { state.loading = false })
//     }
// })

// export const { setPersonalForm, setFamilyForm, setCourseForm, setBankForm, cancellation } = requestSlice.actions
// export const selectPending=createSelector(state=>state.request.requestList,
//             list=>list
//         )
// // מסנן — מציג רק waiting ו-reject (לא allow, לא draft)
// // export const selectPending = state => state.request.requestList.filter(r => r.status === 'waiting' || r.status === 'reject')
// export default requestSlice.reducer

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import * as 
requestService from '../services/requestService'

const cleanDoc = (doc) => {
    if (!doc || typeof doc !== 'object' || typeof doc === 'string') return null
    const plain = JSON.parse(JSON.stringify(doc))
    if (!plain || typeof plain !== 'object' || Array.isArray(plain)) return null
    const { _id, __v, createdAt, updatedAt, ...rest } = plain
    return Object.keys(rest).length > 0 ? rest : null
}

const mapDraftToState = (state, draft) => {
    const personal = cleanDoc(draft.personal)
    const family   = cleanDoc(draft.family)
    const course   = cleanDoc(draft.course)
    const bank     = cleanDoc(draft.bank)
    if (personal) state.current.personalForm = personal
    if (family)   state.current.familyForm   = family
    if (course)   state.current.courseForm   = course
    if (bank)     state.current.bankForm     = bank
}

export const fetchAll      = createAsyncThunk('request/fetchAll',    () =>           requestService.getAll())
export const fetchDraft    = createAsyncThunk('request/fetchDraft',  () =>           requestService.getDraft())
export const saveDraft     = createAsyncThunk('request/saveDraft',   (formData) =>   requestService.saveDraft(formData))
export const submitRequest = createAsyncThunk('request/submit',      () =>           requestService.submitRequest())
export const fetchMyStatus = createAsyncThunk('request/myStatus',    () =>           requestService.getMyStatus())
export const allowRequest  = createAsyncThunk('request/allow',       (id) =>         requestService.allowRequest(id))
export const rejectRequest = createAsyncThunk('request/reject',      (id) =>         requestService.rejectRequest(id))

const emptyForms = { personalForm: {}, familyForm: {}, courseForm: {}, bankForm: {} }

// ערכי ברירת מחדל לסינון רשימת הבקשות (כולם פעילים יחד)
const emptyFilters = {
    status:   'all', // 'all' | 'waiting' | 'reject'
    dateFrom: '',     // YYYY-MM-DD
    dateTo:   '',     // YYYY-MM-DD
    name:     ''       // חיפוש חופשי לפי שם פרטי / שם משפחה / ת.ז
}

const requestSlice = createSlice({
    name: 'request',
    initialState: {
        requestList: [],   // רשימת בקשות למנהל
        filters:     { ...emptyFilters }, // סינון הרשימה הנ"ל
        myStatus:    null, // סטטוס הבקשה של המשתמש הנוכחי
        current:     { ...emptyForms },
        loading:     false,
        error:       null
    },
    reducers: {
        setPersonalForm: (state, action) => { state.current.personalForm = action.payload },
        setFamilyForm:   (state, action) => { state.current.familyForm   = action.payload },
        setCourseForm:   (state, action) => { state.current.courseForm   = action.payload },
        setBankForm:     (state, action) => { state.current.bankForm     = action.payload },
        cancellation:    (state)         => { state.current = { ...emptyForms } },
        // עדכון שדה סינון בודד, למשל: setFilter({ key: 'status', value: 'waiting' })
        setFilter:       (state, action) => { state.filters[action.payload.key] = action.payload.value },
        resetFilters:    (state)         => { state.filters = { ...emptyFilters } },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAll.fulfilled,      (state, action) => { state.requestList = action.payload })
            .addCase(fetchDraft.fulfilled,    (state, action) => { mapDraftToState(state, action.payload) })
            .addCase(saveDraft.fulfilled,     (state, action) => { mapDraftToState(state, action.payload) })
            .addCase(submitRequest.fulfilled, (state)         => { state.current = { ...emptyForms } })
            .addCase(fetchMyStatus.fulfilled, (state, action) => { state.myStatus = action.payload })
            .addCase(fetchMyStatus.rejected,  (state)         => { state.myStatus = null })
            // אחרי אישור — מוחק מהרשימה (כי אושר, לא מוצג יותר)
            .addCase(allowRequest.fulfilled,  (state, action) => {
                state.requestList = state.requestList.filter(r => r._id !== action.payload._id)
            })
            // אחרי דחייה — מעדכן סטטוס ברשימה
            .addCase(rejectRequest.fulfilled, (state, action) => {
                const i = state.requestList.findIndex(r => r._id === action.payload._id)
                if (i !== -1) state.requestList[i].status = 'reject'
            })
            
            

            .addCase(fetchDraft.pending, (state) => {
    state.loading = true;
    state.current = { ...emptyForms }; // ניקוי הנתונים הקודמים כדי שלא יוצגו בזמן הטעינה
})
            .addMatcher(a => a.type.endsWith('/pending'),   state => { state.loading = true })
            .addMatcher(a => a.type.endsWith('/rejected'),  (state, action) => { state.loading = false; state.error = action.error.message })
            .addMatcher(a => a.type.endsWith('/fulfilled'), state => { state.loading = false })
    }
})

export const { setPersonalForm, setFamilyForm, setCourseForm, setBankForm, cancellation, setFilter, resetFilters } = requestSlice.actions
export const selectPending=createSelector(state=>state.request.requestList,
            list=>list
        )
// מסנן — מציג רק waiting ו-reject (לא allow, לא draft)
// export const selectPending = state => state.request.requestList.filter(r => r.status === 'waiting' || r.status === 'reject')

export const selectFilters = state => state.request.filters

// רשימת הבקשות אחרי הפעלת כל הסינונים יחד (סטטוס + טווח תאריך הגשה + שם/ת.ז)
export const selectFilteredRequests = createSelector(
    [selectPending, selectFilters],
    (list, filters) => {
        const { status, dateFrom, dateTo, name } = filters
        const search = name.trim().toLowerCase()
        // dateTo כולל את כל היום עצמו (עד 23:59:59)
        const toEnd = dateTo ? new Date(dateTo + 'T23:59:59') : null
        const fromStart = dateFrom ? new Date(dateFrom + 'T00:00:00') : null

        return list.filter(item => {
            if (status !== 'all' && item.status !== status) return false

            if (fromStart || toEnd) {
                const created = item.createdAt ? new Date(item.createdAt) : null
                if (!created) return false
                if (fromStart && created < fromStart) return false
                if (toEnd && created > toEnd) return false
            }

            if (search) {
                const first = (item.personal?.firstName || '').toLowerCase()
                const last  = (item.personal?.lastName  || '').toLowerCase()
                const tz    = (item.tz || '').toLowerCase()
                const full  = `${first} ${last}`
                if (!first.includes(search) && !last.includes(search) && !full.includes(search) && !tz.includes(search)) {
                    return false
                }
            }

            return true
        })
    }
)

export default requestSlice.reducer
