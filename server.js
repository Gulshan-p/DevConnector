const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();
var path = require('path');
//passport config
app.use(passport.initialize());
require('./config/passport')(passport)
//body-parser-config using express
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//db config
const db = keys.mongoURI;
mongoose
 .connect(db)
   .then(() => console.log('Mongodb connected'))
   .catch((err) => console.log('err'));
//first route
//app.get('/', (req,res) => res.send('welcome'));
//defining own routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
//initialize port no.
if(process.env.NODE_ENV === 'production'){
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
}
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
