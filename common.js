// ************************************************************************************************
// Р—Р°РіСЂСѓР·РєР° РґР°РЅРЅС‹С…
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
// Р¤СѓРЅРєС†РёРё
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

function form_top_menu()
{
    var top_menu = 
        '<div id="main-menu11">' +
        '    <div id="main-menu-links11">' +
        '        <ul class="menu11">' +
        '            <li><a href="https://www.dewicode.my.id/" title="">Beranda</a></li>' +
        '            <li><a href="/p/tools.html" title="">More Tools</a></li>' +
        '            <li><a href="/p/sitemap.html" title="">Sitemap</a></li>' +
        '        </ul>' +
        '    </div>' +
        '</div>';
    return top_menu;
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
        //'<script language="JavaScript" charset="UTF-8" src="#"></script>' +
        //'</div>';
    return left_menu;
}

function form_web_right_news()
{
    rss = "#";
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
      url      : '#' + encodeURIComponent(url),
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

// Р¤СѓРЅРєС†РёСЏ СЃРѕСЂС‚РёСЂРѕРІРєРё
function sort_name(i, ii) 
{   // РџРѕ РЅР°Р·РІР°РЅРёСЋ
    if (i[0] > ii[0])      return  1;
    else if (i[0] < ii[0]) return -1;
    else                   return  0;
}

// ************************************************************************************************
// РЈСЃС‚Р°РЅРѕРІРєР° РґРµР№СЃС‚РІРёР№
$().ready(function() {
    // РЎРѕСЂС‚РёСЂРѕРІРєР°
    search_words  = search_words.sort();
    crypt_methods = crypt_methods.sort(sort_name);
    
    // Р“Р»Р°РІРЅРѕРµ РјРµРЅСЋ
    $("#header").html(form_top_menu());
    
    // Р›РµРІР°СЏ РїР°РЅРµР»СЊ, РїРѕРґРјРµРЅСЋ
    $("#sidebar-first div:first").html(form_left_menu() + form_blocks(left_blocks));
    $(function() {
        $("#tree").treeview({
            collapsed: true,
            animated: "fast",
            persist: "location"
        });
    });    
    
    // РџСЂР°РІР°СЏ РїР°РЅРµР»СЊ, РЅРѕРІРѕСЃС‚Рё
    //$("#sidebar-second div").html(form_right_news() + form_web_right_news() + form_blocks(right_blocks));
    $("#block-news").remove();
    $("#block-web-news").remove();
    $("#sidebar-second").append(form_web_right_news());
    get_rss_jquery('#', 10, 'block-web-news');
    //get_rss('http://news.yandex.ru/index.rss', 5, 'block-web-news');
            
    // РџРѕРёСЃРє
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
