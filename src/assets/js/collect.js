/**
 * Created by xiagy on 16/8/25.
 */

//openId �û�Id ��pageSize ÿҳ������pageTotal �ܹ�ҳ����pageIndex����ǰҳ
var openId;
var pageSize = 8;
var pageTotal = 0;
var pageIndex = 1;
var loadFlag = 1; //�Ƿ���ر�ʶ
var status = 0 ; //�༭״̬ 0:���Ǳ༭״̬  1�Ǳ༭״̬

$(function(){
    openId = getCookie("openid");
    if(isNull(openId)) {
        checkLogin();
    }
    $(".deleteConfirm").hide();
    getCollectionNews();
});




//����༭��ť
function deleteNews(){
    if(pageTotal == 0){
        return;
    }
    var _w = ($(".news_list li .op_btn").width()==null || typeof($(".news_list li .op_btn").width())=="undefined") ? 0 : $(".news_list li .op_btn").width();
    if(parseInt(_w.toString().replace('px','')) == 0){
        $(".news_list li .op_btn").css({"width":"30px"});
        $(".news_list li .op_btn span").css({"left":"0", "opacity":"1"});
        $(".news_list li b.line").css({"opacity":"1"});
        $(".writeBtn").html("ȡ��");
        $(".deleteConfirm").show();
        status = 1;
    }else{
        $(".news_list li .op_btn").css({"width":"0"});
        $(".news_list li .op_btn span").css({"left":"-20px", "opacity":"0"});
        $(".news_list li b.line").css({"opacity":"0"});
        $(".writeBtn").html("�༭");
        $(".deleteConfirm").hide();
        status = 0;
    }
    $(".news_list li .op_btn span").removeClass("select");
}

//ѡ��ȫ��
$(".deleteConfirm").on("click",".deleteGreen",function(){
    $(".news_list li .op_btn span").addClass("select");
})

//����ѡ��
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

//���ɾ����ť
$(".deleteConfirm").on("click",".deleteRed",function(){
    var newsid = "";
    $(".news_list li").each(function(){
        if($(this).find(".op_btn span").hasClass("select")){
            newsid += $(this).attr("newsid")+",";
        }
    })
    if(newsid == ""){
        addHint("��ѡ����Ҫɾ�����ղ�");
    }else{
        var delNewsId = newsid.substring(0,newsid.length-1);
        openConfirmBox("�Ƿ�ȷ��ɾ��ѡ�е��ղ�",delCollectNews,delNewsId);
        /*if(confirm('ȷʵҪɾ��ѡ�е��ղ���?')){
         delCollectNews(delNewsId);
         }*/
    }
})

//����ҳ��
function gotoDetail(id){
    window.location.href="newsDetail.html?id="+id;
}

//�����б�
function getCollectionNews(){
    var url = "/api/news/"+openId+"/collection/"+pageIndex+"/"+pageSize;
    getApiData(url, function (data) {
        if (data.code == 1000) {
            pageTotal = data.pageCount;
            setCollectList(data.data);

        }else{
            pageTotal=0;
            $(".news_list").html('<li><p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">δ��ѯ���������</p></li>');
        }
    }, true);
}

//��������������
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

//ɾ������
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

//ҳ��ˢ��
function pageReload(){
    window.location.reload();
}

//���ҳ���ҵĸ����б�divģ��
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
    loadFlag = 1;//������������ҳ�����ݼ������
};