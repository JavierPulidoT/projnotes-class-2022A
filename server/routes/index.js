var express = require('express');
var router = express.Router();//creo instancia de un enrutador,

/* GET home page. */
router.get('/', function(req, res, next) { 
  //render(callback) manda a llamar-renderizar al temple engine (generar y entregar )
  //la vista al 
  //calculando
  let emojieDataset = ['💻','🔍','🍕','🐶','🤨','😎','😍'];
  let emojie = emojieDataset[Math.floor(Math.random() *
  emojieDataset.length)];
  res.render('index', { 
    title: 'Express',
    author:'🙍‍♂️Javier Pulido',
    emojie
   });
});

module.exports = router;
