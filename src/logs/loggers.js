//Para más información, buscar la página web npm el paquete winston
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

const formato = printf(({ timestamp, level, message, stack }) => {

    let errores = [];
    if( stack )//pila de errores
    {
        const stackList = stack.split('\n');
        errores = [{
            error1: ( stackList[1] ) ? stackList[1].trim() : '',
            error2: ( stackList[2] ) ? stackList[2].trim() : '',
            error3: ( stackList[3] ) ? stackList[3].trim() : ''
        }]
    }
    
    const errorFormat = {
        fecha: timestamp,
        nivel: level,
        mensaje: message,
        stack: errores
    }
    return JSON.stringify(errorFormat);
});

//Es importante mencionar que cuando se alcance el total de archivos definidos en maxFiles,
//se eliminará el primer archivo creado para así mantener siempre solo 10 archivos logs creados.
const logger = createLogger({

    format: combine(
        timestamp(),
        formato,
        format.errors({stack: true})
    ),

    transports:[
        new transports.File({
            maxsize: 5000000,//byte: 5mb
            maxFiles: 10,//cantidad de archivos a guardar, cada que se alcance 5mb
            filename: path.join(__dirname, '/fileslogs/logs.log')
        }),
    ]

});

module.exports = logger;