import 'bootstrap/dist/css/bootstrap.css';
import './Login.css'; // If you have additional custom styles
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  
  const [check, setcheck] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://10.13.9.3:3000/admin', {
        username: email,
        password: password
    })
    .then(response => {
        setcheck(true)
        console.log('Login successful:', response.data);
    })
    .catch(error => {
        setcheck(false)
        console.log('Login Failed')
    })
  };

  return (
    <div className='main'>

    <div className="container mt-5 col-lg-3 col-md-7 col-sm-7 mx-auto mt-md-5 bg-light">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
                
            <div className='done__'>

                <button className="btn btn-primary mt-3 col-12" type="submit">
                Submit
                </button>
            </div>
            <>
            {
                check == null ? "" : check ?
                <p id='status'>login successful</p>:<p id='status_'>Login Failed</p>
            }
            </>
            </form>
    </div>
      
    </div>
  );
};

export default Login;