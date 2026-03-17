import { useDispatch, useSelector } from 'react-redux'
import { setCourseForm } from '../redux/requestSlice'
import '../css/mfrom.css'
import { usePositiveNumberValidator, useTextValidator } from '../useTextValidator'

export const CourseForm = () => {
  const dis = useDispatch()
  const currentF = useSelector(x => x.request.current?.courseForm) || {}

  const courseName   = useTextValidator(currentF.courseName, /[A-Za-z_א-ת]$/, "שם קורס לא תקין")
  const yearPrice    = usePositiveNumberValidator(currentF.yearPrice)
  const learningHour = usePositiveNumberValidator(currentF.learningHour)

  const updateField = (key, value, validator) => {
    dis(setCourseForm({ ...currentF, [key]: value }))
    validator.showError(value)
  }

  CourseForm.validate = () => {
    const a = courseName.validate(currentF.courseName)
    const b = yearPrice.validate(currentF.yearPrice)
    const c = learningHour.validate(currentF.learningHour)
    return a && b && c
  }

  return (
    <form className="personal-form">
      <h2 className="form-title">Course Information</h2>
      <div className="form-group">
        <label>שם קורס</label>
        <input type="text" className="form-input"
          value={currentF.courseName || ""}
          onChange={(e) => updateField("courseName", e.target.value, courseName)}
        />
        <p className="form-error">{courseName.error}</p>
      </div>
      <div className="form-group">
        <label>מחיר שנתי</label>
        <input type="number" className="form-input"
          value={currentF.yearPrice ?? ""}
          onChange={(e) => updateField("yearPrice", e.target.value, yearPrice)}
        />
        <p className="form-error">{yearPrice.error}</p>
      </div>
      <div className="form-group">
        <label>שעות לימוד</label>
        <input type="number" className="form-input"
          value={currentF.learningHour ?? ""}
          onChange={(e) => updateField("learningHour", e.target.value, learningHour)}
        />
        <p className="form-error">{learningHour.error}</p>
      </div>
    </form>
  )
}
