import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const PostData = (e) => {
    e.preventDefault();

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        name: name
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
        }
        else {
          localStorage.setItem("jwt", data.token);  // Save the token locally to use in create post
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Login Successful");
          navigate("/");
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className='container justify-content-center' id='all_forms'>

      <br />
      <br />
      <br />

      <h2 className='my-3'>Login</h2>
      <form className='container'>
        <div className="form-group my-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group my-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary my-3" onClick={(e) => PostData(e)}>Login</button>
        <Link to='/forgotpassword'><h6>Forgot Password?</h6></Link>
        <Link to='/register'><h6>Don't have an account?</h6></Link>
      </form>
    </div>
  )
}

export default Login
