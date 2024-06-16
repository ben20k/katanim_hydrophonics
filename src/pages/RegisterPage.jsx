import { React, useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const register = async () => {
        try {
            if (password !== confirmPassword) {
                setError('password and confirm password do no match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password)
            navigate('/about');

        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        {error && <div className="my-3">{error}</div>}
                        <div className="form my-3">
                            <label htmlFor="Email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="Email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form  my-3">
                            <label htmlFor="Password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="Password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="form  my-3">
                            <label htmlFor="ConfirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="ConfirmPassword"
                                placeholder="Confirm Password"
                                onChange={e => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>
                        <div className="my-3">
                            <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login here</Link> </p>
                        </div>
                        <div className="text-center">
                            <button className="my-2 mx-auto btn btn-dark" onClick={register}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RegisterPage