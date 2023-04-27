import React from 'react'

function Card(props) {
    return (
        <div className="card m-3" style={{width: '13rem'}}>
            <img src={props.image} className="card-img-top" alt="alt" />
                <div className="card-body">
                    <h5 className="card-title text-center">{props.title}</h5>
                    <p className="card-text text-center">{props.desc}</p>
                </div>
        </div>
    )
}

export default Card