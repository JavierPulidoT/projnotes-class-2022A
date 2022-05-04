/* eslint-disable no-console */

// Incorporando estilos
// a mi bundle
import './styles/style.css';
import './styles/mystyle.css';

console.log('🎁 Fron-End Working!!!');

// default parameters ES6/2015
const show = (m = '😋') => {
  console.log(m);
};
show();

// Asincronia...
// Promises
function resolveAfter2Seconds() {
  // mostrara un string
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('funtion resolve');
    }, 2000); // 2segundos
  });
}

async function asyncCall() {
  // invoca una funcion asincrona,
  console.log('Calling async funtion!!!');
  const result = await resolveAfter2Seconds(); // await invoca promise como si fuera sincrono
  console.log(result); // Imprime "funtion resolve" en la consola
}
asyncCall();
