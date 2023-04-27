import React from 'react'

function Home() {
    return (
        <div>
            <form className='d-flex justify-content-center'>
                <div className="p-3 d-flex">
                    <input type="date" id="date" name="date" className='m-2' style={{ width: '26rem' }} />

                    <select className="form-select m-2" aria-label="Select User" id='user'>
                        <option selected>Select User</option>
                        <option value="Sourav">Sourav</option>
                        <option value="Avishek">Avishek</option>
                        <option value="Evan">Evan</option>
                    </select>

                    <select className="form-select m-2" aria-label="Select Food" id='food'>
                        <option selected>Select Food</option>
                        <option value="Chicken Thali">Chicken Thali</option>
                        <option value="Veg Thali">Veg Thali</option>
                        <option value="Egg Thali">Egg Thali</option>
                    </select>

                </div>
                <button type="submit" className="btn btn-primary m-2" style={{ height: '50%', alignSelf: 'center' }}>Add</button>
            </form>
        </div>
    )
}

export default Home