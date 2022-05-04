// Importar Express
const express = require('express');
// Importamos el enrutador de express
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // render manda a renderizar (generar y entregar)
  // la vista al cliente

  res.render(
    'about',
    // Este es el View-Model
    {
      name: 'Javier Pulido',
      email: 'javierp.pulido@gmail.com',
      url: 'www.JavierPulido.com',
    }
  );
});

module.exports = router;
