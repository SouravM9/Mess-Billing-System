import React, { useState, useEffect } from 'react'
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function Users() {
    const [data, setData] = useState([]);
    // const [username, setUsername] = useState("");
    // const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    const refreshData = () => {
        fetch('/users')
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                setData(result);
            })
    }
    useEffect(() => {

        loadLocalData();
        refreshData();
    }, []);

    // const SubmitRecord = (event) => {
    //     event.preventDefault()

    //     fetch("/users/createUser", {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name: username,
    //             imageUrl: imageUrl
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             refreshData();
    //             setUsername("");
    //             setImageUrl("");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    const handleDelete = (id) => {
        fetch(`/users/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refreshData();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleOnEditClick = (id) => {
        localStorage.setItem("type", "user");
        localStorage.setItem("id", id);

        navigate("/edit");

    }

    const loadLocalData = () => {

        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (localStorage.getItem('jwt') !== undefined && localStorage.getItem('jwt') !== '') {
            if (user.userType === 'admin')
                setIsAdmin(true);
        }
    }

    return (
        <div className='container'>
            {/* {isAdmin ?
                <form className='container justify-content-center' style={{ width: '40%' }}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Enter User's Name</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="imageurl" className="form-label">Enter Image URL</label>
                        <input type="text" className="form-control" id="imageurl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(event) => SubmitRecord(event)}>Add</button>
                </form>
                : <div></div>} */}

            <br />
            <br />
            <br />

            <div className='container d-flex flex-row mb-3 flex-wrap justify-content-center'>
                {data.map(item => (

                    <Card
                        title={item.name}
                        image={item.imageUrl}
                        key={item._id}
                        id={item._id}
                        handleDelete={handleDelete}
                        handleOnEditClick={handleOnEditClick}
                        imageStyle={{ height: '230px', objectFit: 'cover' }}
                        disabled={isAdmin ? '' : 'disabled'}
                    />
                ))}
            </div>

        </div>
    )
}

export default Users