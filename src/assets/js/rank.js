/**
 * Created by mjj on 16/8/26.
 */

var isAvg = 0; // ��������    1,ƽ��������0��������  Ĭ��������

var ordtype = 2;    //����ʽ    1����������2���������3����ע��  Ĭ��Ϊ�����

var openId = $.cookie("openid"); //openID

var pageIndex = 1;
var pageSize = 20;
var pageCount = 0;
var entityCount = 0;


$(function () {

    var handleHelper = Handlebars.registerHelper("addOne", function (index) {

        this._index = index + 1;

        return this._index;
    });
    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            //������Ӽ���ִ��
            return options.fn(this);
        } else {
            //����������ִ��{{else}}����
            return options.inverse(this);
        }
    });
    sort_compile = Handlebars.compile($("#sort-template").html());
    $(".rank li").click(function () {

        $(this).addClass("select");
        $(this).siblings("li").removeClass("select");
        isAvg = $(this).attr("isAvg");
        getSortList();

    });

    $(".ordtype").click(function () {

        ordtype = $(this).attr("ordtype");
        //$("#sortName").html($(this).attr("nameval") + "����")

        //$("#total").html("��"+$(this).attr("nameval"));
        //$("#avg").html("ƽ��"+$(this).attr("nameval"));

        $(this).find("div").removeClass("table_gray table_th");
        $(this).find("div").addClass("table_green table_th");

        $(this).siblings(".ordtype").find("div").removeClass("table_green table_th");
        $(this).siblings(".ordtype").find("div").addClass("table_gray table_th");

        getSortList();
    });

    getSortList();
});

//��ѯ�����б�
function getSortList() {
    var url = "/api/news/getNewsSourceList/" + isAvg + "/" + ordtype + "/" + pageIndex + "/" + pageSize;
    if (!isNull(openId)) {
        url += "?openId=" + openId;
    }
    getApiData(url, function (data) {

        if (data.code == 1000) {
            pageCount = data.pageCount;

            $(data.data).each(function(i, val) {

                val.idx = (pageIndex - 1) * pageSize + (i + 1);
            });

            if (1 == pageIndex) {
                $("tbody").html(sort_compile(data.data))
            } else {
                $("tbody").append(sort_compile(data.data))
            }
        } else {
            alert(data.msg);
        }
    })
}

//ȡ����ע
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
            getSortList();
        }else{
            addHint(data.msg)
        }
    })

}
//��ע�ж�
function focuss(id) {
    if(isNull(openId)) {
        checkLogin();
        return;
    }

    var url = "/api/news/" + openId + "/focus/" + id;
    getApiData(url,function(data){
        if(data.code == 1000){
            addHint("��ע�ɹ�");
            getSortList();
        }else{
            addHint(data.msg)
        }
    })
}

function goto(_sid){
    location.href="sourceNewsList.html?sourceId="+_sid + "&from=r";
}

function back(){
    location.href="index.html";
}

$(window).scroll(function () {
    //console.log(($(document).height()-$(window).scrollTop() -$(window).height()));
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 200) {
        if (pageIndex < pageCount) {
            pageIndex++;
            getSortList();
        }
    }
});
