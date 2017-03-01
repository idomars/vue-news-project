/**
 * Created by quanquan on 16/8/22.
 */

var pageSize = 10; //ÿҳ����
var isLode = false; //�Ƿ���ر�ʶ
var pageTotal = 1;//��ҳ��
var pageIndex = 1;//ҳ��
var cateId = 0;//Ĭ�ϲ��ȵ�
var entityCount;

$(function () {

    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            //������Ӽ���ִ��
            return options.fn(this);
        } else {
            //����������ִ��{{else}}����
            return options.inverse(this);
        }
    });

    //ҳ����ʽ����
    pageInit();

    if(!isNull($.cookie("indexcateId"))){
        cateId = $.cookie("indexcateId");
    }

    //��ȡ�������
    getCates();
    //$(window).scrollTop(0);

});

//��ȡ�������
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
                    if($(this).html() == "�ȵ�"){
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
            //��ѯ�뿪ʱ����������
            if(!isNull($.cookie("indexpageIndex"))){
                for(var i=1;i<=$.cookie("indexpageIndex");i++){
                    findNewsList();
                    pageIndex++;
                }
            }else{
                //��ȡ�����б�
                findNewsList();
            }

            //��ȡ��¼��ҳ��߶ȣ���ת���뿪ʱ�ĵط�
            if(!isNull($.cookie("indexscrolltop"))){
                $(document).scrollTop($.cookie("indexscrolltop"));
            }
        }
    });
}

//��ȡ�����б�
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
                $(".news_list").html('<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">δ��ѯ���������</p>');
            }
        }
    });
}

//����л����
function reloadNews(_cid,_name){

    if("�ȵ�" == _name){
        cateId = 0;
    }else{
        cateId = _cid;
    }

    $.cookie("indexcateId",cateId);//�л�����ʱ�򣬴��cookie
    $.cookie("indexpageIndex",1);//cookie���ҳ����Ϊ1
    pageIndex = 1;
    pageTotal = 1;
    findNewsList();
}
//ȡ��
function cancelFocus(id) {
    if(isNull(openId)) {
        checkLogin();
        return;
    }
    //��ע�ӿ�
    var url = "/api/news/" + openId + "/cancelFocus/" + id;
    getApiData(url,function(data){
        if(data.code == 1000){
            addHint("ȡ���ɹ�");
            //��֤ȡ��֮�󣬻ص�ԭ����λ��
            $(".news_list").html("");
            for(var i=1;i<=pageIndex;i++){
                findNewsList();
            }
        }else{
            alert(data.msg)
        }
    })
}
//��ע
function focuss(id) {
    if(isNull(openId)) {
        checkLogin();
        return;
    }
    var url = "/api/news/" + openId + "/focus/" + id;
    getApiData(url,function(data){
        if(data.code == 1000){
            addHint("��ע�ɹ�");
            //��֤��ע֮�󣬻ص�ԭ����λ��
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

    //��λ�ô�����
    $.cookie("indexscrolltop",$(document).scrollTop());
    //console.log(($(document).height()-$(window).scrollTop() -$(window).height()));
    if ($(window).scrollTop() >= $(document).height() - $(window).height() ) {
        if (pageIndex < pageTotal) {
            pageIndex++;
            $.cookie("indexpageIndex",pageIndex);//���浱ǰҳ��
            findNewsList();
        }
    }
});

//���ҵĹ�ע
function goMyAtten(){
    location.href="myAtten.html";
}

//�ҵĸ���
function goFollow(){
    //checkLogin("index.html");
    location.href="myFollow.html"
}

//�ҵ��ղ�
function goCollect(){
    //checkLogin("index.html");
    location.href="myCollect.html";
}

//ҳ����ʽ��ʼ��
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

    //�ֶ�����������л�
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

    //��������˵��������л�
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
