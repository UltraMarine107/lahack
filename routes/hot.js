exports.view = function(req, res){
	res.render('hot', require('../hot.json'));
}
