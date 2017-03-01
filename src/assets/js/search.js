/**
 * Created by dongying on 16/8/25.
 */
var _NOW_PAGE = 1;
var _PAGE_COUNT = 0;
var _PAGE_SIZE = 10;
var pageIndex = 0;
var loadFlag = 1; //�Ƿ���ر�ʶ

var searchtitle = ""; //��������
var openId = $.cookie("openid");

$(function () {
    getHotWordsList();
    getMyFollowList();

    //Ϊ�������keyup�¼�����ȡ����title�б�
    $("#text_title").on("keyup", function () {
        //��������Ϊ��ʱ����input��������
        if ($("#text_title").val() == "") {
            hideSearchResult();
            hideInputClose();
            return;
        }
        showInputClose();
        //�������ݲ�Ϊ��ʱ��ȡinput�������ݲ���ʾ
        var keywords = $("#text_title").val();
        var strUrl = "/api/news/keyword?keyword=" + keywords ;
        //����������������ƥ��Ĺؼ����б�
        getApiData(strUrl, function (data) {
            if (1000 == data.code) {
                var source = $("#newsTitleList").html();
                var template = Handlebars.compile(source);
                var html = template(data.data);
                $("#newsTitleUL").html(html);
                showSearchResult();
            } else {
                var html = '';
                html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">δ��ѯ���������</p>'
                $("#newsTitleUL").html(html);
                showSearchResult();
            }
            loadFlag = 1;//������������ҳ�����ݼ������
        }, false);
    })

    //�״ν���ҳ��ʱ������input���keyup�¼�
    $("#text_title").trigger("keyup");
});

//��ȡ���Ż����б�
function getHotWordsList() {
    var strUrl = "/api/news/hotWords/0/8"; //�ȵ㻰���ѯǰ8��

    getApiData(strUrl, function (data) {
        if (1000 == data.code) {
            var source = $("#hotWordsList").html();
            var template = Handlebars.compile(source);
            var html = template(data.data);
            $("#hotWordsUL").html(html);
        } else {
            var html = '';
            html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">δ��ѯ���������</p>'
            $("#hotWordsUL").html(html);
        }
    }, false);
};

//��ȡ�Ҹ��ٵĹؼ����б�
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
            html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">δ��ѯ���������</p>'
            $("#myFollowUL").html(html);
        }
    }, false);
};

//����ؼ��ʣ����Ż�����Ѹ����б�����Ĺؼ��ʼ�¼��ʱ����ӹؼ��ʸ��ٲ���ת���ҵĸ���ҳ��
function addAndGoFollowListPage(title) {
    if (isNull(openId)) {
        checkLogin();
    }
    //1.����¼���浽�û�׷�ٱ�
    keyword = title;
    var strUrl = "/api/news/" + openId + "/followKeyword/" + keyword; //��ӹؼ��ʸ���
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


//�������������
function clearText() {
    $("#text_title").val("");
    hideSearchResult();
}

//��ʾ��������������б�div,ͬʱ�������Ż�����Ѹ���
function showSearchResult() {
    $(".search .search_result").css("display", "block");
    $(".search .hotSearch").css("display", "none");
    $(".search .haveFollow").css("display", "none");
}

//������������������б�div,ͬʱ��ʾ���Ż�����Ѹ���
function hideSearchResult() {
    $("#newsTitleUL").html("");
    $(".search .search_result").css("display", "none");
    $(".search .hotSearch").css("display", "block");
    $(".search .haveFollow").css("display", "block");
}
//����ɾ����ť�����ݹؼ���ɾ���ҵ��Ѹ��ٹؼ���
function deleteFollowByKeywords(keywords) {
    event.stopPropagation();
    if (isNull(openId)) {
        checkLogin();
    }
    //1.�û�ȡ��׷�ٹؼ���
    var strUrl = "/api/news/" + openId + "/cancelKeyword/" + keywords; //ȡ���ؼ��ʸ���
    getApiData(strUrl, function (data) {
        if(1000 == data.code) {
            //2.ˢ���Ѹ����б�
            getMyFollowList();
            hideDelete();
            return false; //��ֹ�¼�ð��
        }
        hideDelete();
        return false; //��ֹ�¼�ð��
    }, false);
    return false;//��ֹ�¼�ð��
}

//ɾ��ȡ���༭��ť
function deleteFollow(){
    if($(".haveFollow ul li em").css("display") == "block") {
        $(".haveFollow ul li em").css("display","none");
        $(".deleteFollow").html("ɾ��");
    } else {
        $(".haveFollow ul li em").css("display","block");
        $(".deleteFollow").html("ȡ��");
    }

}

function hideDelete(){
    $(".haveFollow ul li em").css("display","none");
    $(".deleteFollow").html("ɾ��");
}

function showInputClose(){
    $(".search_input .icon_close").show();
}
function hideInputClose(){
    $(".search_input .icon_close").hide();
}