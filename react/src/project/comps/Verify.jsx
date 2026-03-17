import { useDispatch, useSelector } from "react-redux"
import { cancellation, submitRequest } from "../redux/requestSlice"
import { useNavigate } from "react-router"
import { useState } from "react"
import "../css/verify.css"
import Swal from "sweetalert2"

export const Verify = () => {
  const dis = useDispatch()
  const nav = useNavigate()
  const { personalForm, familyForm, courseForm, bankForm } = useSelector(x => x.request.current)
  const [checked, setChecked] = useState(false)

  const isComplete = () => {
    if (!personalForm?.dateB || !personalForm?.address || !personalForm?.fone) return false
    if (!familyForm?.fatherName || !familyForm?.motherName ||
        familyForm?.countOfChildren === undefined || familyForm?.countOfOldChildren === undefined) return false
    if (!courseForm?.courseName || courseForm?.yearPrice === undefined || courseForm?.learningHour === undefined) return false
    if (!bankForm?.owner || !bankForm?.Name || !bankForm?.BankName || !bankForm?.bankNumber) return false
    return true
  }

  const handleConfirm = async () => {
    if (!isComplete()) {
      Swal.fire({ title: 'פרטים חסרים!', text: 'אנא מלא את כל הפרטים לפני הגשה.', icon: 'error', timer: 2500, showConfirmButton: false })
      return
    }
    try {
      await dis(submitRequest()).unwrap()
      dis(cancellation())
      Swal.fire({ title: 'הבקשה הוגשה בהצלחה!', icon: 'success', timer: 2000, showConfirmButton: false })
      nav('/Home')
    } catch {
      Swal.fire({ title: 'שגיאה בהגשה', icon: 'error', timer: 2000, showConfirmButton: false })
    }
  }

  const handleCancel = () => { dis(cancellation()); nav('/Home') }

  const Row = ({ label, value }) => (
    <div className="verify-row">
      <span className="verify-label">{label}:</span>
      <span className={`verify-value ${!value ? "missing" : ""}`}>{value || "חסר ⚠️"}</span>
    </div>
  )

  return (
    <div className="verify-card">
      <div className="verify-section">
        <h4>פרטים אישיים</h4>
        <Row label="שם" value={`${personalForm?.firstName || ""} ${personalForm?.lastName || ""}`} />
        <Row label="ת.ז" value={personalForm?.owner} />
        <Row label="כתובת" value={personalForm?.address} />
        <Row label="תאריך לידה" value={personalForm?.dateB} />
        <Row label="טלפון" value={personalForm?.fone} />
      </div>
      <div className="verify-section">
        <h4>פרטי משפחה</h4>
        <Row label="שם אב" value={familyForm?.fatherName} />
        <Row label="שם אם" value={familyForm?.motherName} />
        <Row label="מספר ילדים" value={familyForm?.countOfChildren?.toString()} />
        <Row label="ילדים מעל 18" value={familyForm?.countOfOldChildren?.toString()} />
      </div>
      <div className="verify-section">
        <h4>פרטי קורס</h4>
        <Row label="שם קורס" value={courseForm?.courseName} />
        <Row label="מחיר שנתי" value={courseForm?.yearPrice?.toString()} />
        <Row label="שעות לימוד" value={courseForm?.learningHour?.toString()} />
      </div>
      <div className="verify-section">
        <h4>פרטי בנק</h4>
        <Row label="שם בעל חשבון" value={bankForm?.Name} />
        <Row label="ת.ז" value={bankForm?.owner} />
        <Row label="בנק" value={bankForm?.BankName} />
        <Row label="סניף" value={bankForm?.bankNumber?.toString()} />
      </div>

      <div className="checkbox-row">
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <label>אני מאשר/ת שכל פרטי הבקשה נכונים ומדויקים.</label>
      </div>

      <div className="verify-actions">
        <button className="cancel-btn" onClick={handleCancel}>ביטול</button>
        <button className={`continue-btn ${!checked ? "disabled" : ""}`} disabled={!checked} onClick={handleConfirm}>
          הגש בקשה
        </button>
      </div>
    </div>
  )
}
