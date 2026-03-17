import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import '../css/froms.css';
import { useIsraeliIdValidator, useTextValidator } from "../useTextValidator";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { login } from "../redux/userSlice";

export const Login = () => {
    const dis = useDispatch();
    const nav = useNavigate();

    const owner    = useIsraeliIdValidator("");
    const password = useTextValidator("", /.+/, "Password cannot be empty");

    useEffect(() => {
        owner.handleChange("");
        password.handleChange("");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!owner.error && !password.error) {
            try {
                await dis(login({ owner: owner.value, password: password.value })).unwrap();
                Swal.fire({ title: 'The login successfly!', text: 'your .. seccessfly.', icon: 'success', timer: 2000, showConfirmButton: false });
              
                
                nav('/Home');
            } catch {
                Swal.fire({ title: 'Your not in the ...', text: 'plice register!', icon: 'error', timer: 2000, showConfirmButton: false });
                nav('/Register');
            }
        } else {
            Swal.fire({ title: 'The details not invalide ...', text: 'plice insert valide!', icon: 'error', timer: 2000, showConfirmButton: false });
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>

                <label htmlFor="owner" className="login-label">owner</label>
                <input id="owner" type="text" placeholder="Enter owner" className="login-input"
                    value={owner.value}
                    onChange={(e) => owner.handleChange(e.target.value)}
                    onBlur={() => owner.validate()}
                />
                <p className="error">{owner.error}</p>

                <label htmlFor="password" className="login-label">Password</label>
                <input id="password" type="password" placeholder="Enter password" className="login-input"
                    value={password.value}
                    onChange={(e) => password.handleChange(e.target.value)}
                />
                <p className="error">{password.error}</p>

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};
