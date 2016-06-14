var caseController = require('./controllers/caseCtrl');
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'POST', path: '/cases/addcase', config: caseController.createCase},
{method: 'GET', path: '/cases/getcases', config: caseController.getCases},
{method: 'GET', path: '/cases/caseid/{_id}', config: caseController.getCaseByID},
{method: 'DELETE', path: '/cases/deletecase/{_id}', config: caseController.deleteCase},
{method: 'POST', path: '/users/createuser', config: userController.CreateUser},
{method: 'GET', path: '/users/getusers', config: userController.getUsers},
{method: 'DELETE', path: '/users/deleteuser/{_id}', config: userController.deleteUser},
{method: 'POST', path: '/auth/login', config: authController.login},
{method: 'GET', path: '/auth/logout', config: authController.logout},
{method: 'PUT', path: '/users/update/{_id}', config: userController.updateUser}
];
