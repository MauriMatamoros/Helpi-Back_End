var caso = require('../schemas/case');

exports.createCase = {
  handler: function(request, reply){
    var newCase = new caso({
      nombre: request.payload.nombre,
      imageLink: request.payload.imageLink,
      description: request.payload.description,
      money: request.payload.money
    });

    newCase.save(function(err){
      if(!err){
        console.log('Nuevo Caso agregado a DB');
        return reply('Caso guardado.');
      }else{
        console.log('An error was found');
        return reply('Error');
      }
    });
  }
};

exports.getCases = {
  handler: function(request, reply){
    var Caso = caso.find({});
    console.log('Replying all cases');
    reply(Caso);
  }
};

exports.getCaseByID = {
  handler: function(request, reply){
    var Caso = caso.find({_id: request.params._id}, function(err, game){
      if(!err){
       console.log('The case was found');
       return reply(Caso);
      }
      console.log('The Case was not Found');
      return reply('Case not Found');
    });
  }
};

exports.deleteCase = {
  handler: function(request, reply){
    var caseDeleted = caso.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting case');
        caseDeleted.remove().exec();
        console.log('Case was deleted');
        return reply('Deleted')
      }else{
        console.log('Case not Found')
        return reply('not_found');
      }
    });
  }
};

exports.updateCase = {
  handler: function(request, reply){
    var Case = caso.findByIdAndUpdate(encodeURIComponent(request.params._id), {
      nombre: request.payload.nombre,
      imageLink: request.payload.imageLink,
      description: request.payload.description,
      money: request.payload.money
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
