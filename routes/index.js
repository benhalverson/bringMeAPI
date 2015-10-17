var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var passport = require('passport');
var mongoose = require('mongoose');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Vendor = mongoose.model('Vendor');
var City = mongoose.model('City');
var Product = mongoose.model('Product');


router.get('/posts', function(req, res, next) {
	console.log('hihih');
	
	Post.find(function(err, posts) {
		if (err) { next(err); }

		res.json(posts);
	})
});

router.post('/posts', auth, function(req, res, next) {
	var post = new Post(req.body);
	post.author = req.payload.username;

	post.save(function(err, post) {
		if (err) { return next(err); }

		res.json(post);
	});
});

router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function (err, post) {
		if (err) { return next(err); }
		if (!post) { return next(new Error("can't find the post")); }
		
		req.post = post;
		return next();
	})
});

router.get('/posts/:post', function(req, res) {
	res.json(req.post);
});

router.put('/posts/:post/upvote', auth, function(req, res, next) {
	req.post.upvote(function(err, post) {
		if (err) { return next(err); }

		res.json(post);
	});
});

router.post('/posts/:post/comments', auth, function(req, res, next) {
	var comment = new Comment(req.body);
	comment.post = req.post;
	comment.author = req.payload.username;

	comment.save(function(err, comment) {
		if(err) { return next(err); }

		req.post.comments.push(comment);
		req.post.save(function(err, post) {
			if (err) {return next(err); }

			res.json(comment);
		});
	});
});

router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
	req.comment.upvote(function(err, comment) {
		if (err) { return next(err); }

		res.json(comment);
	});
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password);

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/* List cities that we are currently supporting */
router.get('/cities', function(req, res, next) {
	City.find(function(err, cities) {
		if (err) { next(err); }

		res.json(cities);
	})
});


/*
*  Below APIs are for BringMe's admins
*  
*  TODO: create admin database
*
*/

router.post('/city', function(req, res, next){
	var city = new City(req.body);

	city.save(function(err, city) {
		if (err) { return next(err); }
		res.json(city);
	});
});

router.param('vendor', function(req, res, next, id) {
	var query = Vendor.findOneById(id);

	query.exec(function (err, vendor) {
		if (err) { return next(err); }
		if (!vendor) { return next(new Error("can't find the vendor")); }
		
		req.vendor = vendor;
		return next();
	})
});

router.get('/vendors/:vendor_name', function(req, res, next) {
	var vendor_name = req.params.vendor_name;
	Vendor.findOne({ 'name': vendor_name }, function (err, vendor) {
	  if (err) return next(err);
	  res.json(vendor);
	});
});

router.post('/vendors', function(req, res, next){
	var vendor = new Vendor();
	vendor.name = req.body.name;


	// Find City's id based on city's name
	City.findOne({name:req.body.city}, function(err, city) {
		if (err) return next(err);
		vendor.city = city;

		// Save the vendor instance
		vendor.save(function(err, vendor) {
			if (err) { return next(err); }
			res.json(vendor);
		});

	});
	
});

router.post('/vendors/:vendor_id/products', function(req, res, next){
	console.log(req.body);
	var product = new Product(req.body);

	console.log(product);

	product.save(function(err, product) {
		if (err) { return next(err); }
		res.json(product);
	});
	
});



module.exports = router;
