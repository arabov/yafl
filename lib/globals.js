var globals = require('C:\\Globals\\bin\\cache061');

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