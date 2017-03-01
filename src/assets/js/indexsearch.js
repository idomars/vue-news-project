/**
 * Created by jijw on 2016/8/26.
 */
var pageIndex = 1;  //ҳ��
var pageSize = 10;  //ÿҳ��ʾ����
var pageCount = 1;  //��ҳ��
var entityAmount = 0;   //����
var openId = getCookie("openid");
var height =  window.screen.height;
$(function(){
    card_compiler = Handlebars.compile($("#title-list").html());
    getList();  //���û�ȡ��ѯ�������

    //�����������仯ʱ���½��в�ѯ��sh����ҳ��Ϊ1
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
    //������ҳ
    $(window).scroll(function () {
        //�ж��Ƿ񵽵ײ�
        if ($(window).scrollTop() >= $(document).height() - $(window).height() ) {
        //if($(".indexsearch").height() +44 == height+$(window).scrollTop()){
            if(pageIndex<pageCount){
                pageIndex++;     //���ҳ��
                getList();
            }
        }
    });
})

//��ѯ
function getList(){
    var keyword = $("#keyword").val();  //��ȡ��ѯ�ؼ���
    $.ajax({
        type: "GET",
        dataType: "json",
        data:{"title":keyword},
        url: baseUrl + "/api/news/list/" + pageIndex + "/" + pageSize,
        success: function (j) {
            //�ж��Ƿ�ɹ���ȡ��ѯ���
            if(1000 == j.code){
                entityAmount = j.entityCount;
                pageCount = j.pageCount;
                $("ul").append(card_compiler(j.data));
                //�ж�ҳ���Ƿ�δ������������Ϊȡ��
                if(height>$(".indexsearch").height()&&pageIndex<pageCount){
                    pageIndex++;    //���ҳ��
                    getList();
                }
            }else if(1001 == j.code){
                $("ul").html("<li>" + j.msg + "</li>");
            }else{
                $("ul").html("<li>���������</li>");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
           addHint("��ѯʧ�ܣ�");
        }
    });
}
//�����ѯ��ť�����²�ѯ
function new_query(){
    pageIndex = 1;
    $("ul").html("");
    getList();
}

//���������
function keyclear(){
    $('#keyword').val("");
    pageIndex = 1;
    $("ul").html("");
    getList();
    $("#clear_btn").hide();
}
//������ҳ
function back(){
    location.href="/news/index.html";
}