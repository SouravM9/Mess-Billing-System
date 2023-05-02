import React, { useState } from 'react'
import EditUser from './EditUser';

function Card(props) {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    return (
        <div className="card m-3" style={{ width: '13rem' }}>
            <img src={props.image} className="card-img-top" alt="alt" />
            <div className="card-body">
                <h5 className="card-title text-center">{props.title}</h5>
                <p className="card-text text-center">{props.desc}</p>
                <button type="button" className="btn btn-danger" onClick={() => props.handleDelete(props.id)}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                {showEditModal && (
                    <EditUser
                        id={props.id}
                        name={props.title}
                        imageUrl={props.image}
                        onCancel={() => setShowEditModal(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default Card