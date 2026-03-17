import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import '../css/froms.css';
import { useIsraeliIdValidator, useTextValidator } from "../useTextValidator";
import Swal from "sweetalert2";
import { register } from "../redux/userSlice";

export const Register = () => {
    const dis = useDispatch();
    const nav = useNavigate();

    const owner     = useIsraeliIdValidator("");
    const firstName = useTextValidator("", /[A-Za-z_א-ת]$/, "Invalid first name");
    const lastName  = useTextValidator("", /[A-Za-z_א-ת]$/, "Invalid last name");
    const password  = useTextValidator("", /.+/, "Password cannot be empty");

    useEffect(() => {
        owner.handleChange("");
        firstName.handleChange("");
        lastName.handleChange("");
        password.handleChange("");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dis(register({ owner: owner.value, firstName: firstName.value, lastName: lastName.value, password: password.value })).unwrap();
            Swal.fire({ title: 'The register successfly!', text: 'The request was successfully received.', icon: 'success', timer: 2000, showConfirmButton: false });
            nav('/Home');
        } catch {
            Swal.fire({ title: 'The details not invalide ...', text: 'plice insert valide!', icon: 'error', timer: 2000, showConfirmButton: false });
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Register</h2>

                <label htmlFor="owner" className="login-label">owner</label>
                <input id="owner" type="text" placeholder="Enter your owner" className="login-input"
                    value={owner.value}
                    onChange={(e) => owner.handleChange(e.target.value)}
                    onBlur={() => owner.validate()}
                />
                <p className="error">{owner.error}</p>

                <label htmlFor="firstname" className="login-label">First Name</label>
                <input id="firstname" type="text" placeholder="Enter your first name" className="login-input"
                    value={firstName.value}
                    onChange={(e) => firstName.handleChange(e.target.value)}
                />
                <p className="error">{firstName.error}</p>

                <label htmlFor="lastname" className="login-label">Last Name</label>
                <input id="lastname" type="text" placeholder="Enter your last name" className="login-input"
                    value={lastName.value}
                    onChange={(e) => lastName.handleChange(e.target.value)}
                />
                <p className="error">{lastName.error}</p>

                <label htmlFor="password" className="login-label">Password</label>
                <input id="password" type="password" placeholder="Enter your password" className="login-input"
                    value={password.value}
                    onChange={(e) => password.handleChange(e.target.value)}
                />
                <p className="error">{password.error}</p>

                <button type="submit" className="login-button">Register</button>
            </form>
        </div>
    );
};
