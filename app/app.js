var express = require('express')
    , http = require('http')
    , path = require('path')
    , Search = require('./coursesearch.js')
    ;




// all environments
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/getcommentbyautor', function(req, res) {
    new Search(req.body).byAutor(function(result) {
        res.send(result);
    });
});

app.post('/getcommentbydate', function(req, res) {
    new Search(req.body).byAutor(function(result) {
        res.send(result);
    });
});

app.post('/getpartbywordid', function(req, res) {
    new Search(req.body).byWordId(function(result) {
        res.send(result);
    });
});

app.post('/getpartbyword', function(req, res) {
    new Search(req.body).byWord(function(result) {
        res.send(result);
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

