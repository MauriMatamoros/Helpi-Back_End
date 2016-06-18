var caso = require('../schemas/table');

exports.createTable = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var newTable = new table({
      name: request.payload.nombre,
      description: request.payload.description,
      money: request.payload.money
    });

    newTable.save(function(err){
      if(!err){
        console.log('New table added to database');
        return reply('table saved');
      }else{
        console.log('An error was encountered');
        return reply('Error');
      }
    });
  }
};

exports.getTables = {
  auth: false,
  handler: function(request, reply){
    var Table = table.find({});
    console.log('Replying all tables');
    reply(Table);
  }
};

exports.getTableByID = {
  auth: false,
  handler: function(request, reply){
    var Table = table.find({_id: request.params._id}, function(err, table){
      if(!err){
       console.log('The table was found');
       return reply(Caso);
      }
      console.log('The table was not Found');
      return reply('Table not Found');
    });
  }
};

exports.deleteTable = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var tableDeleted = table.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting table');
        tableDeleted.remove().exec();
        console.log('Table was deleted');
        return reply('Deleted')
      }else{
        console.log('Table not Found')
        return reply('not_found');
      }
    });
  }
};

exports.updateTable = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var Table = table.findByIdAndUpdate(encodeURIComponent(request.params._id), {
      name: request.payload.nombre,
      // no estoy seguro de que funciona
      donors: request.payload.description,
      case: request.payload.money
    }, function(err){
      if(err){
        console.log('Error... ' + err);
        reply('Error');
      }else{
        console.log('Table con ID: ' + request.payload._id + ' has been updated');
        reply('Mod');
      }
    });
  }
};
