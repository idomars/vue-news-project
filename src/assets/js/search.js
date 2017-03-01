/**
 * Created by dongying on 16/8/25.
 */
var _NOW_PAGE = 1;
var _PAGE_COUNT = 0;
var _PAGE_SIZE = 10;
var pageIndex = 0;
var loadFlag = 1; //是否加载标识

var searchtitle = ""; //搜索标题
var openId = $.cookie("openid");

$(function () {
    getHotWordsList();
    getMyFollowList();

    //为搜索框绑定keyup事件（获取新闻title列表）
    $("#text_title").on("keyup", function () {
        //搜索内容为空时隐藏input下拉内容
        if ($("#text_title").val() == "") {
            hideSearchResult();
            hideInputClose();
            return;
        }
        showInputClose();
        //搜索内容不为空时获取input下拉内容并显示
        var keywords = $("#text_title").val();
        var strUrl = "/api/news/keyword?keyword=" + keywords ;
        //根据输入内容搜索匹配的关键字列表
        getApiData(strUrl, function (data) {
            if (1000 == data.code) {
                var source = $("#newsTitleList").html();
                var template = Handlebars.compile(source);
                var html = template(data.data);
                $("#newsTitleUL").html(html);
                showSearchResult();
            } else {
                var html = '';
                html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">未查询到相关数据</p>'
                $("#newsTitleUL").html(html);
                showSearchResult();
            }
            loadFlag = 1;//表明这次请求的页面数据加载完毕
        }, false);
    })

    //首次进入页面时，处罚input框的keyup事件
    $("#text_title").trigger("keyup");
});

//获取热门话题列表
function getHotWordsList() {
    var strUrl = "/api/news/hotWords/0/8"; //热点话题查询前8条

    getApiData(strUrl, function (data) {
        if (1000 == data.code) {
            var source = $("#hotWordsList").html();
            var template = Handlebars.compile(source);
            var html = template(data.data);
            $("#hotWordsUL").html(html);
        } else {
            var html = '';
            html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">未查询到相关数据</p>'
            $("#hotWordsUL").html(html);
        }
    }, false);
};

//获取我跟踪的关键词列表
function getMyFollowList() {
    if (isNull(openId)) {
        checkLogin();
    }
    var strUrl = "/api/news/" + openId + "/keyword";

    getApiData(strUrl, function (data) {
        if (1000 == data.code) {
            var source = $("#myFollowList").html();
            var template = Handlebars.compile(source);
            var html = template(data.data);
            $("#myFollowUL").html(html);
        } else {
            var html = '';
            html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">未查询到相关数据</p>'
            $("#myFollowUL").html(html);
        }
    }, false);
};

//点击关键词（热门话题或已跟踪列表里面的关键词记录）时，添加关键词跟踪并跳转到我的跟踪页面
function addAndGoFollowListPage(title) {
    if (isNull(openId)) {
        checkLogin();
    }
    //1.将记录保存到用户追踪表
    keyword = title;
    var strUrl = "/api/news/" + openId + "/followKeyword/" + keyword; //添加关键词跟踪
    getApiData(strUrl, function (data) {
        location.href = "myFollow.html?title=" + encodeURI(keyword);
    }, false);
}

function goFollowListPage(title) {
    var strUrl = "myFollow.html";
    if (!isNull(title) && title.trim() != "") {
        strUrl += "?title=" + title;
    }
    location.href = strUrl;
}


//清空搜索框内容
function clearText() {
    $("#text_title").val("");
    hideSearchResult();
}

//显示搜索框搜索结果列表div,同时隐藏热门话题和已跟踪
function showSearchResult() {
    $(".search .search_result").css("display", "block");
    $(".search .hotSearch").css("display", "none");
    $(".search .haveFollow").css("display", "none");
}

//隐藏搜索框搜索结果列表div,同时显示热门话题和已跟踪
function hideSearchResult() {
    $("#newsTitleUL").html("");
    $(".search .search_result").css("display", "none");
    $(".search .hotSearch").css("display", "block");
    $(".search .haveFollow").css("display", "block");
}
//单个删除按钮：根据关键字删除我的已跟踪关键字
function deleteFollowByKeywords(keywords) {
    event.stopPropagation();
    if (isNull(openId)) {
        checkLogin();
    }
    //1.用户取消追踪关键字
    var strUrl = "/api/news/" + openId + "/cancelKeyword/" + keywords; //取消关键词跟踪
    getApiData(strUrl, function (data) {
        if(1000 == data.code) {
            //2.刷新已跟踪列表
            getMyFollowList();
            hideDelete();
            return false; //阻止事件冒泡
        }
        hideDelete();
        return false; //阻止事件冒泡
    }, false);
    return false;//阻止事件冒泡
}

//删除取消编辑按钮
function deleteFollow(){
    if($(".haveFollow ul li em").css("display") == "block") {
        $(".haveFollow ul li em").css("display","none");
        $(".deleteFollow").html("删除");
    } else {
        $(".haveFollow ul li em").css("display","block");
        $(".deleteFollow").html("取消");
    }

}

function hideDelete(){
    $(".haveFollow ul li em").css("display","none");
    $(".deleteFollow").html("删除");
}

function showInputClose(){
    $(".search_input .icon_close").show();
}
function hideInputClose(){
    $(".search_input .icon_close").hide();
}