import React, { useState } from 'react';

function EditUser(props) {
    const [username, setUsername] = useState(props.name);
    const [imageUrl, setImageUrl] = useState(props.imageUrl);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`/users/update/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                imageUrl: imageUrl
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // props.onEdit();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.9 }}>
            <div className="container bg-light rounded-3 p-3 position-relative" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                <h2>Edit User</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">Image URL</label>
                        <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(event) => handleSubmit(event)} >Save</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={props.onCancel} >Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;
