const express = require ('express');
const nodemailer = require ('nodemailer');

const PORT = 3000;
const app = express();

app.post('/mail',(req,rest)=>{

});

//inicializamos el servidor
app.listen(PORT, ()=> console.log(`Aplicación lista en el puerto ${PORT}`));