

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyStatus } from "../redux/requestSlice"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

export const ViewStatus = () => {
    const dis     = useDispatch()
    const nav     = useNavigate()
    const myStatus = useSelector(x => x.request.myStatus)
    const loading  = useSelector(x => x.request.loading)

    // טוען את הבקשה האחרונה של המשתמש מהשרת
    useEffect(() => {
        dis(fetchMyStatus())
    }, [])

    // מציג popup אחרי שהטעינה הסתיימה
    useEffect(() => {
        if (loading) return

        if (!myStatus) {
            Swal.fire({
                title: 'לא נמצאה בקשה',
                text: 'טרם הגשת בקשה.',
                icon: 'info',
                timer: 2000,
                showConfirmButton: false
            }).then(() => nav('/Home'))
            return
        }

        const messages = {
            allow:   { title: 'הבקשה אושרה! ✅',   text: 'הבקשה התקבלה בהצלחה.',       icon: 'success' },
            waiting: { title: 'הבקשה בהמתנה ⏳',   text: 'אנא המתן לאישור המנהל...',   icon: 'info'    },
            reject:  { title: 'הבקשה נדחתה ❌',    text: 'אנא פנה למנהל לפרטים.',      icon: 'error'   },
        }

        const msg = messages[myStatus.status] || { title: 'סטטוס לא ידוע', icon: 'warning' }

        Swal.fire({
            ...msg,
            timer: 2500,
            showConfirmButton: false
        }).then(() => nav('/Home'))

    }, [loading, myStatus])

    return <></>
}
