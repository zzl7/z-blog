
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
                    html += '<div >' + res.bookList[i].author + '</div>';
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
