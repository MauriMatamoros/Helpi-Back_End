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
      return reply(boom.notAcceptable('Table not Found'));
    });
  }
};


exports.updateTable = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['donante']
  },
  handler: function(request, reply){
    var Table = table.findByIdAndUpdate(request.params._id,
      {$push: {"donors": request.payload._id}},
      {safe:true, upsert:true},
      function(err){
        if(err){
          console.log(err);
          return reply(boom.notAcceptable("Error, no se encontro su busqueda"));
        }else{
          return reply('Tabla Modificada.');
        }
      }
    );
  }
};
