import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState(undefined);
    const navigate = useNavigate();

    const PostData = (e) => {

        e.preventDefault();

        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password,
                imageUrl: url
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                }
                else {
                    alert(data.message);
                    navigate('/login');
                }
            })
            .catch(err => {
                alert(err);
            });
    }
    return (
        <div className='container justify-content-center' id='all_forms'>

            <br />
            <br />
            <br />

            <h2 className='my-3'>Register</h2>
            <form>
                <div className="form-group my-3">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group my-3">
                    <label>Image Url</label>
                    <input type="text" className="form-control" placeholder="Enter Image URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="form-group my-3">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary my-3" onClick={(e) => PostData(e)}>Sign Up</button>
                <Link to='/login'><h6>Already have an account?</h6></Link>
            </form>
        </div>
    )
}

export default Register
