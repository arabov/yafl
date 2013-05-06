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

myData.set("numbers", 1, "one");
myData.set("numbers", 2, "two");
myData.set("numbers", 3, "three");
myData.set("numbers", 4, "four");


myData._cacheInstance = true;
myData._global = 'numbers';

var db = _.return(myData);

db.mapNow(function(a) {
    console.log(a);
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