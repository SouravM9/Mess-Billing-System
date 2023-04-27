import React, { useState, useEffect } from 'react'
import Card from './Card'

function Users() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/users')
            .then(res => res.json())
            .then(result => {
                //console.log(result);
                setData(result);
            })
    }, []);
    return (
        <div className='container'>

            <form className='container justify-content-center' style={{ width: '40%' }}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Enter User's Name</label>
                    <input type="text" className="form-control" id="username" />
                    <label htmlFor="imageurl" className="form-label">Enter Image URL</label>
                    <input type="text" className="form-control" id="imageurl" />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>

            <div className='container d-flex flex-row mb-3 flex-wrap justify-content-center'>
                {data.map(item => (

                    <Card
                        title={item.name}
                        image={item.imageUrl}
                        key={item._id}
                    />
                ))}
            </div>

        </div>
    )
}

export default Users