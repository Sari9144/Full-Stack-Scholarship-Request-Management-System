
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchAll, selectPending } from "../redux/requestSlice"
// import { Outlet, useNavigate } from "react-router"
// import '../css/viewrequests.css'

// export const ViewRequests = () => {
//     const nav  = useNavigate()
//     const dis  = useDispatch()
//     const list = useSelector(selectPending)  // רק waiting + reject

//     useEffect(() => {
//         dis(fetchAll())
//     }, [])

//     const openDetails = (tz) => {
//         nav('RequestDetails', { state: { tz } })
//     }

//     return (
//         <>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ת.ז</th>
//                         <th>שם פרטי</th>
//                         <th>שם משפחה</th>
//                         <th>קורס</th>
//                         <th>סטטוס</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {list.length === 0
//                         ? <tr><td colSpan="5">אין בקשות ממתינות</td></tr>
//                         : list.map(item => (
//                             <tr key={item._id} onClick={() => openDetails(item.tz)} style={{ cursor: 'pointer' }}>
//                                 <td>{item.tz}</td>
//                                 <td>{item.personal?.firstName || '—'}</td>
//                                 <td>{item.personal?.lastName  || '—'}</td>
//                                 <td>{item.course?.courseName  || '—'}</td>
//                                 <td>{item.status === 'waiting' ? '⏳ ממתין' : '❌ נדחה'}</td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//             <Outlet />
//         </>
//     )
// }

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAll, selectFilteredRequests, selectFilters, setFilter, resetFilters } from "../redux/requestSlice"
import { Outlet, useNavigate } from "react-router"
import '../css/viewrequests.css'

export const ViewRequests = () => {
    const nav  = useNavigate()
    const dis  = useDispatch()
    const list = useSelector(selectFilteredRequests)
    const filters = useSelector(selectFilters)

    useEffect(() => {
        dis(fetchAll())
    }, [])

    const openDetails = (tz) => {
        nav('RequestDetails', { state: { tz } })
    }

    const updateFilter = (key, value) => dis(setFilter({ key, value }))

    return (
        <>
            <div className="filters-bar">
                <div className="filter-group">
                    <label>סטטוס</label>
                    <select className="form-input" value={filters.status} onChange={(e) => updateFilter('status', e.target.value)}>
                        <option value="all">הכל</option>
                        <option value="waiting">⏳ ממתין</option>
                        <option value="reject">❌ נדחה</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>תאריך הגשה מ-</label>
                    <input type="date" className="form-input" value={filters.dateFrom} onChange={(e) => updateFilter('dateFrom', e.target.value)} />
                </div>
                <div className="filter-group">
                    <label>עד</label>
                    <input type="date" className="form-input" value={filters.dateTo} onChange={(e) => updateFilter('dateTo', e.target.value)} />
                </div>
                <div className="filter-group">
                    <label>שם / ת.ז</label>
                    <input type="text" className="form-input" placeholder="חיפוש לפי שם או ת.ז" value={filters.name} onChange={(e) => updateFilter('name', e.target.value)} />
                </div>
                <button type="button" className="filters-clear" onClick={() => dis(resetFilters())}>נקה סינון</button>
            </div>

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
                        ? <tr><td colSpan="5">אין בקשות התואמות לסינון</td></tr>
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

