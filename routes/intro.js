exports.view = function(req, res, next){
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

	res.render('intro', {});
}
