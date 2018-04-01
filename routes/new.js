var neww = require('../new.json');

function cookie_check(cookie, likedby){
        for (var i = 0; i < likedby.length; i++){
                if (cookie === likedby[i]){
                        return true;
                }
        }
        return false;
}

exports.view = function(req, res){
	var cookie = req.cookies.cookieName;

	for (var i = 0; i < neww.posts.length; i++){
		if(cookie_check(cookie, neww.posts[i].likedby))
			neww.posts[i].liked = "#ff5e5e";
		else
			neww.posts[i].liked = "white";
	}

	res.render('new', neww);
}
