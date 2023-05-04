import React, { useState, useEffect } from 'react'

function Meals() {

    const [data, setData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [toDate, setToDate] = useState(Date.now());
    const [fromDate, setFromDate] = useState(Date.now());
    const [currentUser, setCurrentUser] = useState('');
    const [total, setTotal] = useState(0);

    const fetchUsers = () => {
        fetch('/users')
            .then(res => res.json())
            .then(result => {
                setUsersData(result);
            })
    }

    // const refreshData = () => {
    //     fetch('/meals')
    //         .then(res => res.json())
    //         .then(result => {
    //             setData(result);
    //         })
    // }

    useEffect(() => {
        fetchUsers();
        // refreshData();
    }, []);

    const generateData = (event) => {
        event.preventDefault();

        const toDateISO = new Date(toDate).toISOString();
        const fromDateISO = new Date(fromDate).toISOString();

        fetch(`/meals/${fromDateISO}/${toDateISO}/${currentUser}`)
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                setData(result);
            })

        getTotal(fromDateISO, toDateISO);
    }

    const getTotal = (fromDateISO, toDateISO) => {
        fetch(`/meals/calculate/${fromDateISO}/${toDateISO}/${currentUser}`)
            .then(res => res.json())
            .then(result => {
                // console.log(result[0].totalCost);
                setTotal(result[0].totalCost);
            })
    }

    const handleDelete = (event, id) => {
        fetch(`/meals/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                generateData(event);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='container'>

            <form className='d-flex flex-row justify-content-center'>
                <div className="p-3">
                    <label htmlFor="fromdate" className='m-2' >From Date</label>
                    <input type="date" id="fromdate" name="fromdate" className='m-2' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <label htmlFor="todate" className='m-2'>To Date</label>
                    <input type="date" id="todate" name="todate" className='m-2' value={toDate} onChange={(e) => setToDate(e.target.value)} />

                    <select className="form-select m-2" aria-label="Select USer" id='user' onChange={(e) => setCurrentUser(e.target.value)}>
                        <option defaultValue>Select User</option>
                        {usersData.map(item => (
                            <option value={item._id} key={item._id}>{item.name}</option>
                        ))}
                    </select>

                </div>
                <button type="submit" className="btn btn-primary m-2" onClick={(event) => generateData(event)} >Generate</button>
            </form>

            {data.length > 0 ? <div>
                <table className="table table-hover m-3" style={{ width: '60%', position: 'relative', left: '20%' }}>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Food</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item._id}>
                                <th scope="row">{new Date(item.date).toDateString()}</th>
                                <td>{item.food.itemName}</td>
                                <td>{item.cost}</td>
                                <td><button className='btn btn-success'>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={(e) => { handleDelete(e, item._id) }}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="card" style={{ width: '20%', position: 'relative', left: '60%' }}>
                    <div className="card-header">
                        Total
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{total}</li>
                    </ul>
                </div>

            </div> : <div></div>}
        </div>
    )
}

export default Meals