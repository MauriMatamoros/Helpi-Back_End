var table = require('../schemas/table');

exports.getTables = {
  auth: false,
  handler: function(request, reply){
    var Table = table.find({});
    console.log('Get_Tables');
    reply(Table);
  }
};

exports.getTableByCase = {
  auth: false,
  handler: function(request, reply){
    var Table = table.find({case: request.params._id}, function(err, table){
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
    table.find({case: request.params.caseid}, function(err, result) {
      if(!err){
        if(result.length > 0){
          table.findByIdAndUpdate(result[0]._id,
            {$push: {"donors": request.payload._id}},
            {safe: true, upsert: true},
            function(error){
              if (error) {
                return reply(boom.notAcceptable("Error, durante la busqueda"));
              }else{
                return reply('Seguimiento de donante, activado!!');
              }
            }
          );
        }else{
          console.log('empty array');
          return reply(boom.notAcceptable('Error inesperado en el servidor'));
        }
      }
    });
  }
};
