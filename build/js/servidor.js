const express = require ('express');
const nodemailer = require ('nodemailer');
const path = require('path');
const app = express();
//metodo para entender los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(require('./rutas'));
app.use(express.static(path.join(__dirname, '../../')))
app.listen(3000, ()=>{
    console.log('servidor iniciado...');
});