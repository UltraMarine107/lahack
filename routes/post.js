var neww = require('../new.json');

exports.post = function(req, res){
	var time = new Date();
	console.log(neww.posts.length);

	var post = {"content": req.query.post};
	var newArray = [];
	newArray.push(post)

	var count = 0;
	for (var i = 0; i < neww.posts.length; i++){
		newArray.push(neww.posts[i]);
		count++;
	
		if (count == 2)
			break;
	}
	neww.posts = newArray;

	console.log(neww);
	return res.redirect('/new');
}
