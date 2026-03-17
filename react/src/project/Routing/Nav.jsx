
import { NavLink, useNavigate } from "react-router";
import "../css/nav.css"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Swal from "sweetalert2";

export const Nav = () => {
    const current = useSelector(x => x.users.current);
    const dis = useDispatch();
    const nav = useNavigate();

    const handleLogout = () => {
        dis(logout())  // מוחק localStorage + מנקה Redux
        Swal.fire({ title: 'התנתקת בהצלחה', icon: 'success', timer: 1500, showConfirmButton: false });
        nav('/Home');
    };

    const isAdmin  = current?.firstName === "אמא" && current?.owner === "024262453";
    const isLogged = current?.firstName && !isAdmin;

    return (
        <div className="nav-container">
            <div className="nav-links">
                <NavLink to="Home" className="link">Home</NavLink>
                {!current?.firstName && <NavLink to="Login" className="link">Login</NavLink>}
                {isLogged && <>
                    <NavLink to="SendRequest" className="link">Send Request</NavLink>
                    <NavLink to="ViewStatus"  className="link">View Status</NavLink>
                </>}
                {isAdmin && <NavLink to="ViewRequests" className="link">View Requests</NavLink>}
            </div>
            <div className="nav-greeting">
                {current?.firstName ? (
                    <>
                        <p>שלום, {current.firstName}!</p>
                        <button className="logout-btn" onClick={handleLogout}>התנתק</button>
                    </>
                ) : (
                    <p>שלום אורח</p>
                )}
            </div>
        </div>
    );
};
