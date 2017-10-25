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

    
    EddyStoryModel.find({}, 'storyFileUrls -_id', function(err, Values){
        if(err)
        {
            console.log(err);
            res.status(200).json({
                message: -1,
                // message: Values.toString(),
                listOfStoryURLS: []
            });    
        }
        else
        {
 
            // console.log(Values[0]['storyFileUrls']);
            // var filename = Values[0]['storyFileUrls'][0].substring(Values[0]['storyFileUrls'][0].lastIndexOf('/')+1, Values[0]['storyFileUrls'][0].length);
            // // filename = filename.replace('+', ' ');
            
            // filename = filename.split('+').join("");
            // // console.log(Values[0]['storyFileUrls'][0].substring(Values[0]['storyFileUrls'][0].lastIndexOf('/')+1, Values[0]['storyFileUrls'][0].length));
            // console.log(filename);
            
            // res.status(200).json({
            //     message: Values.length,
            //     // message: Values.toString(),
            //     listOfStoryURLS: 'first story name: '.concat(filename)
            // });   

            var fs = require('fs');
            // var file = fs.createWriteStream('./server/static/animations/'.concat(filename));
            // var file = fs.createWriteStream('./server/'.concat(filename));
            var https = require('https');     
            var animationNames = [];

            for(var i = 0; i < 1; i++){    
            
            var filename = Values[0]['storyFileUrls'][i].substring(Values[0]['storyFileUrls'][i].lastIndexOf('/')+1, Values[0]['storyFileUrls'][i].length);
            filename = filename.split('+').join("");
            console.log(filename);
            animationNames.push(filename);
            var file = fs.createWriteStream('./server/static/animations/'.concat(filename));
                
            https.get(Values[0]['storyFileUrls'][i], function(response) {



                response.pipe(file);

                file.on('finish', function() {
                  console.log('SERVER: ANIMATION DOWNLOADED FROM SERVER: ',Values[0]['storyFileUrls'][i]);
                  file.close();  // close() is async, call cb after close completes.
                  if(i == 0)//Values[0]['storyFileUrls'].length - 1
                  {
                    console.log('SERVER: LAST FILE DOWNLOADED, COMMUNICATING BACK TO FRONTEND');    
                    res.status(200).json({
                        message: Values[0]['storyFileUrls'].length,
                        listOfStoryURLS: animationNames.toString()
                        // message: 'SERVER: GOT ENTIRE FILE IN A STRING FROM THE FILE: '.concat(newsURL['ContentURLCH'])
                    });
                  }
                  
                });
                
                // response.on('data', function (chunk) {
                //     console.log('SERVER: downloading the first animation......');
                //         // console.log('SERVER: chuck data: ',chunk);
                //         // str += chunk;
                // });
                
                // response.on('end', function () {
                //         // console.log(str);
                //         console.log('SERVER FINISHED DOWNLOADING ANIMATION: ',Values[0]['storyFileUrls'][0]);
                //         res.status(200).json({
                //             message: Values.length,
                //             listOfStoryURLS: []
                //             // message: 'SERVER: GOT ENTIRE FILE IN A STRING FROM THE FILE: '.concat(newsURL['ContentURLCH'])
                //         });                             
                // });

            //   response.pipe(file);
            //   file.on('finish', function() {
            //     file.close(cb);
            //   });
            }).on('error', function(err) { 
                console.log(err);
                res.status(200).json({
                    message: -1,
                    // message: Values.toString(),
                    listOfStoryURLS: 'no file downloaded or saved'
                });
                // res.end();                    
                // fs.unlink(dest); // Delete the file async. (But we don't check the result)
                // if (cb) cb(err.message);
              });            
            }    
            // res.status(200).json({
            //     message: Values.length,
            //     // message: Values.toString(),
            //     listOfStoryURLS: Values
            // });                     
        }
        // if(err) return next(err);
        // res.send(someValue);
    });
});

module.exports = router;