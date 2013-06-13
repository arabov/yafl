var config = require('./../lib/config.js')
    , globals = require('C:\\Globals\\bin\\cache061')
    , _ = require('../lib/return.js')
    ;

var data = new globals.Cache();

data.open(config.globalsDBconfig, function(error, result){
        if (error) {
            console.log(error);
        }
    }
);

//Globals
data.kill({ global: 'company' });
data.set('company', 1, 'Apple');
data.set('company', 1, 'address', 'city', 'Cupertino');
data.set('company', 1, 'address', 'state', 'CA');
data.set('company', 1, 'address', 'country', 'USA');
data.set('company', 2, 'Google');
data.set('company', 2, 'address', 'city', 'Mountain View');
data.set('company', 2, 'address', 'state', 'CA');
data.set('company', 2, 'address', 'country', 'USA');

data._cacheInstance = true;
data._global = 'company';
data._subscripts = [];

var addr = 'Google office - ';
_.return(data).forEach(function(global) {
    _.return(global).filter(function(company) {
        /*
        {
            _cacheInstance: true,
            _global: 'company',
            _subscripts: [ '1', 'address' ],
            _value: 'Apple'
        }
        {
            _cacheInstance: true,
            _global: 'company',
            _subscripts: [ '2', 'address' ],
            _value: 'Google'
        }
        */
        return company._value === 'Google';
    }).map(function(address) {
            /*
            {
               _cacheInstance: true,
               _global: 'company',
               _subscripts: [ '2', 'address' ],
               _value: 'Google'
            }
            */
            _.return(address).forEach(function(part) {
                _.return(part).forEach(function(value) {
                    addr += value + ' ';
                });
            });
    }).toArray();
});
/* returns: Google office - Mountain View USA CA */

data.close();