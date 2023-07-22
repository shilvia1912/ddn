// ************************************************************************************************
// Загрузка данных
var search_words = [];
var crypt_groups = [];
var crypt_methods = [];
var crypt_news = [];
var left_blocks = [];
var right_blocks = [];
$.ajax({
    url: "/_js/en/data.js",
    async: false,
    cache: false,
    dataType: "script",
    success: function () {}
});
$.ajax({
    url: "/_js/jquery.rss.js",
    async: false,
    dataType: "script",
    success: function () {}
});
// ************************************************************************************************
// Функции
function form_blocks(blocks)
{
    var result = "";
    for (var i = 0; i < blocks.length; i++)
    {
        var id      = blocks[i][0];
        var title   = blocks[i][1];
        var content = blocks[i][2];
        result = 
            '<div id="block-' + id + '" class="block block-' + id + '">' +
            '   <h2>' + title + '</h2>' +
            '   <div class="content">' + content;
            '   </div>' +
            '</div>';
    }
    return result;
}

function form_right_news()
{
    var right_news = 
        '<div id="block-news" class="block block-news">' +
        '   <h2>News</h2>' +
        '   <div class="content">';
    for (var i = 0; i < crypt_news.length; i++)
    {
        right_news += '<div style="padding-bottom: 10px;"><b>' + crypt_news[i][0] + '</b> - ' + crypt_news[i][1] + '</div>';
    }
    right_news +=
        '   </div>' +
        '</div>';
    return right_news;        
}

function form_left_menu()
{
    var left_menu = 
        '<div id="block-system-main-menu" class="block block-system block-menu">' +
        '    <div class="content">' +
        '        <div id="sidetree">' +
        '            <div class="treeheader"><h2>Encryptions</h2></div>' +
        '            <ul id="tree">';
    for (var i = 0; i < crypt_groups.length; i++)
    {
        left_menu += '<li><span>' + crypt_groups[i] + '</span>';
        left_menu += '<ul>';
        for (var j = 0; j < crypt_methods.length; j++)
        {
            if (crypt_methods[j][2] == i)
            {
                left_menu += '<li><a href="' + crypt_methods[j][1] + '">' + crypt_methods[j][0] + '</a></li>';
            }
        }
        left_menu += '</ul>';
        left_menu += '</li>';
    }
    left_menu += 
        '            </ul>' +
        '        </div>' +
        '    </div>' +        
        '</div>';        
        //'<div id="block-left-ads" class="block">' + 
        //'<script language="JavaScript" charset="UTF-8" src="http://z1320.takru.com/in.php?id=1328832"></script>' +
        //'</div>';
    return left_menu;
}

function form_web_right_news()
{
    rss = "https://www.computerweekly.com/rss/Latest-IT-news.xml";
    var web_news = 
        '<div id="block-web-news" class="block block-news">' +
        '   <h2>World news</h2>' +
        '   <div class="content">';
    web_news +=
        '   </div>' +
        '</div>';
    return web_news;        
}

function get_rss_google(url, count, id)
{
    var html = "";
     jQuery(function($) {
        $("#" + id).rss(url, {
            ssl: true,
            limit: count,
            entryTemplate: '<div style="padding-bottom: 10px;"><a href="{url}" target=_blank>{title}</a></div>'
        })
    });
    return html;
}

function get_rss_feedrapp(url, count, id) {
    $.ajax({
      url      : 'http://feedrapp.info?callback=?&q=' + encodeURIComponent(url),
      dataType : 'json',
      success  : function (data) {
        if (data.responseData.feed && data.responseData.feed.entries) {
          $.each(data.responseData.feed.entries, function (i, e) {
            if (i < count) {
                $("#" + id).append('<div style="padding-bottom: 10px;"><a href="' + e.link + '" target=_blank>' + e.title + '</a></div>')
            }
          });
        }
      }
    });
}

function get_rss_jquery(url, count, id) {
    $.ajax({
      url      : 'https://feed.jquery-plugins.net/load?url=' + encodeURIComponent(url) + '&maxCount=' + count,
      dataType : 'json',
      success  : function (data) {
        if (data.data) {
          $.each(data.data, function (i, e) {
            $("#" + id).append('<div style="padding-bottom: 10px;"><a href="' + e.link + '" target=_blank>' + e.title + '</a></div>')
          });
        }
      }
    });
}

function make_search(data)
{
    var search_index = 0;
    var result_search = "";
    for (var i = 0; i < crypt_methods.length; i++) {
        if (crypt_methods[i][0].toLowerCase().indexOf(data.toLowerCase()) >= 0 ||
            crypt_methods[i][1].toLowerCase().indexOf(data.toLowerCase()) >= 0 ||
            crypt_methods[i][3].toLowerCase().indexOf(data.toLowerCase()) >= 0) 
        {
            search_index++;
            result_search += search_index + ". <a href='" + crypt_methods[i][1] + "'><b>" + crypt_methods[i][0] + " - encryption online</b></a><br />" + crypt_methods[i][3] + "<br /><br />";
        }
    }
    
    $("h1#page-title").html("Search results");
    if (search_index == 0) 
        result_search = "On your request nothing has been found.";
    else
        result_search = "Found: " + search_index + "<br /><br />" + result_search;
    $("div#block-system-main div").html(result_search);
}

// Функция сортировки
function sort_name(i, ii) 
{   // По названию
    if (i[0] > ii[0])      return  1;
    else if (i[0] < ii[0]) return -1;
    else                   return  0;
}

// ************************************************************************************************
// Установка действий
$().ready(function() {
    // Сортировка
    search_words  = search_words.sort();
    crypt_methods = crypt_methods.sort(sort_name);
    
    // Главное меню
    $("#header").html(form_top_menu());
    
    // Левая панель, подменю
    $("#sidebar-first div:first").html(form_left_menu() + form_blocks(left_blocks));
    $(function() {
        $("#tree").treeview({
            collapsed: true,
            animated: "fast",
            persist: "location"
        });
    });    
    
    // Правая панель, новости
    //$("#sidebar-second div").html(form_right_news() + form_web_right_news() + form_blocks(right_blocks));
    $("#block-news").remove();
    $("#block-web-news").remove();
    $("#sidebar-second").append(form_web_right_news());
    get_rss_jquery('https://www.computerweekly.com/rss/Latest-IT-news.xml', 10, 'block-web-news');
    //get_rss('http://news.yandex.ru/index.rss', 5, 'block-web-news');
            
    // Поиск
    $("#search-text").autocomplete(search_words, {
        minChars: 2,
        matchContains: true,
        scroll: false,
        max: 10
    });
    $("#search-text").result(function (event, data, formatted) {
        make_search(formatted);
    });
});
