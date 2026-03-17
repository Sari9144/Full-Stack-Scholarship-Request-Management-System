import { useState } from "react";

/* ------------------ Generic Text Validator ------------------ */
export function useTextValidator(initialValue = "", regex, errorMsg) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  // handleChange — לשימוש ב-Login/Register (מנהלים value בעצמם)
  const handleChange = (val) => {
    setValue(val);
    if (!val || (regex && !regex.test(val))) {
      setError(errorMsg || "Invalid value");
    } else {
      setError("");
    }
  };

  // validate — לשימוש בטפסים (רק בודק ומחזיר שגיאה, לא חוסם)
  const validate = (val) => {
    if (!val || (regex && !regex.test(val))) {
      setError(errorMsg || "Invalid value");
      return false;
    }
    setError("");
    return true;
  };

  // showError — מציג שגיאה בלי לחסום (לשימוש ב-onChange בטפסים)
  const showError = (val) => {
    if (!val || (regex && !regex.test(val))) {
      setError(errorMsg || "Invalid value");
    } else {
      setError("");
    }
  };

  return { value, error, handleChange, validate, showError };
}

/* ------------------ Positive Number Validator ------------------ */
export function usePositiveNumberValidator(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (num) => {
    setValue(num);
    if (num === "" || Number(num) >= 0) {
      setError("");
    } else {
      setError("Number must be greater than 0");
    }
  };

  const validate = (num) => {
    if (num === "" || num === null || num === undefined || Number(num) >= 0) {
      setError("");
      return true;
    }
    setError("Number must be greater than 0");
    return false;
  };

  const showError = (num) => {
    if (num !== "" && num !== null && num !== undefined && Number(num) < 0) {
      setError("Number must be greater than 0");
    } else {
      setError("");
    }
  };

  return { value, error, handleChange, validate, showError };
}

/* ------------------ Min Length Validator ------------------ */
export function useMinLengthValidator(initialValue = "", min = 3, errorMsg) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (val) => {
    setValue(val);
    if (!val || val.length < min) {
      setError(errorMsg || `Value must be at least ${min} characters`);
    } else {
      setError("");
    }
  };

  const validate = (val) => {
    if (!val || val.length < min) {
      setError(errorMsg || `Value must be at least ${min} characters`);
      return false;
    }
    setError("");
    return true;
  };

  return { value, error, handleChange, validate };
}

/* ------------------ Israeli ID Validator ------------------ */
export const useIsraeliIdValidator = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (val) => {
    setValue(val);
    if (val.length === 9) {
      _checkId(val);
    } else {
      setError("Invalid ID length");
    }
  };

  const validate = (val) => _checkId(val ?? value);

  const _checkId = (val) => {
    if (!val || val.length !== 9 || !/^\d+$/.test(val)) {
      setError("Invalid ID length");
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let incNum = Number(val[i]) * ((i % 2) + 1);
      sum += (incNum > 9 ? incNum - 9 : incNum);
    }
    if (sum % 10 !== 0) {
      setError("Invalid ID");
      return false;
    }
    setError("");
    return true;
  };

  return { value, error, handleChange, validate };
};

/* ------------------ Date Validator (must be before today) ------------------ */
export function usePastDateValidator(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (val) => {
    setValue(val);
    _check(val);
  };

  const validate = (val) => _check(val);

  const showError = (val) => { _check(val); };

  const _check = (val) => {
    const inputDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(inputDate.getTime())) {
      setError("Invalid date format");
      return false;
    } else if (inputDate >= today) {
      setError("Date must be before today");
      return false;
    }
    setError("");
    return true;
  };

  return { value, error, handleChange, validate, showError };
}
