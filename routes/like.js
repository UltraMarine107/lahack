var neww = require('../new.json');
var hot = require('../hot.json');

exports.like = function(req, res){
	var content = req.query.like;
	var num_like = 0;

	var onHot = false;
	for (var i = 0; i < hot.posts.length; i++){
		if (hot.posts[i].content === content){
			hot.posts[i].likes += 1;
			onHot = true;
			
			for (var k = 1; k <= i; k++){
		if (hot.posts[i].likes < hot.posts[i-k].likes){
					break;
				}
			}
			k--;

			var newArray = [];
			for (var j = 0; j < i - k; j++){
				newArray.push(hot.posts[j]);
			}
			newArray.push(hot.posts[i]);
			for (var j = i - k; j < i; j++){
				newArray.push(hot.posts[j]);
			}
			for (var j = i + 1; j < hot.posts.length; j++){
				newArray.push(hot.posts[j]);
			}
			hot.posts = newArray;

			break;
		}
	}

	var j;
	for (j = 0; j < neww.posts.length; j++){
		if (neww.posts[j].content === content){
			neww.posts[j].likes += 1;
			break;
		}
	}

	if (!onHot){ //TODO Change max posts from 3 to 10
		if (hot.posts.length < 3){ //TODO Put newest on top
			hot.posts.push(neww.posts[j]);
		}
		else if (hot.posts[2].likes == 1){
                        var newArray = [];
                        for (var i = 0; i < 2; i++)
                                newArray.push(hot.posts[i]);
                        newArray.push(neww.posts[j]);
                        hot.posts = newArray;
		}
	}

	return res.redirect(req.query.page);
}
