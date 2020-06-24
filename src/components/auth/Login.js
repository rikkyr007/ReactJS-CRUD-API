import React, {
    useState, useEffect
} from 'react';
import authService from "../../services/AuthService";

const Login = () => {
    const LoginState = {
        email: "",
        password: ""
    }
    const [login, setLogin] = useState(LoginState)

    const handleInputChange = event => {
        const {
            name,
            value
        } = event.target;
        setLogin({
            ...login,
            [name]: value
        });
    }

    const authLogin = () => {
        var data = {
            email: login.email,
            password: login.password
        }

        authService.login(data)
            .then(response => {
                setLogin({
                    email: data.email,
                    password: data.password
                })
            });
    }

    return (
        <div className="container-fluid">
            <div className="container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={handleInputChange}></input>
                </div>
                <button className="btn btn-primary" onClick={authLogin}>
                    Sign in
                </button>
            </div>
        </div>
    )
}
export default Login;