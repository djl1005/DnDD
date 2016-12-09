

const calcHP = (num, die, plus) => {
  let hp = 0;


  let numDie = parseInt(num, 10);

  while (numDie) {
    hp += Math.floor(Math.random() * (parseInt(die, 10))) + 1;
    numDie--;
  }

  return hp + parseInt(plus, 10);
};

const calcMod = attr =>
   Math.floor(parseInt(attr, 10) / 2) - 5
;


module.exports = {
  calcHP,
  calcMod,
};
