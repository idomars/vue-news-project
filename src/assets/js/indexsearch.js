/**
 * Created by jijw on 2016/8/26.
 */
var pageIndex = 1;  //页码
var pageSize = 10;  //每页显示数量
var pageCount = 1;  //总页数
var entityAmount = 0;   //总量
var openId = getCookie("openid");
var height =  window.screen.height;
$(function(){
    card_compiler = Handlebars.compile($("#title-list").html());
    getList();  //调用获取查询结果方法

    //当搜索框发生变化时重新进行查询，sh设置页码为1
  $('#keyword').bind('input propertychange', function() {
        pageIndex = 1;
        $("ul").html("");
        getList();
        var keyword = $('#keyword').val();
      if(null == keyword || "" == keyword || undefined ==keyword){
          $("#clear_btn").hide();
      }else{
          $("#clear_btn").show();
      }
    });
    //滚动分页
    $(window).scroll(function () {
        //判断是否到底部
        if ($(window).scrollTop() >= $(document).height() - $(window).height() ) {
        //if($(".indexsearch").height() +44 == height+$(window).scrollTop()){
            if(pageIndex<pageCount){
                pageIndex++;     //添加页面
                getList();
            }
        }
    });
})

//查询
function getList(){
    var keyword = $("#keyword").val();  //获取查询关键字
    $.ajax({
        type: "GET",
        dataType: "json",
        data:{"title":keyword},
        url: baseUrl + "/api/news/list/" + pageIndex + "/" + pageSize,
        success: function (j) {
            //判断是否成功获取查询结果
            if(1000 == j.code){
                entityAmount = j.entityCount;
                pageCount = j.pageCount;
                $("ul").append(card_compiler(j.data));
                //判断页面是否未被填满且数据为取完
                if(height>$(".indexsearch").height()&&pageIndex<pageCount){
                    pageIndex++;    //添加页面
                    getList();
                }
            }else if(1001 == j.code){
                $("ul").html("<li>" + j.msg + "</li>");
            }else{
                $("ul").html("<li>无搜索结果</li>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
           addHint("查询失败！");
        }
    });
}
//点击查询按钮，重新查询
function new_query(){
    pageIndex = 1;
    $("ul").html("");
    getList();
}

//清空搜索框
function keyclear(){
    $('#keyword').val("");
    pageIndex = 1;
    $("ul").html("");
    getList();
    $("#clear_btn").hide();
}
//返回首页
function back(){
    location.href="/news/index.html";
}