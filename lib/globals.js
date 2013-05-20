var globals = require('C:\\Globals\\bin\\cache061');
var _ = require('../lib/return.js');

var myData = new globals.Cache();

myData.open({
        path: 'C:\\Globals\\mgr',
        username: '_SYSTEM',
        password: 'SYS',
        namespace: 'USER'
    }, function(error, result){
        if (error) {
            console.log(error);
        }
        //console.log(result);
    }
);

myData.set("numbers", 1, 111);
myData.set("numbers", 2, 222);
myData.set("numbers", 3, 333);
myData.set("numbers", 4, 444);
myData.set("numbers", 1, "one", 'answer1');
myData.set("numbers", 2, "two", 'answer2');
myData.set("numbers", 3, "three", 'answer3');
myData.set("numbers", 4, "four", 'answer4');


myData.set("company", 1, "name", "InterSystems");
myData.set("company", 1, "address", "city", "Cambridge");
myData.set("company", 1, "address", "state", "MA");
myData.set("company", 1, "address", "country", "USA");
myData.set("company", 2, "name", "Apple");
myData.set("company", 2, "address", "city", "Cupertino");
myData.set("company", 2, "address", "state", "CA");
myData.set("company", 2, "address", "country", "USA");
myData.set("company", 3, "name", "Google");
myData.set("company", 3, "address", "city", "Mountain View");
myData.set("company", 3, "address", "state", "CA");
myData.set("company", 3, "address", "country", "USA");


myData._cacheInstance = true;
myData._global = 'company';
myData._subscripts = [];

var db = _.return(myData);

db.mapNow(function(a) {
    //console.log(a);
    var next = _.return(a);
    next.mapNow(function(b) {
        console.log(b);
    });
});
//console.log(db.value());
//console.log(db.next());

/*
myData.open({
        path: 'C:\\Globals\\mgr',
        username: '_SYSTEM',
        password: 'SYS',
        namespace: 'USER'
    }, function(error, result){
        if (error) {
            console.log(error);
        }
        console.log(result);
    }
);

myData.set("company", 1, "name", "InterSystems");
myData.set("company", 1, "address", "city", "Cambridge");
myData.set("company", 1, "address", "state", "MA");
myData.set("company", 1, "address", "country", "USA");


myData.data('company');
console.log('data(): ' + myData.get('company',1,'address', 'city'));


myData.close();
*/