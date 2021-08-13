const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth'

        //Conectar base de datos
        this.connectarDB();

        //Middelwares
        this.middelwares();

        //Rutas de mi aplicación
        this.routes();

    }

    async connectarDB(){
        
        await dbConnection();

    }

    middelwares(){

        //CORS
        this.app.use( cors() );
        
        //Parseo y lectura del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );

    }

    routes(){

        this.app.use( this.authPath, require('../routes/auth') );
        
        //esto se encarga de enlazar routes con la app
        this.app.use( this.usuariosPath, require('../routes/usuarios')); 
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Sever corriendo en puerto ', this.port )
        });
    }

}

module.exports = Server;