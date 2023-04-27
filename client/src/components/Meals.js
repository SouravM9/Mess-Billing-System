import React, { useState, useEffect } from 'react'

function Meals() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/meals')
            .then(res => res.json())
            .then(result => {
                setData(result);
            })
    }, []);

    return (
        <div className='container'>

            <form className='d-flex flex-row justify-content-center'>
                <div className="p-3">
                    <label htmlFor="fromdate" className='m-2'>From Date</label>
                    <input type="date" id="fromdate" name="fromdate" className='m-2' />
                    <label htmlFor="todate" className='m-2'>To Date</label>
                    <input type="date" id="todate" name="todate" className='m-2' />

                    <select className="form-select m-2" aria-label="Select USer" id='user'>
                        <option defaultValue>Select User</option>
                        <option value="Sourav">Sourav</option>
                        <option value="Avishek">Avishek</option>
                        <option value="Evan">Evan</option>
                    </select>

                </div>
                <button type="submit" className="btn btn-primary m-2">Generate</button>
            </form>

            <table className="table table-hover m-3" style={{ width: '60%', position: 'relative', left: '20%' }}>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Food</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item._id}>
                            <th scope="row">{new Date(item.date).toDateString()}</th>
                            <td>{item.food.itemName}</td>
                            <td>{item.food.itemPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="card" style={{ width: '20%', position: 'relative', left: '60%' }}>
                <div className="card-header">
                    Total
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">100</li>
                </ul>
            </div>
        </div>
    )
}

export default Meals