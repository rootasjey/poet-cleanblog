// -----------------------------
// WWW.SIDEFFECT.FR
// -----------------------------
// by Jeremie Corpinot
// http://github.com/rootasjey

var express 		= require('express'),	// web dev framework
	stylus 			= require('stylus'),		// css pre-compiler
	morgan 			= require('morgan'),		// loggin middleware
	nib 			= require('nib'),           // Stylus utilities
    http 			= require('http'),
    path 			= require('path'),
	fs 				= require('fs'),				// file stream
	// bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	jf				= require('jsonfile'),
	util			= require('util'),
	Poet 			= require('poet');


// ---------------
// APP - CREATION
// ---------------
var app = express();
// ----------------
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}


// ---------------------------------------------------
// Set the default views folder
// containing templates
// and the static folder
// ---------------------------------------------------
app.set('port', process.env.PORT || 3004);
app.set('views', __dirname + '/views');	// folder templates
app.set('view engine', 'jade');			// template engine
app.use(morgan('dev'));					// logging output (will log incoming requests to the console)
// app.use(bodyParser());
// app.use(bodyParser.json());				// to suport JSON-encoded bodies
// app.use(bodyParser.urlencoded({			// to suport URL-encoded bodies
// 	extended: true
// }));

app.use(methodOverride());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));

app.use(express.static(__dirname + '/public'));
// static folder containing css, img & others contents
// ---------------------------------------------------

// Poet Blog engine configuration
// ------------------------------
var poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.addRoute('/post/:post', function (req, res, next) {
	var post = poet.helpers.getPost(req.params.post);

	if (post) {
	    res.render('post', { post: post, homeURL: homeURL });
	} else {
	    res.render('includes/404', {title: '404'});
	}
})
.addRoute('/tag/:tag', function (req, res, next) {
  var posts = poet.helpers.postsWithTag(req.params.tag);
  if (posts) {
    res.render('tag', { posts: posts });
  } else {
	res.render('includes/404', {title: '404'});
  }
}).init();


// -------------------------------
// -----------ROUTING ------------
// -------------------------------

// Home
app.get('/', function (req, res) {
    var posts = poet.helpers.getPosts(0,5);
    homeURL = req.protocol + '://' + req.get('host') + req.originalUrl;

    if (posts) {
        res.render('posts', { posts: posts, homeURL: homeURL });
    } else {
        res.render('includes/404', { title: '404' });
    }
})

.get('/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
})

.get('/sitemap.xml', function (req, res) {
  // Only get the latest posts
  var postCount = poet.helpers.getPostCount();
  var posts = poet.helpers.getPosts(0, postCount);
  res.setHeader('Content-Type', 'application/xml');
  res.render('blog/sitemap', { posts: posts });
})


// Handle inexistant routes
.use(function (req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// next();

    res.render('includes/404', {title: '404'});
});


// listen port => server start
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port: " + app.get('port'));
});
