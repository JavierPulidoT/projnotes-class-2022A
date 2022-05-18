/* eslint-disable no-console */
/* global M */

// Incorporando estilos
// a mi bundle
import './styles/mystyle.css';

/* Inicializando elementos de Materializecss */
document.addEventListener('DOMContentLoaded', () => {
  // Obteniendo la referencia a la barra de navegacion lateral
  const sideNavs = document.querySelectorAll('.sidenav');
  // M...objeto que me da materialize
  M.Sidenav.init(sideNavs);
});
