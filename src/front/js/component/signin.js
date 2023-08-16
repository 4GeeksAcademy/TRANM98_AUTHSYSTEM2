import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export function Signin() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Add state for error message
    const navigate = useNavigate();
    
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const result = await actions.login(email, password);
            if (typeof result === "string" && result.includes("Wrong email or password")) {
                setError("Wrong email or password");
            } else {
                navigate("/private");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred during login.");
        }
    }

    if (store.token && store.token !== "" && store.token !== undefined) {
        navigate("/private");
    }

    return (
        <div id="endPointBody">
            <form>
                <h1 className="text-center" id='loginH1'>
                    This is where you Sign In! (-:
                </h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" id="btn" onClick={handleClick}>Login</button>
            </form>
        </div>
    );
}
