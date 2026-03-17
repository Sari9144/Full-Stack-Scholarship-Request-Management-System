
import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' }
});

// שולח token אוטומטית בכל בקשה
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        switch (status) {
            case 401: console.warn('Unauthorized'); break;
            case 403: Swal.fire({ title: 'אין הרשאה', icon: 'error', confirmButtonText: 'הבנתי' }); break;
            case 500: Swal.fire({ title: 'שגיאת שרת', icon: 'error', confirmButtonText: 'סגור' }); break;
            default: if (!error.response) Swal.fire({ title: 'בעיית חיבור', icon: 'warning', confirmButtonText: 'נסה שוב' });
        }
        return Promise.reject(error);
    }
);

export default api;
