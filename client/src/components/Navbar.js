import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const [buttonTxt, setButtonTxt] = useState("Login");
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');

    const clickAction = () => {

        if (buttonTxt === "Logout") {
            setButtonTxt("Login");
            localStorage.setItem("jwt", "");  // Save the token locally to use in create post
            localStorage.setItem("user", "");
            navigate('/login');
        }
        else if (buttonTxt === "Login")
            navigate('/login');


    }
    useEffect(() => {

        if (localStorage.getItem('jwt') !== undefined && localStorage.getItem('jwt') !== '') {
            setButtonTxt('Logout');
            const user = JSON.parse(localStorage.getItem('user'));
            setImageUrl(user.imageUrl);
            setName(user.name);
        }

    }, [])

    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <h2 className="navbar-brand text-dark" to="/">Mess Billing System</h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                            </li>

                            {buttonTxt === "Logout" ?
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/meals">Meals</Link>
                                </li>
                                : <></>}

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/users">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/foods">Foods</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/menu">Menu Card</Link>
                            </li>

                        </ul>
                        {buttonTxt === "Logout" ? <>
                            <img src={imageUrl} alt={name} style={{ borderRadius: '50%', width: '35px', height: '35px' }} className='mx-2' />
                            <h6 className='mx-2'>Hello, {name}</h6>
                        </> :
                            <></>}

                        <button className='btn btn-success my-2 my-sm-0' onClick={clickAction}>{buttonTxt}</button>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar