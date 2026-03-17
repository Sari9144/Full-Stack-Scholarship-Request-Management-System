
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll, selectPending } from "../redux/requestSlice"
import { Outlet, useNavigate } from "react-router"
import '../css/viewrequests.css'

export const ViewRequests = () => {
    const nav  = useNavigate()
    const dis  = useDispatch()
    const list = useSelector(selectPending)  // רק waiting + reject

    useEffect(() => {
        dis(fetchAll())
    }, [])

    const openDetails = (tz) => {
        nav('RequestDetails', { state: { tz } })
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ת.ז</th>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>קורס</th>
                        <th>סטטוס</th>
                    </tr>
                </thead>
                <tbody>
                    {list.length === 0
                        ? <tr><td colSpan="5">אין בקשות ממתינות</td></tr>
                        : list.map(item => (
                            <tr key={item._id} onClick={() => openDetails(item.tz)} style={{ cursor: 'pointer' }}>
                                <td>{item.tz}</td>
                                <td>{item.personal?.firstName || '—'}</td>
                                <td>{item.personal?.lastName  || '—'}</td>
                                <td>{item.course?.courseName  || '—'}</td>
                                <td>{item.status === 'waiting' ? '⏳ ממתין' : '❌ נדחה'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Outlet />
        </>
    )
}
