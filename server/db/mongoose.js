//Handle connection logic to mongodb

const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //Use js promise instead of Bluebird

mongoose.connect('mongodb://localhost:27017/TaskManager', {useNewUrlParser: true}).then(() => {
   console.log("Connected to MongoDB successfully");
}).catch((e) => {
   console.log("Error while connecting");
   console.log(e);
});

//Deprecation warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
   mongoose
};