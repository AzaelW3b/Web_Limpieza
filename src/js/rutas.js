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
    host: "smtp.mailtrap.io",
    port: 2525,
    secure:false,
    auth: {
      user: "b7a9586b718508",
      pass: "f9f033814b0569",
    },
  });
 const info = await transporter.sendMail({
      from:'Desde contacto',
      to:'guardianes@guardianes.com',
      subject:'Servidor de pruebas Guardianes del Golfo',
      html: contentHTML

  });
//   console.log(contentHTML);
console.log('Mensaje enviado',info.messageId);

  res.send("recibido");
});

module.exports = router;
