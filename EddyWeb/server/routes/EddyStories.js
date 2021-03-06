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


function testfunc(currentNumberOfAnimation, res)
{
    // res.status(200).json({
    //     message: 7,
    //     listOfStoryURLS: []
    //     // message: 'SERVER: GOT ENTIRE FILE IN A STRING FROM THE FILE: '.concat(newsURL['ContentURLCH'])
    // });

    if(currentNumberOfAnimation == 5)
    {
        res.status(200).json({
            message: 7,
            listOfStoryURLS: []
            // message: 'SERVER: GOT ENTIRE FILE IN A STRING FROM THE FILE: '.concat(newsURL['ContentURLCH'])
        });
    }
    else
    {
        console.log(currentNumberOfAnimation);
        testfunc(currentNumberOfAnimation+1, res);
    }
}


function checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation, 
    totalNumberOfAnimations, animationNames, res)
{


//     fs.stat('foo.txt', function(err, stat) {
//     if(err == null) {
//         console.log('File exists');
//     } else if(err.code == 'ENOENT') {
//         // file does not exist
//         fs.writeFile('log.txt', 'Some log\n');
//     } else {
//         console.log('Some other error: ', err.code);
//     }
// });

    if(currentNumberOfAnimation != totalNumberOfAnimations)
    {
        var filename = arrayOfFileUrls[currentNumberOfAnimation];
        var filename = filename.substring
        (filename.lastIndexOf('/')+1, 
         filename.length);

        filename = filename.split('+').join(""); 
        // console.log(filename);  
        p_fs.stat('./server/static/animations/'.concat(filename), function(err, stat) {
            if(err == null) {
                console.log('File: ',filename,' exists, no need to download');
                // currentNumberOfAnimation += 1;
                checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation+1, 
                    totalNumberOfAnimations, animationNames, res);

            } else if(err.code == 'ENOENT') {
                // file does not exist
                // fs.writeFile('log.txt', 'Some log\n');
                console.log('File: ',filename,' needs to be downloaded');
                // currentNumberOfAnimation += 1;
                downloadAnimationArray.push(arrayOfFileUrls[currentNumberOfAnimation]);
                checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation+1, 
                    totalNumberOfAnimations, animationNames, res);
            } else {
                console.log('Some other error: ', err.code);
                // currentNumberOfAnimation += 1;
                checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation+1, 
                    totalNumberOfAnimations, animationNames, res);

            }
        });
    }
    else
    {
        console.log('The files that need to be downloaded: ', downloadAnimationArray);

        downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, animationNames, 0, 
        downloadAnimationArray.length,
        // Values[0]['storyFileUrls'].length, 
        res, downloadAnimationArray);

    }

    // /./server/static/animations/
    // for(var i = 0; i < arrayOfFileUrls.length; i++)
    // {
    //     var filename = arrayOfFileUrls[i];
    //     var filename = filename.substring
    //     (filename.lastIndexOf('/')+1, 
    //      filename.length);

    //     filename = filename.split('+').join(""); 
    //     console.log(filename);        
    // }





    // return [];
}


// function checkIfFileNameExist(file, ) {
//     return age >= 18;
// }


function downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, animationNames, currentNumberOfAnimation, 
    totalNumberOfAnimations, res, animationsNeedDownload)
{
    //../../server/static/animations/
    if(currentNumberOfAnimation == totalNumberOfAnimations)
    {
        console.log("BACKEND: ALL FILES DOWNLOADED");
        for(var i = 0; i< arrayOfFileUrls.length; i++)
        {
            var filename = arrayOfFileUrls[i];
            filename = filename.substring(filename.lastIndexOf('/')+1, 
                filename.length);

            filename = filename.split('+').join(""); 
            animationNames.push('./animations/'.concat(filename));
        }

        res.status(200).json({
            message: arrayOfFileUrls.length,
            listOfStoryURLS: animationNames            
        });
    }
    else
    {
        // console.log(currentNumberOfAnimation);
        // var filename = arrayOfFileUrls[currentNumberOfAnimation];
        // console.log();
        var filename = animationsNeedDownload[currentNumberOfAnimation];

        // var filename = arrayOfFileUrls['storyFileUrls'][currentNumberOfAnimation];

        filename = filename.substring
        (filename.lastIndexOf('/')+1, 
         filename.length);

        filename = filename.split('+').join(""); 
        console.log(filename);
        var file = p_fs.createWriteStream('./server/static/animations/'.concat(filename));
        // var file = p_fs.createWriteStream('./client/src/'.concat(filename));


        p_https.get(animationsNeedDownload[currentNumberOfAnimation], function(response) {
            
            response.pipe(file);

            file.on('finish', function() {
                console.log('SERVER: ANIMATION DOWNLOADED FROM SERVER: ',animationsNeedDownload[currentNumberOfAnimation]);
                file.close();  // close() is async, call cb after close completes.
                // animationNames.push('../../server/static/animations/'.concat(filename));
                // animationNames.push('./animations/'.concat(filename));
                downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, animationNames, 
                    currentNumberOfAnimation+1, totalNumberOfAnimations, res, animationsNeedDownload);    
                // console.log('SERVER: LAST FILE DOWNLOADED, COMMUNICATING BACK TO FRONTEND');    
                // res.status(200).json({
                //     message: Values[0]['storyFileUrls'].length,
                //     listOfStoryURLS: animationNames.toString()
                //     // message: 'SERVER: GOT ENTIRE FILE IN A STRING FROM THE FILE: '.concat(newsURL['ContentURLCH'])
                // });
                
                
            }).on('error', function(err) { 
                console.log(err);
                file.close();
                res.status(200).json({
                    message: -1,
                    // message: Values.toString(),
                    listOfStoryURLS: ['no file downloaded or saved']
                });

                });
    
        });    


        // downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, currentNumberOfAnimation+1, totalNumberOfAnimations, res)          

   
    }   
}



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
    //         {}
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
            


            var fs = require('fs');
            // var file = fs.createWriteStream('./server/static/animations/'.concat(filename));
            // var file = fs.createWriteStream('./server/'.concat(filename));
            var https = require('https');     
            var animationNames = [];

            //for(var i = 0; i < 1; i++){    
            
            // var filename = Values[0]['storyFileUrls'][0].substring(Values[0]['storyFileUrls'][0].lastIndexOf('/')+1, Values[0]['storyFileUrls'][0].length);
            // filename = filename.split('+').join("");
            // console.log(filename);


            var animationsNeedDownload = [];
            checkIfFilesExist(https, fs, animationsNeedDownload, Values[1]['storyFileUrls'], 0 , 
            Values[1]['storyFileUrls'].length, animationNames, res);
            // testfunc(0, res);
            // downloadAllAnimations(https, fs, Values[0]['storyFileUrls'], animationNames, 0, 
            // animationsNeedDownload.length,
            // // Values[0]['storyFileUrls'].length, 
            // res, animationsNeedDownload);

            // res.status(200).json({
            //     message: 7,
            //     // message: Values.toString(),
            //     listOfStoryURLS: []
            // });   


            // animationNames.push(filename);
            // var file = fs.createWriteStream('./server/static/animations/'.concat(filename));
                
            // https.get(Values[0]['storyFileUrls'][0], function(response) {



            //     response.pipe(file);

            //     file.on('finish', function() {
            //       console.log('SERVER: ANIMATION DOWNLOADED FROM SERVER: ',Values[0]['storyFileUrls'][0]);
            //       file.close();  // close() is async, call cb after close completes.

            //         console.log('SERVER: LAST FILE DOWNLOADED, COMMUNICATING BACK TO FRONTEND');    
            //         res.status(200).json({
            //             message: Values[0]['storyFileUrls'].length,
            //             listOfStoryURLS: animationNames.toString()
            //             // message: 'SERVER: GOT ENTIRE FILE IN A STRING FROM THE FILE: '.concat(newsURL['ContentURLCH'])
            //         });
                  
                  
            //     }).on('error', function(err) { 
            //         console.log(err);
            //         res.status(200).json({
            //             message: -1,
            //             // message: Values.toString(),
            //             listOfStoryURLS: 'no file downloaded or saved'
            //         });
            //         // res.end();                    
            //         // fs.unlink(dest); // Delete the file async. (But we don't check the result)
            //         // if (cb) cb(err.message);
            //       });
                
            //     // response.on('data', function (chunk) {
            //     //     console.log('SERVER: downloading the first animation......');
            //     //         // console.log('SERVER: chuck data: ',chunk);
            //     //         // str += chunk;
            //     // });
                
            //     // response.on('end', function () {
            //     //         // console.log(str);
            //     //         console.log('SERVER FINISHED DOWNLOADING ANIMATION: ',Values[0]['storyFileUrls'][0]);
            //     //         res.status(200).json({
            //     //             message: Values.length,
            //     //             listOfStoryURLS: []
            //     //             // message: 'SERVER: GOT ENTIRE FILE IN A STRING FROM THE FILE: '.concat(newsURL['ContentURLCH'])
            //     //         });                             
            //     // });

            // //   response.pipe(file);
            // //   file.on('finish', function() {
            // //     file.close(cb);
            // //   });
            // });            
            //    
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