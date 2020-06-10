const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const kurirRoutes = require('./api/routes/kurir');
const kotaRoutes = require('./api/routes/kota');
const cekresiRoutes = require('./api/routes/cekresi');
const cekongkirRoutes = require('./api/routes/cekongkir');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/kurir', kurirRoutes);
app.use('/kota', kotaRoutes);
app.use('/cekresi', cekresiRoutes);
app.use('/cekongkir', cekongkirRoutes);

app.use((req,res,next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;