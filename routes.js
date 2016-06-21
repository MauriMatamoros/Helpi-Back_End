var caseController = require('./controllers/caseCtrl');
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');
var tableController = require('./controllers/tableCtrl');

exports.endpoints = [{method: 'POST', path: '/cases/addcase', config: caseController.createCase},
{method: 'GET', path: '/tables/gettables', config: tableController.getTables},
{method: 'GET', path: '/tables/tableid/{_id}', config: tableController.getTableByID},
{method: 'GET', path: '/cases/getcases', config: caseController.getCases},
{method: 'GET', path: '/cases/caseid/{_id}', config: caseController.getCaseByID},
{method: 'DELETE', path: '/cases/deletecase/{_id}', config: caseController.deleteCase},
{method: 'POST', path: '/users/createuser', config: userController.CreateUser},
{method: 'GET', path: '/users/getusers', config: userController.getUsers},
{method: 'DELETE', path: '/users/deleteuser/{_id}/{password}', config: userController.deleteUser},
{method: 'POST', path: '/auth/login', config: authController.login},
{method: 'GET', path: '/auth/logout', config: authController.logout},
{method: 'PUT', path: '/users/update/{_id}', config: userController.updateUser},
{method: 'GET', path: '/users/useremail/{email}', config: userController.getUserByEmail},
{method: 'POST', path: '/users/mycases/{_id}/addCase', config: userController.addCaseToUser},
{method: 'GET', path: '/users/mycases/{_id}', config: userController.getUserById},
{method: 'PUT', path: '/tables/updatemytable/{_id}', config: tableController.updateTable}
];
