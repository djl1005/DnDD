const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/add', mid.requiresLogin, controllers.Monster.makerPage);
  app.get('/searchList', mid.requiresLogin, controllers.Monster.search);
  app.get('/search', mid.requiresLogin, controllers.Monster.searchPage);
  
  app.post('/maker', mid.requiresLogin, controllers.Monster.make);
  app.get('/plist', controllers.Monster.publicListPage);
  app.get('/list', mid.requiresLogin, controllers.Monster.listPage);
  app.get('/credits', mid.requiresLogin, controllers.creditsPage);
  app.delete('/delete', mid.requiresLogin, controllers.Monster.deleteMonster);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
