import React from 'react'


function Card(props) {
    return (
        <div className="card m-3" style={{ width: '13rem' }}>
            <img src={props.image} className="card-img-top" alt="alt" style={{ width: 'auto', height: '230px' }} />
            <div className="card-body">
                <h5 className="card-title text-center">{props.title}</h5>
                <p className="card-text text-center">{props.desc}</p>
                <button type="button" className="btn btn-primary" onClick={(e) => { props.handleOnEditClick(props.id) }}>Edit</button>
                <button type="button" className="btn btn-danger m-2" style={{ right: '0px' }} onClick={() => props.handleDelete(props.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Card