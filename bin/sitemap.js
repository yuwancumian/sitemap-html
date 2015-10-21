#!/usr/bin/env node
require('shelljs/global');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var files = fs.readdirSync('.');
var str = '';
function htmlFilter(item){
    return path.extname(item) === '.html' && item!== 'page.html';
}
var html = files.filter(htmlFilter);
var titles = [];
function getTitle(item){
	var page = fs.readFileSync(item,'utf-8');
	var title = page.match(/<title>(.*)<\/title>/)[1];
	titles.push(title);
}

html.forEach(getTitle);

var ob = _.zip(html,titles);
function addTag(item){
	str+= '<div>'+ 
		'<a href="' + item[0] + '">'+item[0]+'</a>'+
		'<p>' + item[1] + '</p>'
		+ '</div>'
}
ob.forEach(addTag);
function buildHtml(body){
	return '<!DOCTYPE html><html lang="zh_CN"><head><meta charset="UTF-8"></head><body>'
	+ body + '</body></html>'
}
var data = buildHtml(str); 
fs.writeFile('page.html', data,'utf-8', function(err){
        // console.log(htmlfile);
    if (err) throw err;
    console.log('page.html was saved!');
})
