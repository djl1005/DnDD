

const calcHP = (num, die, plus) =>{
    let hp = 0;
  
    
  
    var numDie = parseInt(num);
  
    while(numDie) {
        hp += Math.floor(Math.random() * (parseInt(die))) + 1;
        numDie --;
    }
    
    return hp + parseInt(plus); 
}

const calcMod = (attr) => {
    return Math.floor( parseInt(attr)/2) - 5;
}


module.exports = {
    calcHP,
    calcMod
};