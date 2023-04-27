import React, { useState, useEffect } from 'react'
import Card from './Card'

function Foods() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/foods')
          .then(res => res.json())
          .then(result => {
            //console.log(result);
            setData(result);
          })
      }, []);
    
    return (
        <div>
            <form className='container justify-content-center' style={{width : '40%'}}>
                <div className="mb-3">
                    <label htmlFor="foodname" className="form-label">Enter Food Name</label>
                    <input type="text" className="form-control" id="foodname" />
                    <label htmlFor="foodprice" className="form-label">Enter Price</label>
                    <input type="text" className="form-control" id="foodprice" />
                    <label htmlFor="imageurl" className="form-label">Enter Image URL</label>
                    <input type="text" className="form-control" id="imageurl" />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>

            <div className='container d-flex flex-row justify-content-center flex-wrap mb-3'>
                {data.map(item => (

                    <Card
                        title={item.itemName}
                        image={item.imageUrl}
                        desc={item.itemPrice}
                        key={item._id}
                    />
                ))}
            </div>

        </div>
    )
}

export default Foods