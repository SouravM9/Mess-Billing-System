import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const PostData = (e) => {
    e.preventDefault();

    fetch("/forgotpassword", {
      method: "put",
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
        alert(data.message);
        navigate("/login");
      })
      .catch(err => alert(err));

  }
  return (
    <div className='container justify-content-center' id='all_forms'>

      <br />
      <br />
      <br />

      <h2 className='my-3'>Forgot Password</h2>
      <form className='container'>
        <div className="form-group my-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group my-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary my-3" onClick={(e) => PostData(e)}>Submit</button>

      </form>
    </div>
  )
}

export default ForgotPassword
