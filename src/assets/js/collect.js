/**
 * Created by xiagy on 16/8/25.
 */

//openId 用户Id ；pageSize 每页条数；pageTotal 总共页数；pageIndex：当前页
var openId;
var pageSize = 8;
var pageTotal = 0;
var pageIndex = 1;
var loadFlag = 1; //是否加载标识
var status = 0 ; //编辑状态 0:不是编辑状态  1是编辑状态

$(function(){
    openId = getCookie("openid");
    if(isNull(openId)) {
        checkLogin();
    }
    $(".deleteConfirm").hide();
    getCollectionNews();
});




//点击编辑按钮
function deleteNews(){
    if(pageTotal == 0){
        return;
    }
    var _w = ($(".news_list li .op_btn").width()==null || typeof($(".news_list li .op_btn").width())=="undefined") ? 0 : $(".news_list li .op_btn").width();
    if(parseInt(_w.toString().replace('px','')) == 0){
        $(".news_list li .op_btn").css({"width":"30px"});
        $(".news_list li .op_btn span").css({"left":"0", "opacity":"1"});
        $(".news_list li b.line").css({"opacity":"1"});
        $(".writeBtn").html("取消");
        $(".deleteConfirm").show();
        status = 1;
    }else{
        $(".news_list li .op_btn").css({"width":"0"});
        $(".news_list li .op_btn span").css({"left":"-20px", "opacity":"0"});
        $(".news_list li b.line").css({"opacity":"0"});
        $(".writeBtn").html("编辑");
        $(".deleteConfirm").hide();
        status = 0;
    }
    $(".news_list li .op_btn span").removeClass("select");
}

//选择全部
$(".deleteConfirm").on("click",".deleteGreen",function(){
    $(".news_list li .op_btn span").addClass("select");
})

//单条选择
$(".news_list").on("click","li",function(e){
    var _w = ($(".news_list li .op_btn").width()==null || typeof($(".news_list li .op_btn").width())=="undefined") ? 0 : $(".news_list li .op_btn").width();
    if(parseInt(_w.toString().replace('px','')) != 0) {
        e.preventDefault();
        if ($(this).find(".op_btn span").hasClass("select")) {
            $(this).find(".op_btn span").removeClass("select");
        } else {
            $(this).find(".op_btn span").addClass("select");
        }
    }
})

//点击删除按钮
$(".deleteConfirm").on("click",".deleteRed",function(){
    var newsid = "";
    $(".news_list li").each(function(){
        if($(this).find(".op_btn span").hasClass("select")){
            newsid += $(this).attr("newsid")+",";
        }
    })
    if(newsid == ""){
        addHint("请选择你要删除的收藏");
    }else{
        var delNewsId = newsid.substring(0,newsid.length-1);
        openConfirmBox("是否确认删除选中的收藏",delCollectNews,delNewsId);
        /*if(confirm('确实要删除选中的收藏吗?')){
         delCollectNews(delNewsId);
         }*/
    }
})

//详情页面
function gotoDetail(id){
    window.location.href="newsDetail.html?id="+id;
}

//新闻列表
function getCollectionNews(){
    var url = "/api/news/"+openId+"/collection/"+pageIndex+"/"+pageSize;
    getApiData(url, function (data) {
        if (data.code == 1000) {
            pageTotal = data.pageCount;
            setCollectList(data.data);

        }else{
            pageTotal=0;
            $(".news_list").html('<li><p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">未查询到相关数据</p></li>');
        }
    }, true);
}

//滚动条下拉加载
$(window).scroll(function () {
    //console.log(($(document).height()-$(window).scrollTop() -$(window).height()));
    if ($(window).scrollTop() >= $(document).height() - $(window).height() ) {
        if (pageIndex < pageTotal) {
            if (1 == loadFlag) {
                pageIndex++;
                getCollectionNews();
                loadFlag = 0;
            }

        }
    }
});

//删除新闻
function delCollectNews(ids){
    if(isNull(openId)) {
        checkLogin();
        return;
    }
    var url = "/api/news/"+openId+"/cancelCollect/"+ids;
    getApiData(url, function (data) {
        if (data.code == 1000) {
            addHintWithTime(data.msg,"2000",pageReload,"");
        }else{
            addHintWithTime(data.msg,"2000",pageReload,"");
        }
    }, true);
}

//页面刷新
function pageReload(){
    window.location.reload();
}

//填充页面我的跟踪列表div模板
function setCollectList(data) {
    var source = $("#collectList").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    if (pageIndex == 1) {
        $("ul.news_list").html(html);
    } else {
        $("ul.news_list").append(html);
    }
    if(status == 1){
        $(".news_list li .op_btn").css({"width":"30px"});
        $(".news_list li .op_btn span").css({"left":"0", "opacity":"1"});
        $(".news_list li b.line").css({"opacity":"1"});
    }
    clacImg();
    loadFlag = 1;//表明这次请求的页面数据加载完毕
};