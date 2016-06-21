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
       return reply(table);
      }
      console.log('The table was not Found');
      return reply('Table not Found');
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
      donors: request.payload.description,
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
