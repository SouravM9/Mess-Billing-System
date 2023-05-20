import React, { useState, useContext } from 'react'
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
        console.log(data);
        if (data.error) {
          console.log(data.error);
        }
        else {
          localStorage.setItem("jwt", data.token);  // Save the token locally to use in create post
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <form className='container'>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" onClick={(e) => PostData(e)}>Submit</button>
        </form>
  )
}

export default Login
