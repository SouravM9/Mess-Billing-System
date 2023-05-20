import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate(); //useHistory is no longer available
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState(undefined);

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
                    console.log(data.error);
                }
                else {
                    console.log(data.message);
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
                <label>Image Url</label>
                <input type="text" className="form-control" placeholder="Enter Image URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" onClick={(e) => PostData(e)}>Submit</button>
        </form>
    )
}

export default Register
