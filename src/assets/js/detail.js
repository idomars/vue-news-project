/**
 * Created by Administrator on 2016/8/26.
 */
var openId = getCookie("openid");
//var openId = 1;
var likeNum;    //点赞量
var sourceId;   //来源Id
var id; //新闻Id
var isfocus;    //是否关注 1关注；2未关注
var islike;     //是否点赞 1点赞；2未点赞
var iscollect;  //是否收藏 1收藏；2未收藏
$(function(){


    $(".collectBtn em").click(function(){
        if($(this).hasClass("collect_icon")){
            $(this).removeClass("collect_icon");
        }else{
            $(this).addClass("collect_icon");
        }
    });

    $(".like em").click(function(){
        if($(this).hasClass("yes_icon")){
            $(this).removeClass("yes_icon");
        }else{
            $(this).addClass("yes_icon");
        }
    });


    id = getQueryString("id");  //获取新闻Id
    var url = "/api/news/" + id + "/detail";   //拼接查询新闻Id的路径
    if(null != openId && "" != openId && undefined != openId){
        url += "?openId=" + openId;
    }
    //获取新闻详情
    getApiData(url, getDetail, false);

    //关注按钮
    $(".concern_btn").on("click", function(){
        //判断用户是否登录
        if(isNull(openId)){
            checkLogin();
            return;
        }
        //判断是否关注，是——取消关注；否——添加关注
        if(isfocus == 1){
            var url = "/api/news/" + openId + "/cancelFocus/" + sourceId;
            getApiData(url, delfocus, false);
        }else{
            var url = "/api/news/" + openId + "/focus/" + sourceId;
            getApiData(url, focus, false);
        }
    });
    //收藏按钮
    $("#collect_icon").on("click", function(){
        //判断用户是否登录
        if(isNull(openId)){
            checkLogin();
            return;
        }
        //判断是否收藏，   是——取消收藏；否——添加收藏
        if(1 == iscollect){
            var url = "/api/news/" + openId + "/cancelCollect/" + id;
            getApiData(url, discollect, false);
        }else{
            var url = "/api/news/" + openId + "/collect/" + id;
            getApiData(url, collect, false);
        }
    });
    //点赞按钮
    $("#like_img").on("click", function(){
        //判断用户是否登录
        if(isNull(openId)){
            checkLogin();
            return;
        }
        //判断是否点赞，   是——取消点赞；否——点赞
        if(islike == 1){
            var url = "/api/news/" + openId + "/dislike/" + id;
            getApiData(url, dislike, false);
        }else{
            var url = "/api/news/" + openId + "/like/" + id;
            getApiData(url, like, false);
        }
    });
})
//查询成功操作
function getDetail(j){
    //判断是否成功取得新闻详情
    if(j.code == 1000){
        //设置新闻信息
        $("#title").html(j.data.title);
        $("#addTime").html(j.data.addTime);
        $("#sourceName").html('<a href="sourceNewsList.html?sourceId=' + j.data.sourceId + '&from=d&newsId=' + id + '" style="color: #3B9DFE">' + j.data.sourceName + '</a>');
        //如果有图片则加载图片，没有就隐藏图片标签
        //null == j.data.img || "" == j.data.img ? $("#img").hide() : $("#img").attr("src", j.data.img);
        var cotent =processTXT(j.data.content);
        $("#brief").html(cotent);
        $("#clickNum").html(j.data.clickNum);
        likeNum = j.data.likeNum;   //设置点赞量
        $("#likeNum").html(likeNum);
        sourceId = j.data.sourceId; //设置来源Id
        isfocus = j.data.isFocus;   //设置是否关注
        //判断是否关注
        if(1 == j.data.isFocus){
            $("#isfocus").html("已关注");
            $("#isfocus").css("background", "#dfdfdf");
        }else{
            $("#isfocus").html("关注");
        }
        islike = j.data.isLike; //设置是否点赞
        //判断是否收藏
        if(1 == islike){
            $("#yes_icon").attr("class", "yes_icon_green");
            $("#likeNum").css("color", "#56CD81");
        }
        iscollect = j.data.isCollect;   //设置是否收藏
        //判断是否收藏
        if(1 == iscollect){
            $("#collect_icon").attr("class", "collect_icon_yes");
        }
    }else{
        addHint("无详情信息");
    }

}
//收藏
function collect(data){
    //判断收藏成功
    if(data.code == 1000){
        iscollect = 1;
        $("#collect_icon").attr("class", "collect_icon_yes");
    }else{
        addHint(data.msg);
    }
}
//取消收藏
function discollect(data){
    //判断是否取消收藏成功
    if(data.code == 1000){
        iscollect = 2;
        $("#collect_icon").attr("class", "collect_icon");
    }else{
        addHint(data.msg);
    }
}

//点赞
function like(data){
    //判断是否添加点赞成功
    if(data.code == 1000){
        islike = 1;
        likeNum = likeNum + 1;
        $("#likeNum").html(likeNum);
        $("#yes_icon").attr("class", "yes_icon_green");
        $("#likeNum").css("color", "#56CD81");
    }else{
        addHint(data.msg);
    }
}
//取消点赞
function dislike(data){
    //判断是否取消点赞成功
    if(data.code == 1000){
        islike = 2;
        likeNum = likeNum - 1;
        $("#likeNum").html(likeNum);
        $("#yes_icon").attr("class", "yes_icon");
        $("#likeNum").css("color", "#999");
    }else{
        addHint(data.msg);
    }
}


//关注
function focus(data){
    //判断是否添加关注成功
    if(data.code == 1000){
        $("#isfocus").html("已关注");
        $("#isfocus").css("background", "#dfdfdf");
        isfocus = 1;
    }else{
        addHint(data.msg);
    }
}

//取消关注
function delfocus(data){
    //判断是否取消关注成功
    if(data.code == 1000){
        $("#isfocus").html("关注");
        $("#isfocus").css("background", "#46C23D");
        isfocus = 2;
    }else{
        addHint(data.msg);
    }
}
//判断用户Id是否存在
function checkOpenId(openId){
    if(null != openId && "" != openId && undefined != openId){
        return true;
    }else{
        return false;
    }
}



/**
 * Created by quanquan on 16/8/31.
 */

var startX;
var deltaX;
/*手指放在屏幕上*/
document.addEventListener("touchstart", function (e) {
//            e.preventDefault();
    deltaX = 0;
    var touch = e.touches[0];
    startX = touch.pageX;
    viewport.style.webkitTransition = ""; //取消动画效果
    startT = new Date().getTime(); //记录手指按下的开始时间
    isMove = false; //是否产生滑动
}.bind(this), false);

/*手指在屏幕上滑动，页面跟随手指移动*/
document.addEventListener("touchmove", function (e) {
//            e.preventDefault();
    var touch = e.touches[0];
    deltaX = touch.pageX - startX;
}.bind(this), false);
document.addEventListener("touchend", function (e) {
    if (deltaX > 100) {
        window.location.href = 'index.html';
    }
    if (deltaX < -100) {
        return;
    }
}.bind(this), false);