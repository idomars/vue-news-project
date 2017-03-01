/**
 * Created by dongying on 16/8/25.
 */
var openId = $.cookie("openid");
var _NOW_PAGE = 1;
var _PAGE_COUNT = 0;
var _PAGE_SIZE = 10;
var pageIndex = 0;
var loadFlag = 1; //�Ƿ���ر�ʶ

var title;


$(function () {
    if (isNull(openId)) {
      checkLogin();
    }
    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            //������Ӽ���ִ��
            return options.fn(this);
        } else {
            //����������ִ��{{else}}����
            return options.inverse(this);
        }
    });
    getUrlTitleValue();
    //��������
    reloadData(_NOW_PAGE);
});


//��̨��ѯ���ݲ����ҳ��ģ��
function reloadData(_pg) {
    pageIndex = (_NOW_PAGE - 1) * _PAGE_SIZE;
    var strUrl = "/api/news/" + openId + "/followList/" + pageIndex + "/" + _PAGE_SIZE;

    if (!isNull(title) && title.trim() != "") {
        strUrl += "?title=" + title;
    }
    getApiData(strUrl, function (data) {
        if (1000 == data.code) {

            _PAGE_COUNT = data.pageCount;
            setFolloewList(data.data);
        } else if (1001 == data.code) {
           addHint("û�������ˣ�")
        } else {
            var html = '';
            html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">��ѯ�쳣</p>'
            $("ul.news_list").html(html);
        }
    }, false);
};

//��ҳʱ������һҳ����
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200) {
        if (_NOW_PAGE < _PAGE_COUNT) {
            if (1 == loadFlag) {
                reloadData(++_NOW_PAGE);
                loadFlag = 0;
            }
        }
    }
});

//��ȡ·���ϵ�title����ֵ
function getUrlTitleValue() {
    //��ȡ������ҳ�洫������title
    var urlinfo = window.location.href;//��ȡurl
    if (urlinfo.split("?")[1]) {
        //var param1 = urlinfo.split("?")[1].split("=")[1];//���url�õ���=������Ĳ���title=eori&
        var paramTitle;
        var paramsStr = urlinfo.split("?")[1];
        if(paramsStr.indexOf("title") > -1 ) {  //����title����
            var titleA = paramsStr.substring(paramsStr.indexOf("title"),paramsStr.length);
            var endIndex = titleA.indexOf("&") > -1 ? titleA.indexOf("&"):titleA.length;
            paramTitle = titleA.substring(titleA.indexOf("=")+1,endIndex);
        }
        title = paramTitle; //MyFollowSearchҳ��������Ĳ��� getQueryString("title")������
    }
}

//���ҳ���ҵĸ����б�divģ��
function setFolloewList(data) {
    var source = $("#followList").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    if (_NOW_PAGE == 1) {
        $("ul.news_list").html(html);
    } else {
        $("ul.news_list").append(html);
    }
    clacImg()
    loadFlag = 1;//������������ҳ�����ݼ������
};

//���������ť��ת��������ҳ��
function goFollowSearch() {
    location.href = "myFollowSearch.html";
}

/*//���ȡ����עȡ����ǰ��¼��ע
function cancelFocus(id) {
    checkLogin("myFollow.html");
    //��ע�ӿ�
    var url = "/api/news/" + openId + "/cancelFocus/" + id;
    getApiData(url, function (data) {
        if (data.code == 1000) {
            addHint("ȡ���ɹ�");
            reloadData();
        } else {
            addHint(data.msg)
        }
    })

}

//�����ע��ע��ǰ��¼
function focuss(id) {

    checkLogin("myFollow.html");
    var url = "/api/news/" + openId + "/focus/" + id;
    getApiData(url, function (data) {
        if (data.code == 1000) {
            addHint("��ע�ɹ�");
            reloadData();
        } else {
            addHint(data.msg)
        }
    })
}*/

//���ĳ������news��ת��������ҳ
function goNewsDetailPage(newsid) {
    location.href = "newsDetail.html?id=" + newsid;
}
