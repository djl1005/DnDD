const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let MonsterModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const MonsterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  envorment: {
    type: [String],
    required: true,
  },

  cr: {
    type: Number,
    min: 0.1,
    required: true,
  },

  numDie: {
    type: Number,
    min: 0,
    required: true,
  },

  die: {
    type: Number,
    min: 0,
    required: true,
  },

  plus: {
    type: Number,
    min: 0,
    required: true,
  },

  str: {
    type: Number,
    min: 1,
    required: true,
  },

  int: {
    type: Number,
    min: 1,
    required: true,
  },
  wis: {
    type: Number,
    min: 1,
    required: true,
  },

  dex: {
    type: Number,
    min: 1,
    required: true,
  },
  con: {
    type: Number,
    min: 1,
    required: true,
  },
  cha: {
    type: Number,
    min: 1,
    required: true,
  },

  skills: {
    type: String,
    trim: true,
  },

  notes: {
    type: String,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

MonsterSchema.statics.toAPI = doc => ({
  name: doc.name,
  str: doc.str,
  int: doc.int,
  wis: doc.wis,
  dex: doc.dex,
  con: doc.con,
  cha: doc.cha,
  skills: doc.skills,
  notes: doc.notes,
});

MonsterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return MonsterModel.find(search).select().exec(callback);
};

MonsterSchema.statics.search = (ownerId, query, callback) => {
  
  let max = parseInt(query.maxcr) || 99999999999999;
  if(max == 0 ) {max = 99999999999999; }
  let min = parseInt(query.mincr) || 0;
  
  const search = {
    owner: { $in:[convertId(ownerId) , convertId("583fcd16b5ab8816e826d8d0")]},
    envorment: query.envorment,
    cr: {$gte: min, $lte: max}
  };
  
  //db.inventory.find ( { quantity: { $in: [20, 50] } } )

  return MonsterModel.find(search).select().sort({cr: -1}).exec(callback);
};

MonsterSchema.statics.remove = (ownerId, name, callback) => {
  const search = {
    owner: convertId(ownerId),
    name: name,
  };

  return MonsterModel.find(search).remove().exec(callback);
};

MonsterModel = mongoose.model('Monster', MonsterSchema);

module.exports.MonsterModel = MonsterModel;
module.exports.MonsterSchema = MonsterSchema;
