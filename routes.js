var caseController = require('./controllers/caseCtrl');

exports.endpoints = [{method: 'POST', path: '/cases/addcase', config: caseController.createCase},
{method: 'GET', path: '/cases/getcases', config: caseController.getCases},
{method: 'GET', path: '/cases/caseid/{_id}', config: caseController.getCaseByID},
{method: 'DELETE', path: '/cases/deletecase/{_id}', config: caseController.deleteCase}
];
