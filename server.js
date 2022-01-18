const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes') 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extenede: true }));
app.use(express.static('public'));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mongo queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected to localhost:${PORT}`))