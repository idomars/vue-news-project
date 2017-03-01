/**
 * Created by quanquan on 16/8/22.
 */

var pageSize = 10; //每页数量
var isLode = false; //是否加载标识
var pageTotal = 1;//总页数
var pageIndex = 1;//页次
var cateId = 0;//默认查热点
var entityCount;

$(function () {

    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }
    });

    //页面样式加载
    pageInit();

    if(!isNull($.cookie("indexcateId"))){
        cateId = $.cookie("indexcateId");
    }

    //获取新闻类别
    getCates();
    //$(window).scrollTop(0);

});

//获取新闻类别
function getCates(){
    var strUrl = "/api/news/newsCateList";
    getApiData(strUrl, function(json) {
        if (1000 == json.code) {
            var cates = json.data;

            var source = $("#topCateList").html();
            var template = Handlebars.compile(source);
            var html = template(cates);
            $("#topCateUl").html(html);

            var source = $("#downCateList").html();
            var template = Handlebars.compile(source);
            var html = template(cates);
            $("#downCateUl").html(html);

            if(0 == cateId){
                $("#topCateUl li").each(function(){
                    if($(this).html() == "热点"){
                        $(this).addClass("select");
                    }
                })
            }else{
                $("#topCateUl li").each(function(){
                    if($(this).attr("data-id") == cateId){
                        $(this).addClass("select");
                    }
                })
            }
            //查询离开时看到的数据
            if(!isNull($.cookie("indexpageIndex"))){
                for(var i=1;i<=$.cookie("indexpageIndex");i++){
                    findNewsList();
                    pageIndex++;
                }
            }else{
                //获取新闻列表
                findNewsList();
            }

            //获取记录的页面高度，跳转到离开时的地方
            if(!isNull($.cookie("indexscrolltop"))){
                $(document).scrollTop($.cookie("indexscrolltop"));
            }
        }
    });
}

//获取新闻列表
function findNewsList(){
    var strUrl = "/api/news/listByCid/" + cateId + "/" + pageIndex + "/" + pageSize;
    var openId = getCookie("openid");
    if(!isNull(openId)){
        strUrl += "?openId=" + openId;
    }

    getApiData(strUrl, function(json) {

        if (1000 == json.code) {
            var newsList = json.data;
            pageTotal = json.pageCount;
            var source = $("#newsList").html();
            var template = Handlebars.compile(source);
            var html = template(newsList);
            if(1 == pageIndex){
                $(".news_list").html(html);

            }else{
                $(".news_list").append(html);
            }
            clacImg();
        }else{
            if(pageIndex == 1){
                $(".news_list").html('<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">未查询到相关数据</p>');
            }
        }
    });
}

//点击切换类别
function reloadNews(_cid,_name){

    if("热点" == _name){
        cateId = 0;
    }else{
        cateId = _cid;
    }

    $.cookie("indexcateId",cateId);//切换类别的时候，存进cookie
    $.cookie("indexpageIndex",1);//cookie里的页次设为1
    pageIndex = 1;
    pageTotal = 1;
    findNewsList();
}
//取关
function cancelFocus(id) {
    if(isNull(openId)) {
        checkLogin();
        return;
    }
    //关注接口
    var url = "/api/news/" + openId + "/cancelFocus/" + id;
    getApiData(url,function(data){
        if(data.code == 1000){
            addHint("取消成功");
            //保证取关之后，回到原来的位置
            $(".news_list").html("");
            for(var i=1;i<=pageIndex;i++){
                findNewsList();
            }
        }else{
            alert(data.msg)
        }
    })
}
//关注
function focuss(id) {
    if(isNull(openId)) {
        checkLogin();
        return;
    }
    var url = "/api/news/" + openId + "/focus/" + id;
    getApiData(url,function(data){
        if(data.code == 1000){
            addHint("关注成功");
            //保证关注之后，回到原来的位置
            $(".news_list").html("");
            for(var i=1;i<=pageIndex;i++){
                findNewsList();
            }
        }else{
            alert(data.msg)
        }
    })
}


$(window).scroll(function () {

    //将位置存起来
    $.cookie("indexscrolltop",$(document).scrollTop());
    //console.log(($(document).height()-$(window).scrollTop() -$(window).height()));
    if ($(window).scrollTop() >= $(document).height() - $(window).height() ) {
        if (pageIndex < pageTotal) {
            pageIndex++;
            $.cookie("indexpageIndex",pageIndex);//保存当前页次
            findNewsList();
        }
    }
});

//到我的关注
function goMyAtten(){
    location.href="myAtten.html";
}

//我的跟踪
function goFollow(){
    //checkLogin("index.html");
    location.href="myFollow.html"
}

//我的收藏
function goCollect(){
    //checkLogin("index.html");
    location.href="myCollect.html";
}

//页面样式初始化
function pageInit(){
    $(".zhezhao_trans").hide();
    $(".zhezhao_trans2").hide();
    $(".down_cate").hide();
    $(".down_cate2").hide();
    $(".changeCate").hide();
    $(".catelogy").click(function () {
        if ($(".down_cate").is(":hidden")){
            $(".changeCate").show();
            $(".catelogy").css("transform", "rotate(180deg)");
            $(".zhezhao_trans").show();
            $(".zhezhao_trans2").hide();
            $(".down_cate2").hide();
            $(".down_cate").show();
        }else {
            $(".zhezhao_trans").hide();
            $(".down_cate").hide();
            $(".catelogy").css("transform", "rotate(0)");
            $(".changeCate").hide();
        }
    });

    //手动点击导航条切换
    var n = 0, l = 0;
    var $li = $(".cateloge .cateBox ul li");
    $(".cateloge .cateBox ul").on("click", "li", {obj: this}, function () {
        $(this).addClass("select").siblings().removeClass("select");
        n = $(this).index();
        if (n >= 1) {
            if (n == 1) {
                l = 0;
            } else {
                l = ($(this).width() + 26) * (n - 1);
            }
        } else {
            l = 0;
            return;
        }
        $(".cateloge .cateBox").animate({scrollLeft: l});
    });

    //点击下拉菜单导航条切换
    $(".down_cate ul").on("click", "li", {obj: this}, function () {
        n = $(this).index();
        if (n >= 1) {
            if (n == 1) {
                l = 0;
            } else {
                l = ($(".cateloge .cateBox ul li").eq(n).width() + 26) * (n - 1) + 2 * (n - 1);
            }
        } else {
            l = 0;
        }
        hideZ();
        $(".cateloge .cateBox ul li").eq(n).addClass("select").siblings().removeClass("select");
        $(".cateloge .cateBox").animate({scrollLeft: l});
    });
}

function showCate2(){
    if ($(".down_cate2").is(":hidden")){
        $(".zhezhao_trans2").show();
        $(".zhezhao_trans").hide();
        $(".down_cate").hide();
        $(".down_cate2").show();
        $("body").css("overflow","hidden");
        $(".changeCate").hide();
        $(".catelogy").css("transform","rotate(0)");
    }else{
        $(".down_cate2").hide();
    }

}
function showCate(){
    $(".changeCate").show();
    $(".catelogy").css("transform","rotate(180deg)");
    $(".zhezhao_trans").show();
    $(".zhezhao_trans2").hide();
    $(".down_cate2").hide();
    $(".down_cate").show();
    $("body").css("overflow","hidden");
}

function hideZ(){
    $(".zhezhao_trans").hide();
    $(".down_cate").hide();
    $(".catelogy").css("transform","rotate(0)");
    $(".changeCate").hide();
}
function hideZ2(){
    $(".zhezhao_trans2").hide();
    $(".down_cate2").hide();
}
