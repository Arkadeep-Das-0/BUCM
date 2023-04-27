// This is Basically app.js

const dotenv = require ('dotenv');
const mongoose = require('mongoose');
const express = require('express');
mongoose.set('strictQuery', true);
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const Club = require('./Models/club');

//const config = require('./config');

process.env.SECRET_KEY = '112233';
dotenv.config({path:'./config.env'});
require ('./Database/conn');


//const User_= require('./model/userSchema');

const app = express();
//const PORT = 3000;
const PORT = process.env.PORT;

//const DB = 'mongodb+srv://Arka:2196@cluster0.hleopgb.mongodb.net/BUCM?retryWrites=true&w=majority';
const DB= process.env.DATABASE;

app.use(express.json());

//To make routes easy
app.use(require('./routes/auth'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.use('/auth', authRoutes);




//Club Routes
app.get('/clubs', (req, res) => {
  Club.find((err, clubs) => {
    if (err) {
      console.log(err);
    } else {
      res.json(clubs);
    }
  });
});

app.post('/clubs/add', (req, res) => {
  const club = new Club(req.body);

  club.save()
    .then(club => {
      res.status(200).json({ 'club': 'club added successfully' });
    })
    .catch(err => {
      res.status(400).send('adding new club failed');
    });
});

app.delete('/clubs/:id', (req, res) => {
  Club.findByIdAndRemove(req.params.id, (err, club) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ 'club': 'club deleted successfully' });
    }
  });
});

app.put('/clubs/:id', (req, res) => {
  Club.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, club) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ 'club': 'club updated successfully' });
    }
  });
});

//Post Route
const postsRouter = require('./routes/posts');

app.use('/posts', postsRouter);

//club activity Route
const clubActivitiesRouter = require('./routes/club_activity');
app.use('/club_activity', clubActivitiesRouter);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
