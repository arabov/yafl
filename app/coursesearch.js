/**
 * Created by dev on 21.03.14.
 */
var config = require('../lib/config')
    , globals = require('cache')
    , sqlite3 = require('sqlite3').verbose()
    , _ = require('../lib/return.js')
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



(function() {

    var Search = function(obj) {
        this.global = obj.global;
        this.year = obj.year;
        this.number = obj.number;
        this.val = obj.val;
    };

    Search.prototype.byAutor = function(callback) {
        var self = this;
        var res = [];

        data._cacheInstance = true;
        data._global = this.global;
        data._subscripts = [this.year, this.number, 'comments'];

        _.return(data).forEach(function(global) {
            var g = _.return(global).filterNow(function(part) {
                var p = _.return(part).filterNow(function(data) {
                    return data == self.val;
                });

                return p.length !== 0;

            });

            if (g.length !== 0) {
                res.push(g[0]._value);
            } else {
            }

        });
        callback(res);
    };

    Search.prototype.byDate = Search.prototype.byAutor;

    Search.prototype.byWordId = function(callback) {
        var self = this;
        var res = [];

        data._cacheInstance = true;
        data._global = this.global;
        data._subscripts = [this.year, this.number];

        _.return(data).forEach(function(global) {
            //console.log(global);
            var g = _.return(global).filterNow(function(part) {
                var p = _.return(part).filterNow(function(data) {
                    return data == self.val;
                });

                return p.length !== 0;

            });

            if (g.length !== 0) {
                g[0]._subscripts.pop();
                g[0]._subscripts.push('text');
                result = _.return(g[0]);
                result.init();
                res.push(result.value());
            }

        });
        callback(res);
    };

    Search.prototype.byWord = function(callback) {
        var self = this;

        var prepare = db.prepare('SELECT * FROM words');
        prepare.all(function(err, rows) {

            var statement = {};
            statement.rows = rows;
            statement._sqlInstance = true;

            var r = _.return(statement).filter(function(words) {
                return words.word == self.val;
            }).toArray();

            if (r.length !== 0) {
                self.val = r[0].id_word;
                self.byWordId(callback);
            }

        });

    };

    module.exports = Search;

}).call(this);