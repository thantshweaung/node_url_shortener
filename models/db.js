var pg = require('pg');
var conString = "pg://root:rootuser@localhost:5432/URL_SHOTERNER";
var client = new pg.Client(conString);
var results = [];
var result;

client.connect();

//　データベースにデータレコードを入って機能
insert = function(short_url, long_url){
	var insertSql = client.query("INSERT INTO urls(short_url, long_url) VALUES($1,$2)",[short_url, long_url]);
};

// データベースの全て行を見せて機能
list = function(fn){
	var selectSql = client.query("SELECT * FROM urls"); 
	selectSql.on("row", function(row){
		results.push(row);
	});
	selectSql.on("end", function(){
		fn(results);
		results = [];
	});
};

// データベースの一行を見せて機能
show = function(short_url, fn){
	var showSql = client.query("SELECT * FROM urls WHERE short_url = $1", [short_url]);
	showSql.on("row", function(row){
		result = row;
		fn(result);
	});
};




exports.insert = insert;
exports.list = list;
exports.show = show;