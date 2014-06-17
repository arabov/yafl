var config = require('./../lib/config.js')
    , _ = require('../lib/return.js')
    , globals = require('cache')
    , sqlite3 = require('sqlite3').verbose()
    ;

var data = new globals.Cache();
var db = new sqlite3.Database(config.sqlite3config.path);


data.open(config.globalsDBconfig, function(error, result){
        if (error) {
            console.log(error);
        }
    }
);

//Globals
data.kill({ global: 'mephi' });
data.set('mephi', '2013-2014');
data.set('mephi', '2013-2014', '920713', 'Исследование и реализация библиотеки языка программирования javascript для работы с различными структурами данными');
data.set('mephi', '2013-2014', '920713', 'introduction', 'Введение');
data.set('mephi', '2013-2014', '920713', 'introduction', 'text', 'Текст введения');
//data.set('mephi', '2013-2014', '920713', 'introduction', 'words', '1,2,3');
data.set('mephi', '2013-2014', '920713', 1, 'Что такое javascript?');
data.set('mephi', '2013-2014', '920713', 1, 'text', 'Текст о javascript');
data.set('mephi', '2013-2014', '920713', 1, 'words', '1');
data.set('mephi', '2013-2014', '920713', 1, 1, 'Что такое SQL?');
data.set('mephi', '2013-2014', '920713', 1, 1, 'text', 'Текст о SQL');
data.set('mephi', '2013-2014', '920713', 1, 1, 'words', '2');
data.set('mephi', '2013-2014', '920713', 2, 'Что такое Node.js?');
data.set('mephi', '2013-2014', '920713', 2, 'text', 'Текст о Node.js');
data.set('mephi', '2013-2014', '920713', 2, 'words', '3');
data.set('mephi', '2013-2014', '920713', 'conclusion', 'Заключение');
data.set('mephi', '2013-2014', '920713', 'conclusion', 'text', 'Текст заключения');
data.set('mephi', '2013-2014', '920713', 'comments', 1, 'Текст комментария 1');
data.set('mephi', '2013-2014', '920713', 'comments', 1, 'autor', 'Таиров Рустам');
data.set('mephi', '2013-2014', '920713', 'comments', 1, 'date', '01.03.2014');
data.set('mephi', '2013-2014', '920713', 'comments', 2, 'Текст комментария 2');
data.set('mephi', '2013-2014', '920713', 'comments', 2, 'autor', 'Лаптев Андрей');
data.set('mephi', '2013-2014', '920713', 'comments', 2, 'date', '01.03.2014');


var getPart = function(n ,wordNum) {
    data._cacheInstance = true;
    data._global = 'mephi';
    data._subscripts = ['2013-2014', n];

    var result = '';
    _.return(data).forEach(function(global) {
        //console.log(global);
        var g = _.return(global).filterNow(function(part) {
            var p = _.return(part).filterNow(function(data) {
                return data == wordNum;
            });

            return p.length !== 0;

        });

        if (g.length !== 0) {
            g[0]._subscripts.pop();
            g[0]._subscripts.push('text');
            result = _.return(g[0]);
            result.init();
            console.log(result.value());
        }

    });
};

var getPartByWord = function(n, word) {
    prepare = db.prepare('SELECT * FROM words');
    prepare.all(function(err, rows) {

        var statement = {};
        statement.rows = rows;
        statement._sqlInstance = true;

        var r = _.return(statement).filter(function(words) {
            //console.log(word);
            return words.word == word;
        }).toArray();

        //console.log(r);
        if (r.length !== 0) {
            getPart(n, r[0].id_word);
        }

    })
};

//getPartByWord('920713','Node.js');

var getPartByGroup = function(n, group) {
    var prepare = db.prepare('SELECT * FROM groups_name');
    prepare.all(function(err, rows) {

        var statement = {};
        statement.rows = rows;
        statement._sqlInstance = true;

        var r = _.return(statement).filter(function(groups) {
            //console.log(groups);
            return groups.name == group;
        }).toArray();

        if (r.length !== 0) {
            //console.log(r[0].id_group);

            var prep = db.prepare('SELECT * FROM groups WHERE id_group = ' + r[0].id_group);
            prep.all(function(err, rows) {
                rows.forEach(function(word) {
                    getPart(n, word.id);
                });
            });
        }

    })
};

//getPartByGroup('920713', 'Средства для разработки');

var getCommentByDate = function(n, date) {
    data._cacheInstance = true;
    data._global = 'mephi';
    data._subscripts = ['2013-2014', n, 'comments'];

    var result = '';
    _.return(data).forEach(function(global) {
        //console.log(global);
        var g = _.return(global).filterNow(function(part) {
            var p = _.return(part).filterNow(function(data) {
                return data == date;
            });

            return p.length !== 0;

        });

        if (g.length !== 0) {
            console.log(g[0]._value);
        }

    });
};

//getCommentByDate('920713', '01.03.2014');

var getCommentByAutor = function(n, autor) {
    data._cacheInstance = true;
    data._global = 'mephi';
    data._subscripts = ['2013-2014', n, 'comments'];


    var result = [];
    _.return(data).forEach(function(global) {
        //console.log(global);
        var g = _.return(global).filterNow(function(part) {
            var p = _.return(part).filterNow(function(data) {
                return data == autor;
            });

            return p.length !== 0;

        });

        if (g.length !== 0) {
            result.push(g[0]._value);
        }

    });
    console.log(result);
};

getCommentByAutor('920713', 'Таиров Рустам');

//getPart(3);


//data.close();
/*
var statement = {};

prepare = db.prepare('SELECT * FROM ' + config.sqlite3config.tableName);
prepare.all(function(err, rows) {

    statement.rows = rows;
    statement._sqlInstance = true;

    var a = _.return(statement).filter(function(student) {
        //console.log(student);
        return ((student.course.match(/УИР и КП/) !== null) && (student.mark === '5'));
    }).toArray();

    console.log(a);
    /*
    _.return(a).forEach(function(student) {
        //console.log(student);
        //console.log('Студент: ' + student.name + ', дата сдачи: ' + student.date);

        data._cacheInstance = true;
        data._global = 'works';
        data._subscripts = ['2013-2014'];

        _.return(data).forEach(function(global) {
            console.log(global);
        });

    });
    */
    /*
    _.return(statement).filter(function(student) {
        //console.log(student);
        return student.name.match(/Петров Петр/) !== null;
    }).forEach(function(student) {
            //student.number;

            data._cacheInstance = true;
            data._global = 'works';
            data._subscripts = ['2013-2014', student.number];

            _.return(data).map(function(global) {
                console.log(global._value);
            }).map(function(works) {
                //console.log(works._value);
                //return works._value == student.number;
            }).map(function(work) {
                //console.log(work._value);
            }).toArray();
        });
    */


