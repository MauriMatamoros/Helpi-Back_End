var caso = require('../schemas/case');
var table = require('../schemas/table');

exports.createCase = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var newCase = new caso({
      name: request.payload.name,
      imageLink: request.payload.imageLink,
      description: request.payload.description,
      money: request.payload.money
    });

    var newTable = new table({
      name: request.payload.name,
      case: newCase._id
    });
    newTable.save(function(err){
      if(!err){
        console.log('New table added to database');
      }else{
        console.log('An error was encountered whilst saving table');
      }
    });
    newCase.save(function(err){
      if(!err){
        console.log('New Case on DB');
        return reply('Caso Guardado');
      }else{
        console.log('An error was encountered whilst saving case');
        return reply('Error');
      }
    });
  }
};


exports.getCases = {
  auth: false,
  handler: function(request, reply){
    var Caso = caso.find({});
    console.log('Get_Cases');
    reply(Caso);
  }
};

exports.getCaseByID = {
  auth: false,
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
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var caseDeleted = caso.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting case');
        caseDeleted.remove().exec();
        //deleting table
        console.log('Case was deleted, searching for table...');
        var tableDeleted = table.find({case: request.params._id}, function(err){
          if(!err){
            console.log('Deleting table');
            tableDeleted.remove().exec();
            console.log('Table was deleted');
            return reply('Deleted')
          }else{
            console.log('Table not Found')
            return reply('Error inesperado en el servidor');
          }
        });
      }else{
        console.log('Case not Found')
        return reply('Error inesperado');
      }
    });
  }
};

exports.updateCase = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var Case = caso.findByIdAndUpdate(encodeURIComponent(request.params._id), {
      name: request.payload.name,
      imageLink: request.payload.imageLink,
      description: request.payload.description,
      money: request.payload.money
    }, function(err){
      if(err){
        reply('Error al intentar modificar');
      }else{
        console.log('Caso con ID: ' + request.payload._id + ' Ha sido modificado');
        reply('Modificado satisfactoriamente');
      }
    });
  }
};
