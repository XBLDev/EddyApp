const mongoose = require('mongoose');

// define the User model schema
const newsInfoSchema = new mongoose.Schema({

      titleEng   : String
    , titleCh    : String 
    , date    : Date
    , ContentURLCH: String
    , ContentURLENG: String    
    // email: {
    //   type: String,
    //   index: { unique: true }
    // },
    // password: String,
    // name: String
  });

  module.exports = mongoose.model('LatestNews', newsInfoSchema);