/**
 * Created by Administrator on 2016/8/26.
 */
var openId = getCookie("openid");
//var openId = 1;
var likeNum;    //������
var sourceId;   //��ԴId
var id; //����Id
var isfocus;    //�Ƿ��ע 1��ע��2δ��ע
var islike;     //�Ƿ���� 1���ޣ�2δ����
var iscollect;  //�Ƿ��ղ� 1�ղأ�2δ�ղ�
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


    id = getQueryString("id");  //��ȡ����Id
    var url = "/api/news/" + id + "/detail";   //ƴ�Ӳ�ѯ����Id��·��
    if(null != openId && "" != openId && undefined != openId){
        url += "?openId=" + openId;
    }
    //��ȡ��������
    getApiData(url, getDetail, false);

    //��ע��ť
    $(".concern_btn").on("click", function(){
        //�ж��û��Ƿ��¼
        if(isNull(openId)){
            checkLogin();
            return;
        }
        //�ж��Ƿ��ע���ǡ���ȡ����ע���񡪡���ӹ�ע
        if(isfocus == 1){
            var url = "/api/news/" + openId + "/cancelFocus/" + sourceId;
            getApiData(url, delfocus, false);
        }else{
            var url = "/api/news/" + openId + "/focus/" + sourceId;
            getApiData(url, focus, false);
        }
    });
    //�ղذ�ť
    $("#collect_icon").on("click", function(){
        //�ж��û��Ƿ��¼
        if(isNull(openId)){
            checkLogin();
            return;
        }
        //�ж��Ƿ��ղأ�   �ǡ���ȡ���ղأ��񡪡�����ղ�
        if(1 == iscollect){
            var url = "/api/news/" + openId + "/cancelCollect/" + id;
            getApiData(url, discollect, false);
        }else{
            var url = "/api/news/" + openId + "/collect/" + id;
            getApiData(url, collect, false);
        }
    });
    //���ް�ť
    $("#like_img").on("click", function(){
        //�ж��û��Ƿ��¼
        if(isNull(openId)){
            checkLogin();
            return;
        }
        //�ж��Ƿ���ޣ�   �ǡ���ȡ�����ޣ��񡪡�����
        if(islike == 1){
            var url = "/api/news/" + openId + "/dislike/" + id;
            getApiData(url, dislike, false);
        }else{
            var url = "/api/news/" + openId + "/like/" + id;
            getApiData(url, like, false);
        }
    });
})
//��ѯ�ɹ�����
function getDetail(j){
    //�ж��Ƿ�ɹ�ȡ����������
    if(j.code == 1000){
        //����������Ϣ
        $("#title").html(j.data.title);
        $("#addTime").html(j.data.addTime);
        $("#sourceName").html('<a href="sourceNewsList.html?sourceId=' + j.data.sourceId + '&from=d&newsId=' + id + '" style="color: #3B9DFE">' + j.data.sourceName + '</a>');
        //�����ͼƬ�����ͼƬ��û�о�����ͼƬ��ǩ
        //null == j.data.img || "" == j.data.img ? $("#img").hide() : $("#img").attr("src", j.data.img);
        var cotent =processTXT(j.data.content);
        $("#brief").html(cotent);
        $("#clickNum").html(j.data.clickNum);
        likeNum = j.data.likeNum;   //���õ�����
        $("#likeNum").html(likeNum);
        sourceId = j.data.sourceId; //������ԴId
        isfocus = j.data.isFocus;   //�����Ƿ��ע
        //�ж��Ƿ��ע
        if(1 == j.data.isFocus){
            $("#isfocus").html("�ѹ�ע");
            $("#isfocus").css("background", "#dfdfdf");
        }else{
            $("#isfocus").html("��ע");
        }
        islike = j.data.isLike; //�����Ƿ����
        //�ж��Ƿ��ղ�
        if(1 == islike){
            $("#yes_icon").attr("class", "yes_icon_green");
            $("#likeNum").css("color", "#56CD81");
        }
        iscollect = j.data.isCollect;   //�����Ƿ��ղ�
        //�ж��Ƿ��ղ�
        if(1 == iscollect){
            $("#collect_icon").attr("class", "collect_icon_yes");
        }
    }else{
        addHint("��������Ϣ");
    }

}
//�ղ�
function collect(data){
    //�ж��ղسɹ�
    if(data.code == 1000){
        iscollect = 1;
        $("#collect_icon").attr("class", "collect_icon_yes");
    }else{
        addHint(data.msg);
    }
}
//ȡ���ղ�
function discollect(data){
    //�ж��Ƿ�ȡ���ղسɹ�
    if(data.code == 1000){
        iscollect = 2;
        $("#collect_icon").attr("class", "collect_icon");
    }else{
        addHint(data.msg);
    }
}

//����
function like(data){
    //�ж��Ƿ���ӵ��޳ɹ�
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
//ȡ������
function dislike(data){
    //�ж��Ƿ�ȡ�����޳ɹ�
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


//��ע
function focus(data){
    //�ж��Ƿ���ӹ�ע�ɹ�
    if(data.code == 1000){
        $("#isfocus").html("�ѹ�ע");
        $("#isfocus").css("background", "#dfdfdf");
        isfocus = 1;
    }else{
        addHint(data.msg);
    }
}

//ȡ����ע
function delfocus(data){
    //�ж��Ƿ�ȡ����ע�ɹ�
    if(data.code == 1000){
        $("#isfocus").html("��ע");
        $("#isfocus").css("background", "#46C23D");
        isfocus = 2;
    }else{
        addHint(data.msg);
    }
}
//�ж��û�Id�Ƿ����
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
/*��ָ������Ļ��*/
document.addEventListener("touchstart", function (e) {
//            e.preventDefault();
    deltaX = 0;
    var touch = e.touches[0];
    startX = touch.pageX;
    viewport.style.webkitTransition = ""; //ȡ������Ч��
    startT = new Date().getTime(); //��¼��ָ���µĿ�ʼʱ��
    isMove = false; //�Ƿ��������
}.bind(this), false);

/*��ָ����Ļ�ϻ�����ҳ�������ָ�ƶ�*/
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