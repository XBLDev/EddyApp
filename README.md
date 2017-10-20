# EddyApp
Educational App made with ReactNative/ReactJS + Lottie/Bodymovin Plugin. Currently hosted on Amazon EC2, Ubuntu instance.

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
