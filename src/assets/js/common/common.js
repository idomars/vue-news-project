/**
 */

//var baseUrl = "";
//var jgUrl = "http://api.100qu.net";
////var pageUrl = "http://m.100qu.net";
//var loginUrl = "http://g.100qu.net/api/index.php";


var baseUrl = "https://api2.100qu.net";
//var jgUrl = "https://api.100qu.net";
var jgUrl = "https://s.100qu.net";
var loginUrl = "http://g.100qu.net/api/index.php";

// ���ô���
var callNum = 100;
var openid;


$(function () {

    var lo_url = window.location.href;
    pageUrl = lo_url.split("?")[0];
    var params = lo_url.split("?")[1];
    $("#menu-list").html(getMenu(pageUrl))
    var openid = $.cookie("openid");
    if (isNull(openid)) {
        var url_openid = getQueryString("openid");
        if (null != url_openid && "" != url_openid) {
            // ��½����
            verifyIsLogin(url_openid);
        } else {
            if (!isNull(params)) {
                $.cookie("urlParams", params, {expires: 7, path: '/', domain: '100qu.net'});
            }
        }
    }else{
        setMenuInf();
    }

})


function isNull(val) {
    if (undefined == val || null == val || "" == val || "undefined" == val) {
        return true;
    } else {
        return false;
    }
}

// ����Get����
function getApiData(strUrl, successFun, async) {

    if (null == async || "" == async || undefined == async) {
        async = false;
    }

    if (1000000 == callNum) {
        callNum = 0;
    }
    callNum++;

    $.ajax({
        type: "GET",
        url: baseUrl + strUrl,
        async: async,
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "JsonpCallBack_" + callNum,
        success: successFun,
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

// ����Post����
function PostApiData(strUrl, params, successFun, async) {
    var postData = JSON.stringify(params);

    if (null == async || "" == async || undefined == async) {
        async = false;
    }

    $.ajax({
        type: "POST",
        url: baseUrl + strUrl,
        async: async,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: postData,
        success: successFun,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

// ��ȡCookie
function getCookie(key) {
    return $.cookie(key);
}
// ����Cookie
function setCookie(key, val) {
    $.cookie(key, val, {expires: 7, path: '/', domain: '100qu.net'});
}

//ɾ��Cookie
function delCookie(CookieName) {
    $.removeCookie(CookieName, {path: '/', domain: '100qu.net'});
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null
}

function checkLogin() {
    var tunnelID = getCookie("tunnelID");
    if (!isNull(tunnelID)) {
        location.href = loginUrl + "/API/login.html?appid=1&tunnelID=" + tunnelID + "&url=" + pageUrl
    } else {
        location.href = loginUrl + "/API/login.html?appid=1&url=" + pageUrl  ;
    }
}

/**
 * ��ʾ��
 */
function addHint(msg) {
    var hintHtml = '';
    hintHtml += '<div id="gxMakeHint" style="position: fixed;right: 0;bottom: 0;z-index: 1100;width: 100%;height: 100%;background-color: rgba(0,0,0,0)">'
        + '<div style="margin-top: 280px;text-align: center;padding: 0 20%;">'
        + '<div style="height: 65px;line-height: 65px ;text-align: center;background-color:rgba(0,0,0,0.8);border-radius: 5px;font-size: 16px;color: #fff;">'
        + msg
        + '</div></div></div>';
    $("#gxMakeHint").remove();
    $( "header" ).append(hintHtml);
    setTimeout( '$("#gxMakeHint").remove()' , "1000" );

}
//�����򣬿�������Ϣ��ʱ�䣨"2000"�����ص��������Լ�����function����������û�оʹ�""��,����������û�оʹ�""��
function addHintWithTime( msg ,time,fn,param){
    var hintHtml = '';
    hintHtml += '<div id="gxMakeHint" style="position: fixed;right: 0;bottom: 0;z-index: 1100;width: 100%;height: 100%;background-color: rgba(0,0,0,0)">'
        + '<div style="margin-top: 280px;text-align: center;padding: 0 20%;">'
        + '<div style="height: 65px;line-height: 65px ;text-align: center;background-color:rgba(0,0,0,0.8);border-radius: 5px;font-size: 16px;color: #fff;">'
        + msg
        + '</div></div></div>';
    $("#gxMakeHint").remove();
    $( "header" ).append(hintHtml);
    setTimeout( function(){
        $("#gxMakeHint").remove();
        if(fn != ""){
            fn(param);
        }
    } , time );
}
//ȷ��ȷ�Ͽ򣬿�������Ϣ��ȷ�ϰ�ť��Ӧ�������Լ�����function����������,����������û�оʹ�""��
function openConfirmBox(content,fn,param){
    var html='';
    html += "<div class='hidePub' style='width: 100%; height: 100%; background: rgba(0,0,0,0.4); position: fixed; top: 0; left: 0;'>"
        + "<div class='hidebox'>"
        + "<div class='content'><h1>"+content+"</h1></div>"
        + "<div class='pubbutton'>"
        + "<a class='pubCancel halfbtn disabled' onclick='closeConfirmBox();'>ȡ��</a>"
        + "<a  class='halfbtn' id='qbtn'>ȷ��</a>"
        + "</div></div></div>";
    $(".hidePub").remove();
    $("header").append(html);
    $("#qbtn").click(function(){
        $(".hidePub").remove();
        fn(param);
    });
}
//�ر�ȷ�Ͽ�
function closeConfirmBox(){
    $(".hidePub").remove();
}
function voteDone() {
    var haveHtml = '';
    haveHtml += '<div class="noDo">'
        + '<div class="nobox">'
        + '<img src="images/att.png">'
        + '<h1>ͶƱ�ɹ�</h1>'
        + '<a class="voteBtn" onclick="removeDone();">֪����</a>'
        + '</div></div>';
    $("header").append(haveHtml);
}


function verifyIsLogin(openid) {
    var key = getQueryString("key");
    var ts = getQueryString("timelogin");

    var strUrl = "/api/sdk/verifyLogin?openid=" + openid;
    strUrl += "&ts=" + ts;
    strUrl += "&key=" + key;

    $.ajax({
        type: "GET",
        url: jgUrl + strUrl,
        async: true,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "JsonpCallBack_" + callNum,
        success: function (data) {
            if ("ok" == data.status) {

                $.cookie("openid", openid, {expires: 7, path: '/', domain: '100qu.net'});
                $.cookie("loginKey", key, {expires: 7, path: '/', domain: '100qu.net'});
                $.cookie("loginTs", ts, {expires: 7, path: '/', domain: '100qu.net'});
                callBack();
            } else {
                $.removeCookie("openid", {path: '/', domain: '100qu.net'});
                $.removeCookie("loginKey", {path: '/', domain: '100qu.net'});
                $.removeCookie("loginTs", {path: '/', domain: '100qu.net'});
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}


function callBack() {
    var params = $.cookie("urlParams");
    if (!isNull(params)) {
        window.location.href = pageUrl + "?" + params;
    } else {
        window.location.href = pageUrl
    }
}



/***********************������********************************/
var menuArr = new Array("index", "credit", "wechat", "me", "wxshare");

function changeImage(me) {

    changeImages();
    var id = $(me).attr("id");

    switch (id) {
        case "indexId":
            $("#" + id + " > img").attr("src", "images/icon/menu_index_choice.png");
            $("#" + id + " > span").attr("style", "color:#22ac38;");
            break;

        case "creditId":
            $("#" + id + " > img").attr("src", "images/icon/menu_credit_choice.png");
            $("#" + id + " > span").attr("style", "color:#22ac38;");
            break;

        case "wechatId":
            $("#" + id + " > img").attr("src", "images/icon/menu_wechat_choice.png");
            $("#" + id + " > span").attr("style", "color:#22ac38;");
            break;

        case "meId":
            $("#" + id + " > img").attr("src", "images/icon/menu_me_choice.png");
            $("#" + id + " > span").attr("style", "color:#22ac38;");
            break;

        case "wxshareId":
            $("#" + id + " > img").attr("src", "images/icon/menu_wxshare_choice.png");
            $("#" + id + " > span").attr("style", "color:#22ac38;");
            break;

        default:
            break;
    }
}

function setMenuInf() {
    $("#meId > span").html("�˺�");
    $("#meId").attr("href", "http://g.100qu.net/index.php/Phoneindex/personal.html");
}


function changeImages() {
    menuArr.forEach(function (v) {

        $("#" + v + "Id > img").attr("src", "images/icon/menu_" + v + ".png");
        $("#" + v + "Id > span").attr("style", "color:#333333;");
    });
}


function getMenu(pageUrl) {
    var menu_html = '<li class=""> <a id="indexId" href="http://m.100qu.net/index.html" class="" onclick="changeImage(this);"> <img src="images/icon/menu_index.png" alt="��ҳ"/> <span class="am-navbar-label">��ҳ</span> </a> </li> ' +
        '<li> <a id="creditId" href="http://g.100qu.net/index.php/Phoneindex/recharge.html" class="" onclick="changeImage(this);"> <img src="images/icon/menu_credit.png" alt="���ֶһ�"/> <span class="am-navbar-label">��ֵ����</span> </a> </li> ' +
        '<li> <a id="userVipId" href="../vipZone/index.html" class="" onclick="changeImage(this);"> <img src="../images/icon/menu_user_vip.png" alt="��Աר��"/> <span class="am-navbar-label">��Աר��</span> </a> </li> ';
    menu_html += '<li>';
    var tunnelId = $.cookie("tunnelID");
    if (null == tunnelId || "" == tunnelId || undefined == tunnelId) {
        menu_html += '<a id="meId" href="http://g.100qu.net/api/index.php/API/login.html?appid=1&url=' + pageUrl + '" class=""' +
            ' onclick="changeImage(this); ">'
    } else {
        menu_html += ' <a id="meId" href="http://g.100qu.net/api/index.php/API/login.html?appid=1&tunnelID=' + tunnelId + '&url=' + pageUrl + '" class=""' +
            ' onclick="changeImage(this); ">';
    }
    menu_html += '<img src="images/icon/menu_me.png" alt="��¼"/> <span class="am-navbar-label">��¼</span> </a> </li>';
    return menu_html;
}
