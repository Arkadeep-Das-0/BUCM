const mongoose = require('mongoose');
const DB= process.env.DATABASE

mongoose.connect('mongodb+srv://Arka:2196@cluster0.hleopgb.mongodb.net/BUCM?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
  