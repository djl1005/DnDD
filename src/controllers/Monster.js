const models = require('../models');

const Monster = models.Monster;

const makerPage = (req, res) =>
     res.render('add', { csrfToken: req.csrfToken() })
;

const searchPage = (req, res) =>
     res.render('search', { csrfToken: req.csrfToken() })
;

const search = (req, res) => {
  Monster.MonsterModel.search(req.session.account._id, req.query, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }


    return res.render('search', { csrfToken: req.csrfToken(), monsters: docs });
    // return res.json({ redirect: '/list' });
  });
};

const listPage = (req, res) => {
  Monster.MonsterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('list', { csrfToken: req.csrfToken(), canDelete: 1, monsters: docs });
  });
};

const publicListPage = (req, res) => {
  Monster.MonsterModel.findByOwner('583fcd16b5ab8816e826d8d0', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('list', { csrfToken: req.csrfToken(), canDelete: 0, monsters: docs });
  });
};

const deleteMonster = (req, res) => {
  Monster.MonsterModel.remove(req.session.account._id, req.body.name, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ redirect: '/list' });
  });
};

const makeMonster = (req, res) => {
  if (!req.body.name || !req.body.envorment.split(',')
     || !req.body.cr || !req.body.numDie
     || !req.body.die || !req.body.plus
     || !req.body.str || !req.body.int
     || !req.body.wis || !req.body.dex
     || !req.body.con || !req.body.cha) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }

  const monsterData = {
    name: req.body.name,
    envorment: req.body.envorment.split(','),
    cr: req.body.cr,
    numDie: req.body.numDie,
    die: req.body.die,
    plus: req.body.plus,
    str: req.body.str,
    int: req.body.int,
    wis: req.body.wis,
    dex: req.body.dex,
    con: req.body.con,
    cha: req.body.cha,
    skills: req.body.skills || '',
    notes: req.body.notes || '',
    owner: req.session.account._id,
  };


  const newMonster = new Monster.MonsterModel(monsterData);

  return newMonster.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ redirect: '/add' });
  });
};


module.exports.deleteMonster = deleteMonster;
module.exports.makerPage = makerPage;
module.exports.searchPage = searchPage;
module.exports.search = search;
module.exports.listPage = listPage;
module.exports.publicListPage = publicListPage;
module.exports.make = makeMonster;
