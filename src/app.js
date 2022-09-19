// require('events').EventEmitter.prototype._maxListeners = 100;

const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const mysql = require('mysql');
// const myConnection = require('express-myconnection');
const fs = require('fs');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 3000;

// importing routes
const customerRoutes = require('./routes/customer');

// settings

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// middlewares
app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//     host: 'localhost',
//     user: 'root',
//     password: 'leyargoM',
//     port: 3306,
//     database: 'eventG'
// }, 'single'));

app.use(express.urlencoded({extended:false}));
app.use(session({secret: 'leyGpxConnect07', resave: false, saveUninitialized: false}));
// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

//-------------------------

// starting the server
const server = app.listen(port, () => {
    console.log(`leyargo on port ${port}`);
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

const client_dataC = fs.readFileSync('src/conexiones.json', 'utf-8');
let dbConexion = JSON.parse(client_dataC);

const client_dataD = fs.readFileSync('src/desconexiones.json', 'utf-8');
let dbDesConexion = JSON.parse(client_dataD);
var UserConnected;

io.on('connection', (socket) =>  {
    UserConnected = socket.client.conn.server.clientsCount;
    
    /* socket.on('chat:message', (data) => {
        io.sockets.emit('messageServer', data);
    });
    socket.on('dataUser', (nombreUsuario) =>{
        let fecha= new Date();
        let hora_actual = fecha.getHours();
        let minutos = fecha.getMinutes();
        let m = hora_actual + ':' + minutos;
        
        let newConn ={    
            id: socket.id,
            nombreUsuario,
            horaEntrada: m
        };
    
        dbConexion.push(newConn);
        const json_client = JSON.stringify(dbConexion);
        fs.writeFileSync('src/conexiones.json', json_client, 'utf-8');
        
    }); */

    socket.on('chat:message', (data) => {
        io.sockets.emit('messageServer', data);

        let fecha= new Date();
        let hora_actual = fecha.getHours();
        let minutos = fecha.getMinutes();
        let m = hora_actual + ':' + minutos;
        
        let newConn ={    
            id: socket.id,
            nombreUsuario: data.username,
            horaEntrada: m
        };
    
        dbConexion.push(newConn);
        const json_client = JSON.stringify(dbConexion);
        fs.writeFileSync('src/conexiones.json', json_client, 'utf-8');
    });
    
    

    socket.on('disconnect', ()=>{
        
        UserConnected = UserConnected - 1;

        let fecha= new Date();
        let hora_actual = fecha.getHours();
        let minutos = fecha.getMinutes();
        let n = hora_actual + ':' + minutos;

 
    let newDes ={    
        id: socket.id,
        horaSalida: n
    };

    dbDesConexion.push(newDes);
    const json_client = JSON.stringify(dbDesConexion);
    fs.writeFileSync('src/desconexiones.json', json_client, 'utf-8');
    });
});


// view connect user

app.get('/gpxconnect', function (req, res){
    
    let d = UserConnected;
    res.render('connect', {
        d,
        dbConexion,
        dbDesConexion

    });
});


module.exports = app;