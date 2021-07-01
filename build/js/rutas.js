const {Router} = require('express');
const router = Router();
router.post('/enviar-correo',(req, res)=>{
    console.log(req.body);
    res.send('recibido');
})

module.exports = router;