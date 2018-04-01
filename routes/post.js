var neww = require('../new.json');

exports.post = function(req, res){
	var time = new Date();
	var rand = Math.random();
	var color = "";

	if (rand > 0.5)
		color = "#00a1f1";
	else
		color = "blue";

	var content = req.query.post;

	if (content == "")
		return res.redirect("new");

	if (content.length > 140)
		content = content.substring(0, 140);

	var post = {"content": content, "likes": 0, 
			'color': color, "likedby": []};
	var newArray = [];
	newArray.push(post)

	var count = 0;
	for (var i = 0; i < neww.posts.length; i++){
		newArray.push(neww.posts[i]);
		count++;
	
		if (count == 11)
			break;
	}
	neww.posts = newArray;

	return res.redirect('/new');
}
