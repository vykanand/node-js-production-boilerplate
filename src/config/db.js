const mongoose  = require('mongoose');

require('dotenv').config()


mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.log('connected to :' +process.env.MONGODB_URL);
var connection = mongoose.connect(process.env.MONGODB_URL);


module.exports = connection;