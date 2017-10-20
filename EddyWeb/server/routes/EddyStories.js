var mongoose = require('mongoose')

const express = require('express');

const router = new express.Router();

const EddyStoryModel = mongoose.model('EddyStory');

var conn = mongoose.connection;

EddyStoryModel.find().count(function(err, count){

    if(!err)
    {
        console.log('FOUND EDDYSTORIES ON START, COUNT: ', count);
        if(count == 0)
        {
            console.log('FOUND COUNT OF EDDYSTORIES ON START 0, ADDING 2 DEFAULT STORIES', );
            var Story1 = 
            {
                storyName: "story1",
                storyFileUrls:
                [
                    "STORY1PAGE1.json",
                    "STORY1PAGE2.json",
                    "STORY1PAGE3.json",
                    "STORY1PAGE4.json",
                    "STORY1PAGE5.json",
                    "STORY1PAGE6.json",
                    "STORY1PAGE7.json"
                ]
            };

            var Story2 = 
            {
                storyName: "story2",
                storyFileUrls:
                [
                    "STORY1PAGE1.json",
                    "STORY1PAGE2.json",
                    "STORY1PAGE3.json",
                ]
            };

            conn.collection('eddystory').insert(Story1, function(err, records){
                // console.log("Record added as "+records[0]._id);
                if(err)
                {
                   console.log('error insert 1st story');
                }
                else
                {
                    console.log('inserted 1st story');
                }
            });     
            
            conn.collection('eddystory').insert(Story2, function(err, records){
                // console.log("Record added as "+records[0]._id);
                if(err)
                {
                   console.log('error insert 2nd story');
                }
                else
                {
                    console.log('inserted 2nd story');
                }
            });                       

        }
        else
        {
            console.log('FOUND COUNT OF EDDYSTORIES ON START: ', count);            
        }
    }
    else
    {
        console.log('CAN NOT FIND EDDYSTORIES ON START');
        
    }    
})


router.get('/EddyStories', (req, res) => {

    console.log("BACKEND: GET EddyStories CALLED")
    // EddyStoryModel.find().count(function(err, count){
    //         if(!err)
    //         {
    //             console.log('Call of GET EddyStories Successed');
    //             // console.log(Values);
    //             res.status(200).json({
    //                 message: count,
    //             });                     
    //         }
    //         else
    //         {
    //             console.log('Call of GET EddyStories Failed');
    //             res.status(200).json({
    //                 message: -1,
    //             });                       
    //         }            
    // })

    
    EddyStoryModel.find({}, 'storyName -_id', function(err, Values){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(Values);
            res.status(200).json({
                message: Values.length,
                // message: Values.toString(),
                listOfStoryURLS: Values
            });                     
        }
        // if(err) return next(err);
        // res.send(someValue);
    });
});

module.exports = router;