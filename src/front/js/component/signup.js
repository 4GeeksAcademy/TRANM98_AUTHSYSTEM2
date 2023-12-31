import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export function Signup() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const signUpSuccess = actions.signup(email, password);
        if (signUpSuccess) {
            const loginSuccess = actions.login(email, password);
            if (loginSuccess) {
                navigate("/private");
            } else {
                alert("Failed to log in. Please check your credentials and try again.");
            }
        } else {
            alert("Failed to create user. Please check your input and try again.");
        }
    }

    if (store.token && store.token !== "" && store.token !== undefined) {
        navigate("/private");
    }

    return (
        <div id="endPointBody">
            {(store.token && store.token !== "" && store.token !== undefined) ?
                ("You are logged in with this token" + store.token) : (
                <form>
                    <h1 className="text-center" id='loginH1'>
                        And this is where you sign up! :-)
                    </h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address: </label>
                        <input
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn" id="btn" type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            )}
        </div>
    )
}

export default Signup;