const express = require('express');

const router = express.Router(); // creo instancia de un enrutador,

/* GET home page. */
router.get('/', (req, res) => {
  // render(callback) manda a llamar-renderizar al temple engine (generar y entregar )
  // la vista al
  // calculando
  const emojieDataset = ['💻', '🔍', '🍕', '🐶', '🤨', '😎', '😍'];
  const emojie =
    emojieDataset[Math.floor(Math.random() * emojieDataset.length)];
  res.render('index', {
    title: 'Express',
    author: '🙍‍♂️Javier Pulido',
    emojie,
  });
});

module.exports = router;
