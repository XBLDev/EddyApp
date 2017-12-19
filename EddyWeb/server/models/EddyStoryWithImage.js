const mongoose = require('mongoose');

// define the User model schema
const EddyStoryWithImageSchema = new mongoose.Schema({
      storyName: String
    , storyFileUrls: { type : Array , "default" : [] }
    
    //   titleEng   : String
    // , titleCh    : String 
    // , date    : Date
    // , ContentURLCH: String
    // , ContentURLENG: String    

  });

  module.exports = mongoose.model('EddyStoryWithImages', EddyStoryWithImageSchema, 'eddystorywithimages');