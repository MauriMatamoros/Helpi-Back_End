var user = require('../schemas/user');
var SHA3 = require('crypto-js/sha3');
var boom = require('boom');

exports.CreateUser = {
  handler: function(request, reply){
    console.log('The request is: ' + request);
    var newUser = new user({
      username: request.payload.username,
      password: SHA3(request.payload.password),
      email: request.payload.email,
      scope: request.payload.scope
    });
    console.log('Preparando el nuevo usuario');
    newUser.save(function(err){
      if(err){
        console.log('Ocurrio un error durante la creacion del nuevo usuario\n');
        console.log('Error: ' + err);
        return reply(boom.notAcceptable('Ocurrio un error al intentar crear usuario' + err));
      }else{
        console.log('Un nuevo usuario se ha creado');
        return reply('Usuario Creado');
      }
    });
  }
};

exports.getUsers = {
  handler: function(request, reply){
    var UserGot = user.find({});
    console.log('Replying all users');
    reply(UserGot);
  }
};

exports.deleteUser = {
  handler: function(request, reply){
    var userDeleted = user.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting case');
        userDeleted.remove().exec();
        console.log('Case was deleted');
        return reply('Deleted')
      }else{
        console.log('Case not Found')
        return reply('not_found');
      }
    });
  }
};
