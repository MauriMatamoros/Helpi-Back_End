var hapi = require('hapi');
var inert = require('inert');
var mongoose = require('mongoose');
// var routes = require('./routes');
var auth = require('hapi-auth-cookie');

var server = new hapi.Server();
server.connection({
    port: ~~process.env.PORT || 8000,
    routes: { cors: {
                    credentials: true,
                    origin: ["*"]
                }
              }
});

mongoose.connect('mongodb://localhost:27017/helpi');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error al conectar con base de datos'));
db.once('open', function callback() {
    console.log("Conexion con base de datos exitosa!!!");
});

server.register([inert, auth], function(err){

  server.auth.strategy('session', 'cookie', {
    password: 'secretpasswordforencryptionwithchrisandmauri',
    cookie: 'helpi-backend-cookie',
    ttl: 2 * 60 * 60 * 1000, // Set session to 1 day
    isSecure: false
  });

	server.route(routes.endpoints);

	server.start(function () {
	    console.log('Servidor activo en puerto:', server.info.uri);
	});
});
