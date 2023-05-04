import React from 'react'

function Card(props) {
    return (
        <div className="card m-3" style={{ width: '13rem' }}>
            <img src={props.image} className="card-img-top" alt="alt" style={props.imageStyle} />
            <div className="card-body">
                <h5 className="card-title text-center mb-3">{props.title}</h5>
                <p className="card-text text-center mb-4">{props.desc}</p>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary me-2" onClick={(e) => { props.handleOnEditClick(props.id) }}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => props.handleDelete(props.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Card
