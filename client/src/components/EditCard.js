import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function EditCard() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const getData = (id) => {
        if (localStorage.getItem("type") === "user") {
            fetch(`/users/${id}`)
                .then(res => res.json())
                .then(result => {
                    setName(result.name);
                    setImageUrl(result.imageUrl);
                })
        }
    }

    useEffect(() => {
        getData(localStorage.getItem("id"));
    }, [])

    const SubmitRecord = (event) => {
        event.preventDefault();
        if (localStorage.getItem("type") === "user") {
            fetch("/users/update/" + localStorage.getItem("id"), {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    imageUrl: imageUrl
                })
            })
                .then(res => navigate("/users"))
                .catch(err => {
                    console.log(err);
                });
        }

    }
    return (
        <div>
            <form className='container justify-content-center' style={{ width: '40%' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter {localStorage.getItem("type")} Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />

                    {
                        localStorage.getItem("type") === "Food" ?
                            <div>
                                <label htmlFor="foodprice" className="form-label">Enter Price</label>
                                <input type="text" className="form-control" id="foodprice" value={desc} onChange={(e) => setDesc(e.target.value)} />
                            </div>
                            : <div></div>
                    }
                    <label htmlFor="imageurl" className="form-label">Enter Image URL</label>
                    <input type="text" className="form-control" id="imageurl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => SubmitRecord(event)} >Update</button>
            </form>
        </div>
    )
}

export default EditCard