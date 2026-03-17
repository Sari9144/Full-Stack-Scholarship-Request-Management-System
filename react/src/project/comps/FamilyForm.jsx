import { useDispatch, useSelector } from 'react-redux'
import { setFamilyForm } from '../redux/requestSlice'
import '../css/mfrom.css'
import { usePositiveNumberValidator, useTextValidator } from '../useTextValidator'

export const FamilyForm = () => {
  const currentF = useSelector(x => x.request.current?.familyForm) || {}
  const dis = useDispatch()

  const fatherName         = useTextValidator(currentF.fatherName, /[A-Za-z_א-ת]$/, "שם אב לא תקין")
  const motherName         = useTextValidator(currentF.motherName, /[A-Za-z_א-ת]$/, "שם אם לא תקין")
  const countOfChildren    = usePositiveNumberValidator(currentF.countOfChildren)
  const countOfOldChildren = usePositiveNumberValidator(currentF.countOfOldChildren)

  const updateField = (key, value, validator) => {
    dis(setFamilyForm({ ...currentF, [key]: value }))
    validator.showError(value)
  }

  FamilyForm.validate = () => {
    const a = fatherName.validate(currentF.fatherName)
    const b = motherName.validate(currentF.motherName)
    const c = countOfChildren.validate(currentF.countOfChildren)
    const d = countOfOldChildren.validate(currentF.countOfOldChildren)
    return a && b && c && d
  }

  return (
    <form className="personal-form">
      <h2 className="form-title">Family Information</h2>
      <div className="form-group">
        <label>שם אב</label>
        <input type="text" placeholder="הכנס שם אב" className="form-input"
          value={currentF.fatherName || ""}
          onChange={(e) => updateField("fatherName", e.target.value, fatherName)}
        />
        <p className="form-error">{fatherName.error}</p>
      </div>
      <div className="form-group">
        <label>שם אם</label>
        <input type="text" placeholder="הכנס שם אם" className="form-input"
          value={currentF.motherName || ""}
          onChange={(e) => updateField("motherName", e.target.value, motherName)}
        />
        <p className="form-error">{motherName.error}</p>
      </div>
      <div className="form-group">
        <label>מספר ילדים</label>
        <input type="number" placeholder="הכנס מספר ילדים" className="form-input"
          value={currentF.countOfChildren ?? ""}
          onChange={(e) => updateField("countOfChildren", e.target.value, countOfChildren)}
        />
        <p className="form-error">{countOfChildren.error}</p>
      </div>
      <div className="form-group">
        <label>ילדים מעל 18</label>
        <input type="number" placeholder="הכנס מספר ילדים מעל 18" className="form-input"
          value={currentF.countOfOldChildren ?? ""}
          onChange={(e) => updateField("countOfOldChildren", e.target.value, countOfOldChildren)}
        />
        <p className="form-error">{countOfOldChildren.error}</p>
      </div>
    </form>
  )
}
