import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPersonalForm } from "../redux/requestSlice"
import '../css/mfrom.css'
import { usePastDateValidator, useTextValidator } from "../useTextValidator"

export const PersonalForm = () => {
  const currentF = useSelector(x => x.request.current?.personalForm) || {}
  const current  = useSelector(x => x.users.current)
  const dis = useDispatch()

  const currentFRef = useRef(currentF)
  useEffect(() => { currentFRef.current = currentF })
  const didInit = useRef(false)

  const address = useTextValidator(currentF.address, /[A-Za-z_א-ת0-9]$/, "כתובת לא תקינה")
  const dateB   = usePastDateValidator(currentF.dateB)
  const fone    = useTextValidator(currentF.fone, /^[0-9]{9,10}$/, "מספר טלפון לא תקין")

  const updateField = (key, value) => {
    dis(setPersonalForm({ ...currentF, [key]: value }))
  }

  useEffect(() => {
    if (current?.owner && !didInit.current) {
      didInit.current = true
      dis(setPersonalForm({
        ...currentFRef.current,
        firstName: current.firstName,
        lastName:  current.lastName,
        owner:     current.owner,
      }))
    }
  }, [current])

  // בדיקת תקינות כל השדות — נקראת מ-MultiForm לפני Next
  PersonalForm.validate = () => {
    const a = address.validate(currentF.address)
    const d = dateB.validate(currentF.dateB)
    const f = fone.validate(currentF.fone)
    return a && d && f
  }

  return (
    <form className="personal-form">
      <h2 className="form-title">Personal Information</h2>
      <div className="form-group">
        <label>ת.ז</label>
        <input type="text" className="form-input" value={current.owner || ""} readOnly />
      </div>
      <div className="form-group">
        <label>שם פרטי</label>
        <input type="text" className="form-input" value={current.firstName || ""} readOnly />
      </div>
      <div className="form-group">
        <label>שם משפחה</label>
        <input type="text" className="form-input" value={current.lastName || ""} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="d">תאריך לידה</label>
        <input id="d" type="date" className="form-input"
          value={currentF.dateB || ""}
          onChange={(e) => { updateField("dateB", e.target.value); dateB.showError(e.target.value) }}
        />
        <p className="form-error">{dateB.error}</p>
      </div>
      <div className="form-group">
        <label htmlFor="address">כתובת</label>
        <input id="address" type="text" className="form-input"
          value={currentF.address || ""}
          onChange={(e) => { updateField("address", e.target.value); address.showError(e.target.value) }}
        />
        <p className="form-error">{address.error}</p>
      </div>
      <div className="form-group">
        <label htmlFor="fone">טלפון</label>
        <input id="fone" type="text" className="form-input"
          value={currentF.fone || ""}
          onChange={(e) => { updateField("fone", e.target.value); fone.showError(e.target.value) }}
        />
        <p className="form-error">{fone.error}</p>
      </div>
    </form>
  )
}
