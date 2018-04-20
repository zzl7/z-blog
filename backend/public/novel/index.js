// $.ajax({
//     url: '/book/by-categories?gender=male&type=hot&major=%E5%A5%87%E5%B9%BB&minor=&start=0&limit=20',
//     type: 'GET',
//     success: function (res) {
//         var html = '';
//         for (var i = 0; i < res.books.length; i++) {
//             html += '<li data-id="' + res.books[i]._id + '"><a href="#">' + res.books[i].title + '</a></li>'
//         }
//         $("#novel").html(html);

//         $("#novel li").click(function () {
//             // var id = $(this).attr('data-id');
//             var id = $(this).attr('data-id');

//             $.ajax({
//                 url: '/atoc?view=summary&book=' + id,
//                 type: 'GET',
//                 success: function (data) {
//                     var bookid = '5acb34a6e36bd0e811d3106b';
//                     // for (var j = 0; j < data.length; j++) {
//                     //     if (data[j].source == 'biquge') {
//                     //         bookid = data[j]._id
//                     //     }
//                     // }
//                     $.ajax({
//                         url: '/atoc/' + bookid + '?view=chapters',
//                         type: 'GET',
//                         success: function (chapters) {
//                             var chaptersHtml = '';
//                             for (var i = 0; i < chapters.chapters.length; i++) {
//                                 chaptersHtml += '<li data-link="' + chapters.chapters[i].link + '"><a href="#">' + chapters.chapters[i].title + '</a></li>'
//                             }
//                             $("#chapters").html(chaptersHtml);
//                             $("#chapters li").click(function () {
//                                 var link = $(this).attr('data-link');
//                                 $.ajax({
//                                     url: '/chapter/' + link,
//                                     type: 'GET',
//                                     success: function (content) {
//                                         $("#chapterTitle").html(content.chapter.title);
//                                         $("#content").html(content.chapter.body);
//                                     }
//                                 })
//                             })
//                         }
//                     })

//                 }
//             })
//         })
//     }
// })
//凡人修仙传
$(function () {
    $("#searchBtn").click(function () {
        var keyword = $("#search").val();

        $.ajax({
            url: '/v1/novel/' + encodeURI(keyword) + '/search',
            type: 'GET',
            success: function (res) {
                $("#searchRes").html(res.text);
                var html = '';
                for (var i = 0; i < res.bookList.length; i++) {
                    html += '<li data-link="' + res.bookList[i].link + '">';
                    html += '<div class="book-name">' + res.bookList[i].name + '</div>';
                    html += '<div >作者: ' + res.bookList[i].author + '</div>';
                    html += '<div >最新章节: ' + res.bookList[i].updateName + '</div>';
                    html += '</li>'
                }
                $("#novel").show();
                $("#searchRes").show();
                $("#chapters").hide();
                $("#content").hide();
                $("#chapterTitle").hide();
                $("#novel").html(html);


                $("#novel li").click(function () {

                    var link = $(this).attr('data-link');
                    showList(link)

                });

            }
        })
    })
})

function showList(link) {
    $.ajax({
        url: '/v1/novel/list?link=' + link,
        type: 'get',
        success: function (content) {
            // $("#chapterTitle").html(content.chapter.title);
            // $("#content").html(content.chapter.body);
            var chaptersHtml = '';
            for (var i = 0; i < content.length; i++) {
                chaptersHtml += '<li data-link="' + content[i].link + '"><a href="#">' + content[i].text + '</a></li>'
            }
            $("#novel").hide();
            $("#searchRes").hide();
            $("#chapterTitle").hide();
            $("#content").hide();
            $("#chapters").show();
            $("#chapters").html(chaptersHtml);
            $("#chapters li").click(function () {
                var contentLink = $(this).attr('data-link');
                showContent(contentLink)
            })
        }
    });
}
function showContent(link) {
    $.ajax({
        url: '/v1/novel/chapter?link=' + link,
        type: 'GET',
        success: function (chapterRes) {
            $("#chapters").hide();
            $("#content").show();
            $("#chapterTitle").show();
            var html = '<span>' + chapterRes.title + '</span>';
            html += '<a href="#" data-link="' + chapterRes.preChapter + '" class="preChapter">上一章</li>';
            html += '<a href="#" data-link="' + chapterRes.list + '" class="list">列表</li>';
            html += '<a href="#" data-link="' + chapterRes.nextChapter + '" class="nextChapter">下一章</li>';
            $("#chapterTitle").html(html);
            $("#content").html(chapterRes.content.replace(/\n\n/g, "<br>").replace(/1t/g, 'lt').replace('http://www.biquge.lu/book', ''))
            $("#content").append('<div class="bottom">' + html + '</div>');
            $(".preChapter").click(function(){
                var preLink = $(this).attr('data-link');
                showContent(preLink);
            })

            $(".nextChapter").click(function(){
                var nextLink = $(this).attr('data-link');
                console.log(nextLink, 'nextLink');
                if(!nextLink.match('html')){
                    console.log(nextLink, 'nextLink');
                    showList(nextLink);
                }else{
                    showContent(nextLink);
                }
            })
            $(".list").click(function(){
                var listLink = $(this).attr('data-link');
                showList(listLink);
                
                
            })
        }
    })
}
