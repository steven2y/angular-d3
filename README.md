angular-d3
======================

This is a project just to play around with D3 and angular.

Currently the project only consist of one example

Word Graph
-----------
It will take a sentence and construct a graph connecting all the words.  



Dependencies
-------------
You will need 
* node
* npm
* (optional) nvm if you want to manage your version of node



Installation
-------------
```
npm install
bower install
```

Unit Test
---------
```
grunt unit
```


Feature Test
---------
You'll need to host the files somehow for this so I have set up a small node/express web server.  This will run it on localhost:3000

```
grunt serve
```

You will need the selenium jar file located here.

http://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.2.jar

This needs to be placed alongside this repo.  NOT within it. Currently using version 2.42.2.jar if you want to use a different version change here https://github.com/steven2y/angular-boilerplate-ya/blob/master/test/conf/cuke.protractor.conf.js#L3

To run the test use

```
grunt cucumber
```



What is the setup?
--------------
This projects contains

* AngularJs
* Bootstrap
* D3
* Jquery
* grunt
* bower
* npm
* karma
* jasmine
* phantomjs
* requirejs
* protractor
* cucumberjs



