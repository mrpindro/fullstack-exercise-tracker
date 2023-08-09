require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/dbConn');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5500;

app.use(logger);

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.use('/users', require('./routes/users'));
app.use('/exercises', require('./routes/exercises'));

app.use('/*', (req, res) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ 'message': '404 Page Not Found'})
    } else if (req.accepts('txt')) {
        res.send('404 Page Not Found');
    }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    logEvents(`${err.no}: ${err.code}/t${err.syscall}/t${err.hostname}`, 'MongoErrLog.log');
})
