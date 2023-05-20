const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connecting  to MongoDB Atlas
const uri = process.env.ATLAS_URI;
// const uri = process.env.ATLAS_PROD_URI;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to Mongo");
});

mongoose.connection.on('error', (err) => {
    console.log("Error", err);
})

const userRouter = require('./routes/user');
app.use('/users', userRouter);

const authRouter = require('./routes/auth');
app.use('/', authRouter);

const foodRouter = require('./routes/food');
app.use('/foods', foodRouter);

const mealRouter = require('./routes/meal');
app.use('/meals', mealRouter);

// Production condition

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});