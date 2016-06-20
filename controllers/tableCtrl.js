var table = require('../schemas/table');

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
      name: request.payload.name,
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
