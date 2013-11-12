/*
 * GET home page.
 */
var db = require('../models/db');

exports.index = function(req, res){
	db.list(function(results){
		res.render('index', { title: 'Url Shortener', links: results });
	});
};

exports.saveUrl = function(req, res){
	
	var long_url = req.body.long_url;

	// ユーザ入力で【http://】と【https://】の存在を検証する
	long_url = (long_url.substring(0,7) != 'http://' && long_url.substring(0,8) != 'https://'? 'http://'+ long_url : long_url);
	var short_url = convertRandom();

	// データベースにデータ行入って機能を呼び出し
	db.insert(short_url, long_url);
	res.redirect('/');
};

exports.redirectUrl = function(req, res){
	
	var short_url = req.params.short_url;
	// データベースの行を見せて機能を呼び出し
	db.show(short_url, function(result){
		res.redirect(result.long_url);
	});
};


// 乱数を作成機能
function convertRandom(){
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var random = Math.random().toString(36).substring(2);
	currentTime =  hours + minutes + seconds;
	random = random.slice(-5) + currentTime;
	// 貰ったランダムへCrytoを使って変更する
	random = crypto.createHash('md5').update(random).digest("hex").slice(-6);  
	return random;
};
