# EddyApp
Educational App made with ReactNative/ReactJS + Lottie/Bodymovin Plugin. Currently hosted on Amazon EC2

Comment 10/10/2017, 5:49:

I think ReactJS + NodeJS + Amazon EC2 is a better stack than ReactJS + Meteor, because of the speed of development:
with Meteor I have to spend lots of time uploading the whole thing to the Galaxy server before I can see the result
on the web, but with EC2 Ubuntu server I can just connect to it with Putty, edit the files win winscp, and restart
the server anytime I want. Therefore from now on if possbile I'll use EC2 for all ReactJS development, and RN development
too if possible.

2 out of 7 animations don't work, and they both give a "EffectManager" not defined error. A post by the original 
bodymovin author can be found here: https://github.com/bodymovin/bodymovin/issues/412, don't really know the cause,
hopefully it will be solved soon.