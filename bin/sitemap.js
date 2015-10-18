#!/usr/bin/env node
require('shelljs/global');
var fs = require('fs');
var path = require('path');
  
var files = fs.readdirSync('.');
function htmlFilter(item){
    return path.extname(item) === '.html'
}
var html = files.filter(htmlFilter);
console.log(html);
var titleBox = [];
function titleGraber(item){
	var page = fs.readFileSync(item,'utf-8');
	var title = page.match(/<title>(.*)<\/title>/)[1];
	titleBox.push(title);
	
}

html.forEach(titleGraber);
console.log(titleBox);
