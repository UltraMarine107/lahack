var hot = require('../hot.json');

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

        for (var i = 0; i < hot.posts.length; i++){
                if(cookie_check(cookie, hot.posts[i].likedby))
                        hot.posts[i].liked = "#ff5e5e";
                else
                        hot.posts[i].liked = "white";
        }

        res.render('hot', hot);
}

