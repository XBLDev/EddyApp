# EddyApp
Educational App made with ReactNative/ReactJS + Lottie/Bodymovin Plugin. Currently hosted on Amazon EC2, Ubuntu instance.

Comment 19/12/2017: 7:50:

Now each animation is downloaded to its dedicated folder along with the image files it uses to be rendered properly.

Comment 01/12/2017, 6:56:

Added a simple animation JSON file uploader, basically use FileReader.readAsArrayBuffer(f) to read the file, and use 
the returned arraybuffer in the callback function as the body to upload to S3.

Comment 15/11/2017, 5:27:

Tested 2 animations, the same error that happens when testing other animations which use images, they don't seem to work on android. Post issue about this: https://github.com/airbnb/lottie-react-native/issues/228

It seems that with at least ReactBodymovin, certain file names won't be recognised if it contains some symbols such as %. Getting rid of the symbol from the file name solves the problem.

Given the time it takes to develop app on android and the usability of animations on android, it's probably worth consider shifting the development to web and make the app mobile-friendly, which will provide the same service and shorten the development time.

Comment 31/10/2017, 5:04:

The backend can now check if the story animations are already downloaded with a recursive function, and if the animations are already downloaded they won't be again, only the non-exist animations will be downloaded, and the front end gets the animations and load them immediately. The next step would be to let the backend when downloading the animations create a sub-directory in the animation folder based on the story number got from the front end XMLHttp request, and the next time it gets another request demanding the animations for the same story, it check if animations exist in that sub-directory. Also since some animations require images, S3 has to keep the images for each story and these images have to be downloaded as well.

Comment 30/10/2017, 4:26:

The front end now can wait the backend to download all the animations, and use the downloaded animations paths it gets from the backend
to load the animations so now it has no need to hardcode the path URLs in the frontend anymore, as long as the front end can pass a story
number to the backend it will eventually get a list of URLs which tell the frontend where the animations are.

Comment 27/10/2017, 8:10:

The front end now waits for the backend to download and return a list of the downloaded files on the server backend, before it loads
the animations. Next possible improvements are letting the backend check whether the animationsn of a story are already downloaded, 
and letting the front end load the animations from backend instead of frontend like it does now.

Comment 26/10/2017, 5:54:

The files of a certain story can now be downloaded using a recursive function which passes https, fs, animation array, 
current iteration number, total iteration number needed, and the res which returns the message as its parameters, and when 
the current iteration number is not total iteration number, upon finishing downloading one file it calls the function recursively
with an increased iteration number, and when it reaches maximum iteration, res returns the message.

Now it is possible for the front end to choose different stories by passing story number as a parameter and let the backend 
download the missing animations needed. To save the number of downloading maybe the backend can first check the files kept in the
backend first, and download only the missing ones.

Comment 25/10/2017, 3:33:

The file can now be properly downloaded to the animation folder on server. Previously the problem was that, because nodemon 
refreshes the whole thing whenever a file is added/modified/deleted, and it happens right after the download is finished and 
the filestream is ready to write all that data to a file, therefore the file is never properly added, or rather it's always 
empty because the filestream never actaully gets a chance to write, and the frontend gets no message also because of this. The
solution is that I use nodemon and webpack to compile whenever I make a code change, and use node command to run the app when 
I want to see the actual result, this way it won't refresh itself when a file is downloaded/added.

Tried downloading and writing multiple files with https request and filestream with a simple for loop, doesn't work. The idea
is that when the var i reaches the maximum number of URL - 1 it sends the JSON back and end everything, but it gives something 
like memory leak detected error, and the frontend never gets anything. Maybe I have to use a recursive function that takes 
the maximum number of animations as a parameter.

Comment 23/10/2017, 8:26:

The backend now can download an animation based on an animation URL and save it on a temp folder on server. 

Presumably in the future if an user already got a story, then the same user should be able to access the story when logged in. 
If the backend doesn't want to re-download everything whenever an user chooses a story, then maybe the temp folder should exist
on the backend, until for some reason the server decides to delete some files, perhaps to make room for some other animations.

The async function of writing stream to a file should be happening after the file is completely loaded, but it seems that will 
pipe function, it can be omitted. The downloaded file sometimes is 0 sized for some reason, will investigate later.

Comment 20/10/2017, 3:47:

Updates today:

1. Added the mobile/Android version of this app, the original code needs to be upgraded/modified because of RN/Lottie version
upgrades, therefore it will take a while before it can catch up.

2. The frond end now can read/get list of story animation URLs from backend, which reads the records from MongoDB from mLab.
This is to prepare for future large-scale development: currently for an animation to play, the file has to be put on the server
first, and hard coded into the program. In the future ideally the user can choose a story at the front end, and once a story is 
chosen it can get the URLs of animations which are Amazon S3, download them to a folder, and play them one by one. This way the 
server can host only the code necessary, and keep the files on S3, which is more suitable for file storage.
A self-note: for a mongoose model, unless defined a collection name when the model is defined, it won't find anything from any 
collection, even if the collection shares the same name with the model.

3. The size of the animation is for now semi-adjustable: because the animation scales itself with the width of its container no 
matter how the CSS is set, the only way to stop it from scaling seems to be setting a max-width to its container. It's no 
good but at least for now the animation won't stretch itself all the way out of the screen. 

Comment 11/10/2017, 2:43:

Attempted making the size of the Bodymovin animation responsive, or at least fit into the surrounding styled div tags, but
failed, the size of animations, or rather the size of "ReactBodymovin" element, is still not adjustable. For now the bottom
contact links are removed so it won't look weird with the animation going through it.

The problem is possibly related to the "preserveAspectRatio" attribute. A post that addresses the issue: https://github.com/bodymovin/bodymovin/issues/85

Comment 10/10/2017, 5:49:

I think ReactJS + NodeJS + Amazon EC2 is a better stack than ReactJS + Meteor, because of the speed of development:
with Meteor I have to spend lots of time uploading the whole thing to the Galaxy server before I can see the result
on the web, but with EC2 Ubuntu server I can just connect to it with Putty, edit the files win winscp, and restart
the server anytime I want. Therefore from now on if possbile I'll use EC2 for all ReactJS development, and RN development
too if possible.

2 out of 7 animations don't work, and they both give a "EffectManager" not defined error. A post by the original 
bodymovin author can be found here: https://github.com/bodymovin/bodymovin/issues/412, don't really know the cause,
hopefully it will be solved soon.
