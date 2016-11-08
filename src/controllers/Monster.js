const models = require('../models');

const Monster = models.Monster;

const makerPage = (req, res) => {
  Monster.MonsterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    
    return res.render('app', { csrfToken: req.csrfToken()  , monsters: docs });
  });
};

const makeMonster = (req, res) => {
  if (!req.body.name || !req.body.envorment
     || !req.body.dc || !req.body.numDie
     || !req.body.die || !req.body.plus
     || !req.body.str || !req.body.int
     || !req.body.wis || !req.body.dex
     || !req.body.con || !req.body.cha) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }

  const monsterData = {
    name: req.body.name,
    envorment: req.body.envorment,
    dc: req.body.dc,
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

    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeMonster;
