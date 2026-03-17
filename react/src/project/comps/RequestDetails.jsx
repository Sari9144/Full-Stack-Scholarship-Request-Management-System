
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { allowRequest, fetchAll, rejectRequest } from "../redux/requestSlice"
import Swal from "sweetalert2"
import "../css/requestDetails.css"

export const RequestDetails = () => {
    const location = useLocation()
    const nav      = useNavigate()
    const dis      = useDispatch()
    const list     = useSelector(x => x.request.requestList)

    const data = list.find(x => x.tz === location.state?.tz) || null

    const handleAllow = async () => {
        try {
            await dis(allowRequest(data._id)).unwrap()
            await dis(fetchAll())
            Swal.fire({ title: 'הבקשה אושרה! ✅', icon: 'success', timer: 1500, showConfirmButton: false })
            nav(-1)
        } catch {
            Swal.fire({ title: 'שגיאה', icon: 'error', timer: 1500, showConfirmButton: false })
        }
    }

    const handleReject = async () => {
        try {
            await dis(rejectRequest(data._id)).unwrap()
            await dis(fetchAll())
            Swal.fire({ title: 'הבקשה נדחתה ❌', icon: 'info', timer: 1500, showConfirmButton: false })
            nav(-1)
        } catch {
            Swal.fire({ title: 'שגיאה', icon: 'error', timer: 1500, showConfirmButton: false })
        }
    }

    if (!data) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>לא נמצאו נתונים</p>

    return (
        <div className="details-card">
            <h2 className="section-title">פרטים אישיים</h2>
            <div className="form-item"><label>ת.ז</label><input readOnly value={data.tz || ""} /></div>
            <div className="form-item"><label>שם פרטי</label><input readOnly value={data.personal?.firstName || ""} /></div>
            <div className="form-item"><label>שם משפחה</label><input readOnly value={data.personal?.lastName  || ""} /></div>
            <div className="form-item"><label>כתובת</label><input readOnly value={data.personal?.address    || ""} /></div>
            <div className="form-item"><label>טלפון</label><input readOnly value={data.personal?.fone       || ""} /></div>

            <h2 className="section-title">פרטי משפחה</h2>
            <div className="form-item"><label>שם אב</label><input readOnly value={data.family?.fatherName         || ""} /></div>
            <div className="form-item"><label>שם אם</label><input readOnly value={data.family?.motherName         || ""} /></div>
            <div className="form-item"><label>מספר ילדים</label><input readOnly value={data.family?.countOfChildren    ?? ""} /></div>
            <div className="form-item"><label>ילדים מעל 18</label><input readOnly value={data.family?.countOfOldChildren ?? ""} /></div>

            <h2 className="section-title">פרטי קורס</h2>
            <div className="form-item"><label>שם קורס</label><input readOnly value={data.course?.courseName   || ""} /></div>
            <div className="form-item"><label>מחיר שנתי</label><input readOnly value={data.course?.yearPrice   ?? ""} /></div>
            <div className="form-item"><label>שעות לימוד</label><input readOnly value={data.course?.learningHour ?? ""} /></div>

            <h2 className="section-title">פרטי בנק</h2>
            <div className="form-item"><label>שם בעל חשבון</label><input readOnly value={data.bank?.Name       || ""} /></div>
            <div className="form-item"><label>ת.ז בעל חשבון</label><input readOnly value={data.bank?.owner      || ""} /></div>
            <div className="form-item"><label>שם בנק</label><input readOnly value={data.bank?.BankName   || ""} /></div>
            <div className="form-item"><label>סניף</label><input readOnly value={data.bank?.bankNumber  ?? ""} /></div>

            <div className="actions">
                <button className="reject-btn" onClick={handleReject}>דחה ❌</button>
                <button className="allow-btn"  onClick={handleAllow}>אשר ✅</button>
            </div>
        </div>
    )
}
