const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");
router.post("/correo",async (req, res) => {
  // console.log(req.body);
  //hacemos destructuring de req.body
  const { nombre, correo, telefono, mensaje } = req.body;

  contentHTML = `
        <h1>Información del cliente</h1>
        <ul>
            <li>Nombre: ${nombre}</li>
            <li>Correo: ${correo}</li>
            <li>Telefono ${telefono}</li>
        </ul>
        <p>${mensaje}</p>
    `;

 const transporter =  nodemailer.createTransport({
    host: "mx60.hostgator.mx",
    port: 465,
    secure:true,
    auth: {
      user: "azael@guardianesdelgolfo.com.mx",
      pass: "conker123",
    },
  });
 const info = await transporter.sendMail({
      from:'Desde contacto',
      to:'guardianes@guardianes.com',
      subject:'Servidor de correo  Guardianes del Golfo',
      html: contentHTML

  });
//   console.log(contentHTML);
console.log('Mensaje enviado',info.messageId);

  res.send("recibido");
});

module.exports = router;
