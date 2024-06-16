import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"

const LoginPage = () => {
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/about');
    }
    catch(e){
      setError(e.message);
    }
    
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
              {error && <div className="my-3">{error}</div>}
              <div className="my-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value = {email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" onClick={login}>
                  Login
                </button>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
