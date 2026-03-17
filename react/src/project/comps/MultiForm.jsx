import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BankForm } from "./BankForm";
import { CourseForm } from "./CourseForm";
import { FamilyForm } from "./FamilyForm";
import { PersonalForm } from "./PersonalForm";
import { Verify } from "./Verify";
import { fetchDraft, saveDraft } from "../redux/requestSlice";
import '../css/multiform.css';

export const Form = () => {
    const [step, setStep] = useState(0);
    const dis = useDispatch();

    const personalForm = useSelector(x => x.request.current.personalForm);
    const familyForm   = useSelector(x => x.request.current.familyForm);
    const courseForm   = useSelector(x => x.request.current.courseForm);
    const bankForm     = useSelector(x => x.request.current.bankForm);

    const FormTitles = ['פרטים אישיים', 'פרטי משפחה', 'פרטי קורס', 'פרטי בנק', 'אישור'];

    useEffect(() => { dis(fetchDraft()); }, []);

    const saveCurrentStep = async () => {
        const draftData = { 0: { personalForm }, 1: { familyForm }, 2: { courseForm }, 3: { bankForm } };
        if (step < 4) {
            try { await dis(saveDraft(draftData[step])).unwrap(); } catch {}
        }
    };

    const validateAndMove = async (nextStep) => {
        // תמיד מציג שגיאות — אבל לא חוסם מעבר
        const validators = {
            0: () => PersonalForm.validate?.(),
            1: () => FamilyForm.validate?.(),
            2: () => CourseForm.validate?.(),
            3: () => BankForm.validate?.(),
        };
        if (step < 4) validators[step]?.();  // מציג שגיאות בלי לחסום
        await saveCurrentStep();
        setStep(nextStep);
    };

    const StepDisplay = () => {
        switch (step) {
            case 0: return <PersonalForm />;
            case 1: return <FamilyForm />;
            case 2: return <CourseForm />;
            case 3: return <BankForm />;
            default: return <Verify />;
        }
    };

    const isLastStep = step === FormTitles.length - 1;

    return (
        <div className="multi-form-container">
            <div className="form-header">
                {FormTitles.map((title, index) => (
                    <button key={index}
                        className={`form-step-btn ${step === index ? "active-step" : ""}`}
                        type="button"
                        onClick={() => validateAndMove(index)}>
                        {title}
                    </button>
                ))}
            </div>

            <p className="bg-text">{FormTitles[step]}</p>
            <p className='steps'>שלב <span>{step + 1}</span> מתוך {FormTitles.length}</p>

            <div className="progressbar">
                <div className="progress" style={{ width: `${(step / (FormTitles.length - 1)) * 100}%` }} />
            </div>

            <div className="form-container">
                <div className="body">{StepDisplay()}</div>
                <div className="footer">
                    <button className="prev-btn" disabled={step === 0} onClick={() => validateAndMove(step - 1)}>הקודם</button>
                    {!isLastStep && <button className="next-btn" onClick={() => validateAndMove(step + 1)}>הבא</button>}
                </div>
            </div>
        </div>
    );
};
