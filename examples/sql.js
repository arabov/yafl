/**
 * sql
 * 1:16 - 20.11.13
 * @author Rustam Tairov <rustairov@gmail.com>
 */

var config = require('./../lib/config.js')
    , sqlite3 = require('sqlite3').verbose()
    , _ = require('../lib/return.js')
    ;

db = new sqlite3.Database(config.sqlite3config.path);

/*
db.all('SELECT * FROM test_table', function(err, rows) {
    var statement = {};
    statement.rows = rows;
    statement._sqlInstance = true;

    _.return(statement).forEach(function(obj) {
        console.log(obj);
    });
});
*/

var statement = {};

prepare = db.prepare('SELECT * FROM ' + config.sqlite3config.tableName);
prepare.all(function(err, rows) {

    statement.rows = rows;
    statement._sqlInstance = true;

    _.return(statement).filter(function(student) {
        console.log(student);
        return student.group.match(/K6/) !== null;
    }).map(function(student) {
            console.log(student.name);
        }).toArray();
});


/*
statement.get(function(err, col) {
    console.log(col);
});
*/


/*
_.return(statement).forEach(function(obj) {
    console.log(obj);
});
*/


