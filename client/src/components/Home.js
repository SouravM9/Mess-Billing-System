import React, { useState, useEffect } from 'react'

function Home() {

    const [data, setData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [foodsData, setFoodsData] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [selectedFood, setSelectedFood] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchUsers = () => {
        fetch('/users')
            .then(res => res.json())
            .then(result => {
                setUsersData(result);
            })
    }

    const fetchFoods = () => {
        fetch('/foods')
            .then(res => res.json())
            .then(result => {
                setFoodsData(result);
            })
    }
    const loadLocalData = () => {

        // When loaded for the first time in any browser
        if (localStorage.getItem('user') === null)
            localStorage.setItem('user', '');

        if (localStorage.getItem('jwt') === null)
            localStorage.setItem('jwt', '');

        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (localStorage.getItem('jwt') !== undefined && localStorage.getItem('jwt') !== '') {
            setisLoggedIn(true);

            if (user.userType === 'admin')
                setIsAdmin(true);
        }
    }

    useEffect(() => {

        loadLocalData();
        fetchUsers();
        fetchFoods();
        refreshData();
    }, []);

    const addMeal = (e) => {
        e.preventDefault();

        let cost = findCost(selectedFood);
        const user = localStorage.getItem('user');

        fetch("/meals/createMeal", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: selectedDate,
                food: selectedFood,
                user: isAdmin ? selectedUser : JSON.parse(user)._id,
                cost: cost
            })
        })
            .then(res => res.json())
            .then(data => {
                refreshData();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const findCost = (foodId) => {

        let cost = 0;

        foodsData.forEach(element => {

            if (element._id === foodId) {
                cost = element.itemPrice;
            }
        });
        return cost;
    }

    const refreshData = () => {
        fetch('/meals/monthwise')
            .then(res => res.json())
            .then(result => {
                setData(result);
            })
    }

    return (
        <div className='container'>
            <br />
            <br />
            <br />
            {isLoggedIn ?
                <form className='d-flex flex-row justify-content-center'>
                    <div className="p-3 d-flex flex-wrap">
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className='m-2'
                            style={{ width: '100%', maxWidth: '26rem' }}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />

                        {isAdmin && (
                            <select
                                className="form-select m-2"
                                aria-label="Select User"
                                id='user'
                                onChange={(e) => setSelectedUser(e.target.value)}
                                style={{ width: '100%', maxWidth: '26rem' }}
                            >
                                <option defaultValue>Select User</option>
                                {usersData.map(item => (
                                    <option value={item._id} key={item._id}>{item.name}</option>
                                ))}
                            </select>
                        )}

                        <select
                            className="form-select m-2"
                            aria-label="Select Food"
                            id='food'
                            onChange={(e) => setSelectedFood(e.target.value)}
                            style={{ width: '100%', maxWidth: '26rem' }}
                        >
                            <option defaultValue>Select Food</option>
                            {foodsData.map(item => (
                                <option value={item._id} key={item._id}>{item.itemName}</option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="btn btn-primary m-2"
                            style={{ width: '100%', maxWidth: '26rem' }}
                            onClick={(event) => addMeal(event)}
                        >
                            Add
                        </button>
                    </div>
                </form>

                : <div></div>
            }
            <div className='container' id='home_feed'>
                {data.map(item => (
                    <div className="card-body m-2" key={item._id} id='home_feedItems'>
                        <p className="card-text"><img src={item.user.imageUrl} alt={item.user.name} style={{ borderRadius: '50%', width: '30px', margin: '10px', height: '30px' }} />
                            <b style={{ color: '#132743' }} > {item.user.name} </b> added a
                            <img src={item.food.imageUrl} alt={item.food.itemName} style={{ borderRadius: '10%', width: '35px', margin: '10px', height: '20px' }} />
                            <b style={{ color: '#363636' }}> {item.food.itemName} </b>
                            on {new Date(item.date).toDateString()} ...</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home