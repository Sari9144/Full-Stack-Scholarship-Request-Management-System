import '../css/mfrom.css'
import { useDispatch, useSelector } from 'react-redux'
import { setBankForm } from '../redux/requestSlice'
import { useIsraeliIdValidator, useTextValidator } from '../useTextValidator'

export const BankForm = () => {
  const dis = useDispatch()
  const currentF = useSelector(x => x.request.current?.bankForm) || {}

  const name  = useTextValidator(currentF.Name, /[A-Za-z_א-ת]/, "שם לא תקין")
  const owner = useIsraeliIdValidator(currentF.owner)

  const dictionary = {
    מזרחי:   [111, 222, 333, 444],
    הפועלים: [555, 666, 777, 888, 999],
    יהב:     [333, 444, 555, 666, 777],
    הדואר:   [555, 666, 777, 888],
    דיסקונט: [444, 555, 666, 777, 888, 999]
  }

  const bank   = Object.keys(dictionary)
  const branch = dictionary[currentF.BankName] || []

  const updateField = (key, value, validator) => {
    dis(setBankForm({ ...currentF, [key]: value }))
    if (validator?.showError) validator.showError(value)
  }

  BankForm.validate = () => {
    const a = name.validate(currentF.Name)
    const b = owner.validate(currentF.owner)
    const c = !!currentF.BankName
    const d = !!currentF.bankNumber
    if (!c) alert("אנא בחר בנק")
    if (!d) alert("אנא בחר סניף")
    return a && b && c && d
  }

  return (
    <form className="personal-form">
      <h2 className="form-title">Bank Information</h2>
      <div className="form-group">
        <label>שם בעל חשבון</label>
        <input type="text" placeholder="הכנס שם" className="form-input"
          value={currentF.Name || ""}
          onChange={(e) => updateField("Name", e.target.value, name)}
        />
        <p className="form-error">{name.error}</p>
      </div>
      <div className="form-group">
        <label>ת.ז</label>
        <input type="text" placeholder="הכנס ת.ז" className="form-input"
          value={currentF.owner || ""}
          onChange={(e) => { dis(setBankForm({ ...currentF, owner: e.target.value })); owner.handleChange(e.target.value) }}
        />
        <p className="form-error">{owner.error}</p>
      </div>
      <div className="form-group">
        <label>שם בנק</label>
        <select className="form-input" value={currentF.BankName || ""}
          onChange={(e) => dis(setBankForm({ ...currentF, BankName: e.target.value, bankNumber: "" }))}>
          <option disabled value="">בחר בנק</option>
          {bank.map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>סניף</label>
        <select className="form-input" value={currentF.bankNumber || ""} disabled={!currentF.BankName}
          onChange={(e) => dis(setBankForm({ ...currentF, bankNumber: e.target.value }))}>
          <option disabled value="">בחר סניף</option>
          {branch.map((e, i) => <option key={i} value={e}>{e}</option>)}
        </select>
      </div>
    </form>
  )
}
