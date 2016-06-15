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
      profile_photo: request.payload.profile_photo
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
    user.findByIdAndUpdate(
      request.params._id,
      {$push: {"cases": request.payload._id}},
      {safe:true, upsert: true},
      function(err){
        if(err){
          console.log(err);
        }else{
          return reply('success');
        }
    });
  }
};

exports.getUserById = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['donante']
  },
  handler: function(request, reply){
    var me = user.find({_id: request.params._id}, function(err, user) {
      if(err){
        console.log(err);
        return reply('Not Found');
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
      return reply('user not Found');
    });
  }
};

exports.getUsers = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
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
    scope: ['donante']
  },
  handler: function(request, reply){
    var userDeleted = user.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting user');
        userDeleted.remove().exec();
        console.log('user was deleted');
        return reply('Deleted')
      }else{
        console.log('User not Found')
        return reply('not_found');
      }
    });
  }
};

exports.updateUser = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['donante']
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
        reply('Error');
      }else{
        console.log('Caso con ID: ' + request.payload._id + ' Ha sido modificado');
        reply('Modificado');
      }
    });
  }
};
