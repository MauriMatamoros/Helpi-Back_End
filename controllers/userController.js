var user = require('../schemas/user');
var SHA3 = require('crypto-js/sha3');
var boom = require('boom');
var caso = require('../schemas/case');

exports.CreateUser = {
  auth: {
    mode:'try',
    strategy:'session'
  },
  handler: function(request, reply){
    console.log('The request is: ' + request.data);
    var newUser = new user({
      name: request.payload.name,
      username: request.payload.username,
      password: SHA3(request.payload.password),
      email: request.payload.email,
      scope: request.payload.scope,
      profile_photo: request.payload.profile_photo,
      provider: request.payload.provider
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

exports.addCaseToUser = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['donante']
  },
  handler: function(request, reply){
    var matchFound = 0;
    user.find({_id: request.params._id}, function(err, result){
      if(!err){
        console.log('Agregando caso a ' + result[0].name);
        if(result.length > 0){
          for (var i = 0; i < result[0].cases.length; i++) {
            if(request.payload._id === result[0].cases[i]){
              matchFound++;
            }
          }
          if(matchFound === 0){
            user.findByIdAndUpdate(result[0]._id,
              {$push: {"cases": request.payload._id}},
              {safe:true, upsert: true},
              function(error){
                if(error){
                  console.log(error);
                  return reply(boom.notAcceptable("Error, no se encontro su busqueda"));
                }else{
                  return reply('Donacion Agregada');
                }
            });
          }else{
            return reply('Usted ya ha donado para este caso');
          }
        }else{
          console.log('Empty');
          return reply('Empty');
        }
      }
    });
  }
};

exports.getUserById = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['donante','admin']
  },
  handler: function(request, reply){
    var me = user.find({_id: request.params._id}, function(err, user) {
      if(err){
        console.log(err);
        return reply(boom.notAcceptable('Not Found'));
      }else{
        return reply(user);
      }
    });
  }
}

exports.getUserByEmail = {
  auth: false,
  handler: function(request, reply){
    var userbyEmail = user.find({email: request.params.email}, function(err, user){
      if(!err){
       console.log('The user by email was found');
       return reply(user);
      }
      console.log('The user by email was not Found');
      return reply(boom.notAcceptable('user not Found'));
    });
  }
};

exports.getUsers = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin', 'donante']
  },
  handler: function(request, reply){
    var UserGot = user.find({});
    console.log('Replying all users');
    reply(UserGot);
  }
};

exports.deleteUser = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['donante','admin']
  },
  handler: function(request, reply){
    var gameDeleted = user.find({_id: request.params._id}, function(err, user){
      if(!err){
        var cryptoPass = String(SHA3(request.params.password));
        if(cryptoPass === user[0].password){
          console.log('password match');
          request.cookieAuth.clear();
          gameDeleted.remove().exec();
          reply('User Deleted');
        }else{
          return reply(boom.notAcceptable('Password incorrecto'));
        }
      }else{
        console.log('user not Found')
        return reply(boom.notAcceptable('Not Found'));
      }
    });
  }
};

exports.updateUser = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['donante','admin']
  },
  handler: function(request, reply){
    var userUpdated = user.findByIdAndUpdate(encodeURIComponent(request.params._id), {
      name: request.payload.name,
      username: request.payload.username,
      email: request.payload.email,
      profile_photo: request.payload.profile_photo
    }, function(err){
      if(err){
        console.log('Error... ' + err);
        return reply(boom.notAcceptable('Error'));
      }else{
        console.log('Caso con ID: ' + request.payload._id + ' Ha sido modificado');
        reply('Modificado');
      }
    });
  }
};
