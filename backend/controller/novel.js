

// let app = require('express')()
let request = require('request');
let cheerio = require('cheerio');
let iconv = require('iconv-lite');
let { encodeGBK, decodeGBK } = require('gbk-string');
let novel = {
    searchNovel(req, res, next) {
        console.log(req.params.keyword, 'ssss')
        // http://www.biquge.lu/s.php?ie=utf-8&q=%B7%B2%C8%CB%D0%DE%CF%C9%B4%AB
        let params = encodeGBK(req.params.keyword);
        request({url:'http://www.biquge.lu/s.php?ie=gbk&q='+params, encoding: null }, function (req1, htmlData) {
            // res.send('user ' + req.params.id);
            // console.log(html.body);
            let html = iconv.decode(htmlData ? htmlData.body : '', 'gb2312')
            let $ = cheerio.load(html, {decodeEntities: false});
            let text = $('.so_list h2').text();
            let searchList = $('.so_list .type_show').children();
            let bookList = [];
            for(var i=0; i<searchList.length; i++){
                let bookInfo = {};
                let bookHtml = $(searchList[i]).children('.p10').children('.bookinfo')
                bookInfo.link = bookHtml.find('a').attr('href');
                bookInfo.name = bookHtml.find('a').text();
                bookInfotype = bookHtml.children('.cat').text();
                bookInfo.author = bookHtml.children('.author').text();
                bookInfo.updateName = bookHtml.children('.update').find('a').text();
                bookInfo.updateLink = bookHtml.children('.update').find('a').attr('href');
                bookList.push(bookInfo);
            }
            res.send({text: text, bookList: bookList});
        });
    },
    getList(req, res, next){
        let link =  req.query.link;
        console.log(link, 'link');
        request({url:'http://www.biquge.lu'+link, encoding: null }, function (req1, htmlData) {
            // res.send('user ' + req.params.id);
            // console.log(html.body);
            let html = iconv.decode(htmlData ? htmlData.body : '', 'gb2312')
            let $ = cheerio.load(html, {decodeEntities: false});
            let booklistNode = $(".listmain").find('a');
            var bookList = [];
            for(var i=0; i<booklistNode.length; i++){
                let chapter = {};
                chapter.link = $(booklistNode[i]).attr('href');
                chapter.text = $(booklistNode[i]).text();
                bookList.push(chapter);
            }
            res.send(bookList);
        });
    },
    getChapter(req, res, next){
        let link =  req.query.link;
        console.log(link, 'link');
        request({url:'http://www.biquge.lu' + link, encoding: null }, function (req1, htmlData) {
            // res.send('user ' + req.params.id);
            // console.log(html.body);
            let html = iconv.decode(htmlData ? htmlData.body : '', 'gb2312')
            let $ = cheerio.load(html, {decodeEntities: false});
            let title = $(".content h1").text();
            let content = $(".content #content").text().replace('请记住本书首发域名：www.biquge.lu', '').replace('笔趣阁手机版阅读网址：m.biquge.lu', '');
            // let booklistNode = $(".listmain").find('a');
            // var bookList = [];
            // for(var i=0; i<booklistNode.length; i++){
            //     let chapter = {};
            //     chapter.link = $(booklistNode[i]).attr('href');
            //     chapter.text = $(booklistNode[i]).text();
            //     bookList.push(chapter);
            // }
            res.send({title: title, content: content});
        });
    }
}

module.exports = novel;