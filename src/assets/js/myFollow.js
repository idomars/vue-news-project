/**
 * Created by dongying on 16/8/25.
 */
var openId = $.cookie("openid");
var _NOW_PAGE = 1;
var _PAGE_COUNT = 0;
var _PAGE_SIZE = 10;
var pageIndex = 0;
var loadFlag = 1; //是否加载标识

var title;


$(function () {
    if (isNull(openId)) {
      checkLogin();
    }
    Handlebars.registerHelper("equal", function (v1, v2, options) {
        if (v1 == v2) {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }
    });
    getUrlTitleValue();
    //加载数据
    reloadData(_NOW_PAGE);
});


//后台查询数据并填充页面模板
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
           addHint("没有数据了！")
        } else {
            var html = '';
            html += '<p style="font-size: 1.6rem;color: #333;text-align: center;width: 100%;padding: 6px 0;">查询异常</p>'
            $("ul.news_list").html(html);
        }
    }, false);
};

//翻页时加载下一页数据
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

//获取路径上的title参数值
function getUrlTitleValue() {
    //获取从其他页面传过来的title
    var urlinfo = window.location.href;//获取url
    if (urlinfo.split("?")[1]) {
        //var param1 = urlinfo.split("?")[1].split("=")[1];//拆分url得到”=”后面的参数title=eori&
        var paramTitle;
        var paramsStr = urlinfo.split("?")[1];
        if(paramsStr.indexOf("title") > -1 ) {  //参数title存在
            var titleA = paramsStr.substring(paramsStr.indexOf("title"),paramsStr.length);
            var endIndex = titleA.indexOf("&") > -1 ? titleA.indexOf("&"):titleA.length;
            paramTitle = titleA.substring(titleA.indexOf("=")+1,endIndex);
        }
        title = paramTitle; //MyFollowSearch页面带过来的参数 getQueryString("title")会乱码
    }
}

//填充页面我的跟踪列表div模板
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
    loadFlag = 1;//表明这次请求的页面数据加载完毕
};

//点击搜索按钮跳转跟踪搜索页面
function goFollowSearch() {
    location.href = "myFollowSearch.html";
}

/*//点击取消关注取消当前记录关注
function cancelFocus(id) {
    checkLogin("myFollow.html");
    //关注接口
    var url = "/api/news/" + openId + "/cancelFocus/" + id;
    getApiData(url, function (data) {
        if (data.code == 1000) {
            addHint("取消成功");
            reloadData();
        } else {
            addHint(data.msg)
        }
    })

}

//点击关注关注当前记录
function focuss(id) {

    checkLogin("myFollow.html");
    var url = "/api/news/" + openId + "/focus/" + id;
    getApiData(url, function (data) {
        if (data.code == 1000) {
            addHint("关注成功");
            reloadData();
        } else {
            addHint(data.msg)
        }
    })
}*/

//点击某条跟踪news跳转新闻详情页
function goNewsDetailPage(newsid) {
    location.href = "newsDetail.html?id=" + newsid;
}
