const mongoose = require('mongoose');

// define the User model schema
const EddyStorySchema = new mongoose.Schema({
      storyName: String
    , storyFileUrls: { type : Array , "default" : [] }
    
    //   titleEng   : String
    // , titleCh    : String 
    // , date    : Date
    // , ContentURLCH: String
    // , ContentURLENG: String    

  });

  module.exports = mongoose.model('EddyStory', EddyStorySchema, 'eddystory');