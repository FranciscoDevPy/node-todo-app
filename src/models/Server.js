const express               = require('express');
const cors                  = require('cors');
const fs                    = require('fs');
const { createServer: crearServidorHttps } = require('https');
const { createServer: crearServidorHttp }  = require('http');

class Server
{
    constructor()
    {
        this.app = express();

        if( process.env.APP_USAR_HTTPS == 's' )
        {
            this.port = process.env.APP_PORT_SSL;
            this.server = crearServidorHttps({
                key: fs.readFileSync( process.env.SSL_KEY_FILE, 'utf8' ),
                cert: fs.readFileSync( process.env.SSL_CERT_FILE, 'utf8' ),
            }, this.app);
        }
        else
        {
            this.port = process.env.APP_PORT;
            this.server = crearServidorHttp(this.app);
        }

        this.origin = {
            origin: '*'
        };
        
        this.paths = {
            todo: '/api/todo',
        };

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }

    middlewares()
    {
        //cors
        this.app.use( cors(this.origin) );

        //lectura y conversión de la petición
        this.app.use(express.json());
    }

    routes()
    {
        this.app.use(this.paths.todo, require('../routes/todo.routes'));
    }

    listen()
    {
        this.server.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;