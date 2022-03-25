//Import dependencia path
//dependencia del core de Node
const path = require('path');

module.exports = {
    //1.Especificar el archivo de (entrada)
    entry: './client/index.js',
    //2.Especificar el archivo de (salida)
    output: {
        //2.1 Va a requerir la ruta absoluta de la salida
        path:path.resolve(__dirname,'public'),
        //2.2 Nombre del archivo de salida
        filename:'bundle.js'
    },
    //3.configurando el servidor de desarrollo
    devServer:{
        //3.1 Folder de archivos estaticos
        static: path.join(__dirname, 'public'),
        //3.2 puerto en el servidor de desarrollo 
        //de WP (Webpack)
        port: 8080,
        //3.3 Definiendo host
        host: 'localhost'
    }
}