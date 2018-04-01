
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var app = express();

var intro = require('./routes/intro');
var neww = require('./routes/new');
var hot = require('./routes/hot');
var post = require('./routes/post');
var like = require('./routes/like');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(express.cookieParser());

/*
app.use(function (req, res, next){
	var cookie = req.cookies.cookieName;
	if (cookie === undefined){
		var randomNumber = Math.random().toString();
		randomNumber = randomNumber.substring(2, randomNumber.length);
		res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
		console.log('cookie created successfully');
	}
	else{
		console.log('Cookie exists');
	}
	next();
})
*/

app.use(express.static(__dirname + '/public'));

// Add routes here
app.get('/', intro.view);

app.get('/intro', intro.view);
app.get('/new', neww.view);
app.get('/hot', hot.view);
app.get('/post', post.post);
app.get('/like', like.like);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
