var boom = require('boom');
var joi = require('joi');
var user = require('../schemas/user');
var SHA3 = require('crypto-js/sha3');

exports.login = {
  auth: false,
  validate: {
    payload: {
      username: joi.string().required(),
      password: joi.string().min(2).max(32).required()
    }
  },
  handler: function(request, reply){
    var temp_pass = String(SHA3(request.payload.password));
    console.log('Searching for user...');
    user.find({username: request.payload.username, password: temp_pass}, function(err, user){
      console.log('Username found: ' + user);
      if(!err){
        if(user.length > 0){
          request.cookieAuth.set(user[0]);
          return reply({
            id: user[0]._id,
            name: user[0].name,
            username: user[0].username,
            scope: user[0].scope,
            email: user[0].email,
            profile_photo: user[0].profile_photo
          });
        }
        console.log('Ocurrio un problema de autenticacion');
        return reply(boom.unauthorized('Usuario or password are incorrect'));
      }
      console.log('Problem in server');
      return reply(boom.notAcceptable('Error Executing Query'));
    });
  }
};

exports.logout = {
  auth: {
    mode: 'required',
    strategy: 'session'
  },
  handler: function(request, reply){
    request.cookieAuth.clear();
    return reply('Log out success');
  }
};
