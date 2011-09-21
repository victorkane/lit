### lit.js

A literary workshop app based on node.js

See below for installation instructions.

#### "Under construction" of course: that's what makes it interesting.
For now this is a pedagogical effort aimed at acquiring solvency for using a node.js, express.js and couchdb stack.

When it is completed, there will be an active demo site using it. I actually would like to write a flash fiction piece every day using this.

All code and docs, all process for the project, are right here on github; go to [Wiki](https://github.com/victorkane/lit/wiki) for [User Stories](https://github.com/victorkane/lit/wiki/User-stories) and [Architectural Document]((https://github.com/victorkane/lit/wiki/Architecture-document), see [Issue Tracking](https://github.com/victorkane/lit/issues) for project overview and User Manual (when ready).

### Current status 

Following User story has now been implemented by persisting texts by author in Couchdb on the basis of the clean Text prototype originally implemented as a fake data store (based on Express blog example post model):

[Wiki view: As a writer I can work on my texts](/victorkane/lit/wiki/As-a-writer-i-can-work-on-my-texts)

[Implementation issue view: As a writer I can work on my texts](/victorkane/lit/issues/7)

We may now want to refactor the User model along the same lines

Main next step: to go back and finish #6 with full navigation as per [Getting started](/victorkane/lit/wiki/Getting-started).

User profile has already been persisted in CouchDB:

[Wiki view: As a writer I can register as a user and work on my account and profile](https://github.com/victorkane/lit/wiki/As-a-writer-I-can-register-as-a-user-and-work-on-my-account-and-profile)

[Implementation issue view: As a writer I can register as a user and work on my account and profile](https://github.com/victorkane/lit/issues/6)

### Installation

* Install node.js, express.js, couchdb and npm on your system. See [Setting up Cloud App Server with CouchDB, Node.js and Express on Ubuntu 10.04 LTS Part I](http://awebfactory.com.ar/node/467) for detailed instructions, or seek out simple one click installs from homebrew (Mac), apt-get, couchbase and other sources.
* Clone this project: `$ git clone git@github.com:victorkane/lit.git`
* cd into the lit project directory
* Install all dependencies via npm: `npm install`
  * You should see something like the following:

````
$ npm install
express-messages@0.0.2 ./node_modules/express-messages
jade@0.13.0 ./node_modules/jade
mime@1.2.2 ./node_modules/express/node_modules/mime
qs@0.3.0 ./node_modules/express/node_modules/qs
connect@1.6.0 ./node_modules/express/node_modules/connect
express@2.3.11 ./node_modules/express
vargs@0.1.0 ./node_modules/cradle/node_modules/vargs
eyes@0.1.6 ./node_modules/cradle/node_modules/vows/node_modules/eyes
vows@0.5.9 ./node_modules/cradle/node_modules/vows
cradle@0.5.5 ./node_modules/cradle
````

* Prepare CouchDB databases (see also ./couchdb/install.txt
  * cd couchdb
  * Execute the following four commands, which will create two databases and install a default design document for each that the application expects to find (as an alternative, of course the two databases can be created and the design documents created via the regular CouchDB administration interface).
    * Create the `lit_users` database
      * `$ curl -X PUT http://localhost:5984/lit_users`
    * Create the `lit_texts` database
      * `$ curl -X PUT http://localhost:5984/lit_texts`
    * Create the default design document for `lit_users` (file `./couchdb/lit_users.design`) 
      * `$ curl -X PUT http://localhost:5984/lit_users/_design/default -d @lit_users.design`
    * Create the default design document for `lit_texts` (file `./couchdb/lit_texts.design`) 
      * `$ curl -X PUT http://localhost:5984/lit_texts/_design/default -d @lit_texts.design`

Sample run in ./couchdb/install.txt:

````
$ curl -X PUT http://localhost:5984/lit_users
{"ok":true}
$ curl -X PUT http://localhost:5984/lit_texts
{"ok":true}
$ curl -X PUT http://localhost:5984/lit_users/_design/default -d @lit_users.design
{"ok":true,"id":"_design/default","rev":"1-d22ea3c0e94f928461b66228b2aea78b"}
$ curl -X PUT http://localhost:5984/lit_texts/_design/default -d @lit_texts.design
{"ok":true,"id":"_design/default","rev":"1-2d943dded0d253c862d23b366f7ea037"}
$  
````

* Execute app from the project root
  * `node app.js`
* Point your browser at `http://localhost:3000/`
* Click on `Register` to register a user, then login and create some texts and check out the code!

### License
Open Source. Copy Left. What part of "free" and "software" don't we understand? Feel free to fill in the [legal](http://www.fsf.org/licensing) yourself.
