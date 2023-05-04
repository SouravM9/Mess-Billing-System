import React, { useState, useEffect } from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom';

function Foods() {
    const [data, setData] = useState([]);
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const refreshData = () => {
        fetch('/foods')
            .then(res => res.json())
            .then(result => {
                //console.log(result);
                setData(result);
            })
    }

    useEffect(() => {
        refreshData();
    }, []);

    const SubmitRecord = (event) => {
        event.preventDefault()

        fetch("/foods/createFood", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemName: foodName,
                itemPrice: foodPrice,
                imageUrl: imageUrl
            })
        })
            .then(res => res.json())
            .then(data => {
                refreshData();
                setFoodName("");
                setImageUrl("");
                setFoodPrice(0);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleDelete = (id) => {
        fetch(`/foods/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refreshData();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleOnEditClick = (id) => {
        localStorage.setItem("type", "food");
        localStorage.setItem("id", id);

        navigate("/edit");

    }

    return (
        <div>
            <form className='container justify-content-center' style={{ width: '40%' }}>
                <div className="mb-3">
                    <label htmlFor="foodname" className="form-label">Enter Food Name</label>
                    <input type="text" className="form-control" id="foodname" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                    <label htmlFor="foodprice" className="form-label">Enter Price</label>
                    <input type="text" className="form-control" id="foodprice" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} />
                    <label htmlFor="imageurl" className="form-label">Enter Image URL</label>
                    <input type="text" className="form-control" id="imageurl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event) => SubmitRecord(event)} >Add</button>
            </form>

            <div className='container d-flex flex-row justify-content-center flex-wrap mb-3'>
                {data.map(item => (

                    <Card
                        title={item.itemName}
                        image={item.imageUrl}
                        desc={item.itemPrice}
                        key={item._id}
                        id={item._id}
                        handleDelete={handleDelete}
                        handleOnEditClick={handleOnEditClick}
                        imageStyle={{ height: '130px', objectFit: 'cover' }}
                    />
                ))}
            </div>

        </div>
    )
}

export default Foods