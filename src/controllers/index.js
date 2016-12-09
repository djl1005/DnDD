const creditsPage = (req, res) =>
     res.render('credits', { csrfToken: req.csrfToken() })
;

module.exports.creditsPage = creditsPage;
module.exports.Account = require('./Account.js');
module.exports.Monster = require('./Monster.js');
