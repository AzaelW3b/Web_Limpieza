// const { Router } = require("express");
// const router = Router();
// const nodemailer = require("nodemailer");
// router.post("/correo",async (req, res) => {
//   // console.log(req.body);
//   //hacemos destructuring de req.body
//   const { nombre, correo, telefono, mensaje } = req.body;

//   contentHTML = `
//         <h1>Información del cliente</h1>
//         <ul>
//             <li>Nombre: ${nombre}</li>
//             <li>Correo: ${correo}</li>
//             <li>Telefono ${telefono}</li>
//         </ul>
//         <p>${mensaje}</p>
//     `;

//  const transporter =  nodemailer.createTransport({
//     host: "smtp.hostinger.com",
//     port:  465,
//     secure:true,
//     auth: {
//       user: "azael@guardianesdelgolfo.com.mx",
//       pass: "Conker123",
//     }
//   });
//  const info = await transporter.sendMail({
//       from:"Servidor de correo <azael@guardianesdelgolfo.com.mx>",
//       to:'ventas@guardianesdelgolfo.com.mx, direccion@guardianesdelgolfo.com.mx ',
//       subject:'Servidor de correo  Guardianes del Golfo',
//       html: contentHTML

//   });
// //   console.log(contentHTML);
// console.log('Mensaje enviado',info.messageId);

//   res.redirect('back');
// });

// module.exports = router;
