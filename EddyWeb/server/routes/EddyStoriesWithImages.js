var mongoose = require('mongoose')

const express = require('express');

const router = new express.Router();

const EddyStoryWithImageModel = mongoose.model('EddyStoryWithImages');

var conn = mongoose.connection;

EddyStoryWithImageModel.find().count(function(err, count){

    if(!err)
    {
        console.log('FOUND EDDYSTORIES WITH IMAGES ON START, COUNT: ', count);
        if(count == 0)
        {
            console.log('FOUND COUNT OF EDDYSTORIES WITH IMAGES ON START 0, ADDING 1 DEFAULT STORIES', );
            var Story1 = 
            {
                storyName: "story1withimages",
                storyFileUrls:
                [
                    ["someurl", 10],
                    ["someurl", 10],
                    ["someurl", 0]                    
                    
                ]
            };

            conn.collection('eddystorywithimages').insert(Story1, function(err, records){
                if(err)
                {
                   console.log('error insert 1st story with images');
                }
                else
                {
                    console.log('inserted 1st story with images');
                }
            });     
                            
        }
        else
        {
            console.log('FOUND COUNT OF EDDYSTORIES WITH IMAGES ON START: ', count);
                        
        }
    }
    else
    {
        console.log('CAN NOT FIND EDDYSTORIES WITH IMAGES ON START');
        
    }    
})


function downloadImagesForAnimation(p_https, p_fs, 
    totalnumberofimages, currentNumberOfImage, pathwayforimages, 
    currentNumberOfAnimation,
    arrayOfFileUrls, animationNames,
    totalNumberOfAnimations, res, animationsNeedDownload
)
{
    if(currentNumberOfImage == totalnumberofimages)
    {
        console.log('BACKEND: finished downloading images for current animation');
        downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, animationNames, 
            currentNumberOfAnimation+1, totalNumberOfAnimations, res, animationsNeedDownload);   
    }
    else
    {

        var imageFileURL = arrayOfFileUrls[currentNumberOfAnimation][0].substring(
            0, arrayOfFileUrls[currentNumberOfAnimation][0].lastIndexOf('/')+1).concat('images/')
            .concat('img_').concat(currentNumberOfImage.toString()).concat('.png');
            
        var file = p_fs.createWriteStream(
            pathwayforimages.concat('/').concat('img_').concat(currentNumberOfImage.toString()).concat('.png'));
        
        p_https.get(imageFileURL, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                console.log('SERVER: IMAGE DOWNLOADED FROM SERVER: ',imageFileURL);
                file.close();

                downloadImagesForAnimation(p_https, p_fs, 
                    totalnumberofimages, currentNumberOfImage + 1, pathwayforimages, 
                    currentNumberOfAnimation,
                    arrayOfFileUrls, animationNames,
                    totalNumberOfAnimations, res, animationsNeedDownload
                );                      

            }).on('error', function(err) { 
                console.log(err);
                file.close();
                res.status(200).json({
                    message: 1,
                    listOfStoryURLS: ["./animations/Group3Image1.json"]
            });   
            });            
        });


    }    
}


function downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, animationNames, currentNumberOfAnimation, 
    totalNumberOfAnimations, res, animationsNeedDownload)
{

    if(currentNumberOfAnimation == totalNumberOfAnimations)
    {
        console.log('BACKEND: downloadAllAnimations finished');

        for(var i = 0; i< arrayOfFileUrls.length; i++)
        {
            var filename = arrayOfFileUrls[i][0];
            var jsonfilename = filename.substring(filename.lastIndexOf('/')+1, filename.length);
            jsonfilename = jsonfilename.split('+').join(""); 

            filename = filename.substring
            (0, 
            filename.lastIndexOf('/'));
            var foldername = filename.substring
             (filename.lastIndexOf('/')+1, 
              filename.length);
            // console.log(filename);
            animationNames.push('./animations/'.concat(foldername).concat('/').concat(jsonfilename));
            
        }

        res.status(200).json({
                message: arrayOfFileUrls.length,
                listOfStoryURLS: animationNames 
        });   
    }
    else
    {
        var filename = animationsNeedDownload[currentNumberOfAnimation][0];
        filename = filename.split('+').join(""); 
        
        var jsonfilename = filename.substring
        (filename.lastIndexOf('/')+1, 
         filename.length);

        var numberofimages = animationsNeedDownload[currentNumberOfAnimation][1];
        var foldername = animationsNeedDownload[currentNumberOfAnimation][2];
        
        if (!p_fs.existsSync('./server/static/animations/'.concat(foldername))){
            p_fs.mkdirSync('./server/static/animations/'.concat(foldername));
        }
        if(numberofimages !== 0)
        {
            if (!p_fs.existsSync('./server/static/animations/'.concat(foldername).concat('/images'))){
                p_fs.mkdirSync('./server/static/animations/'.concat(foldername).concat('/images'));
            }
        }
        var file = p_fs.createWriteStream('./server/static/animations/'.concat(foldername).concat('/').concat(jsonfilename));
        p_https.get(animationsNeedDownload[currentNumberOfAnimation][0], function(response) {
            response.pipe(file);
            file.on('finish', function() {
                console.log('SERVER: ANIMATION DOWNLOADED FROM SERVER: ',animationsNeedDownload[currentNumberOfAnimation][0]);
                file.close();
                if(numberofimages !== 0)
                {
                    downloadImagesForAnimation(p_https, p_fs, 
                        numberofimages, 0, './server/static/animations/'.concat(foldername).concat('/images'), 
                        currentNumberOfAnimation,
                        arrayOfFileUrls, animationNames,
                        totalNumberOfAnimations, res, animationsNeedDownload
                    );
                }
                else
                {
                    downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, animationNames, 
                        currentNumberOfAnimation+1, totalNumberOfAnimations, res, animationsNeedDownload);   
                }                
                 
            }).on('error', function(err) { 
                console.log(err);
                file.close();
                res.status(200).json({
                    message: 1,
                    listOfStoryURLS: ["./animations/Group3Image1.json"]
            });   
            });            
        });

    }    

}



function checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation, 
    totalNumberOfAnimations, animationNames, res)
{
    if(currentNumberOfAnimation != totalNumberOfAnimations)
    {

        var filename = arrayOfFileUrls[currentNumberOfAnimation][0];
        var jsonfilename = filename.substring
        (filename.lastIndexOf('/')+1, 
         filename.length);

        filename = filename.substring
        (0, 
        filename.lastIndexOf('/'));
        var foldername = filename.substring
         (filename.lastIndexOf('/')+1, 
          filename.length);

        p_fs.stat('./server/static/animations/'.concat(foldername).concat('/').concat(jsonfilename), function(err, stat) {
            if(err == null) {
                console.log('File: ',filename,' exists, no need to download');
                checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation+1, 
                    totalNumberOfAnimations, animationNames, res);

            } else if(err.code == 'ENOENT') {

                console.log('File: ',filename,
                ' needs to be downloaded TO: ./server/static/animations/'.concat(foldername).concat('/').concat(jsonfilename));
                downloadAnimationArray.push(
                    [arrayOfFileUrls[currentNumberOfAnimation][0], 
                    arrayOfFileUrls[currentNumberOfAnimation][1],
                    foldername]
                );
                checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation+1, 
                    totalNumberOfAnimations, animationNames, res);
            } else {
                console.log('Some other error: ', err.code);
                checkIfFilesExist(p_https, p_fs, downloadAnimationArray, arrayOfFileUrls, currentNumberOfAnimation+1, 
                    totalNumberOfAnimations, animationNames, res);

            }
        });

    }
    else
    {
        console.log('BACKEND: ALL RECORDS READ');
        downloadAllAnimations(p_https, p_fs, arrayOfFileUrls, animationNames, 0, 
        downloadAnimationArray.length,
        res, downloadAnimationArray);

      
    }    
}




router.get('/EddyStoriesWithImages', (req, res) => {
    console.log("BACKEND: GET EddyStoriesWithImages CALLED");

    EddyStoryWithImageModel.find({}, 'storyFileUrls -_id', function(err, Values){
        if(err)
        {
            console.log(err);
            res.status(200).json({
                message: 1,
                listOfStoryURLS: ["./animations/Group3Image1.json"]
            });    
        }
        else
        {

            var fs = require('fs');
            var https = require('https');
            var animationNames = [];
            var animationsNeedDownload = [];

            checkIfFilesExist(https, fs, animationsNeedDownload, Values[0].storyFileUrls, 0 , 
                Values[0].storyFileUrls.length, animationNames, res);
        
        }
    })        
})    


module.exports = router;