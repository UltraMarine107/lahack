var neww = require('../new.json');
var hot = require('../hot.json');

function cookie_check(cookie, likedby){
	for (var i = 0; i < likedby.length; i++){
                if (cookie === likedby[i]){
                        return true;
                }
        }
	return false;
}

exports.like = function(req, res){
	var content = req.query.like;
	var num_like = 0;
	var cookie = req.cookies.cookieName;
	var page = req.query.page;
	console.log(cookie);

	var onHot = false;
	for (var i = 0; i < hot.posts.length; i++){
		if (hot.posts[i].content === content){
			console.log(hot.posts[i].likedby);
			if (cookie_check(cookie, hot.posts[i].likedby))
				return res.redirect(page);

			hot.posts[i].likedby.push(cookie);
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
			if(cookie_check(cookie, neww.posts[j].likedby))
				return res.redirect(page);
			
			neww.posts[j].likedby.push(cookie);

			neww.posts[j].likes += 1;
			break;
		}
	}

	if (!onHot){ 
		var color = ""
		var rand = Math.random();
		
	        if (rand > 0.5)
        	        color = "#00a1f1";
        	else
                	color = "blue";

		var newHot = {"content": content, 
				"likes": neww.posts[j].likes,
				"color": color,
				"likedby": neww.posts[j].likedby};

		if (hot.posts.length < 12){ //TODO Put newest on top
			hot.posts.push(newHot);
		}
		else if (hot.posts[11].likes == neww.posts[j].likes){
                        var newArray = [];
                        for (var i = 0; i < 11; i++){
                                newArray.push(hot.posts[i]);
			}
                        newArray.push(newHot);
                        hot.posts = newArray;
		}
	}

	return res.redirect(page);
}
