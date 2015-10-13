#!/usr/bin/env node
require('shelljs/global');
var fs = require('fs');


var files = fs.readdirSync('.');
function removeOther(item){
	return item.split('.').pop() === 'html'
}
var html = files.filter(removeOther);
console.log(html);

//var about = fs.readFileSync('about.html','utf-8');
//console.log(about);
//console.log(about.match(/<title>(.*?)<\/title>/)[1]);
var title;
function readTitle(item,num){
	fs.readFile(item,'utf-8',function(err,data){
		//title +=data.match(/<title>(.*?)<\/title>/)[0];
		if (data.match(/<title>(.*?)<\/title>/)){
			console.log(data.match(/<title>(.*?)<\/title>/)[1]);
			title += data.match(/<title>(.*?)<\/title>/)[1];
			console.log(title)
		}
		console.log(num);
		if (err){
			console.log(1111);
		}
	})
}

html.forEach(readTitle);
