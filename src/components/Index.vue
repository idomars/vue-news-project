<template>
    <div>
        <header>
            <h1>新闻</h1>
            <div class="icon_order" @click="isChange=!isChange"></div>
            <div class="icon_search" onclick="javascript:location.href='indexSearch.html';"></div>
            <div class="icon_cate" @click="isChange=!isChange"></div>
        </header>
        <div class="wrapper">
            <div class="tabs">
                <div class="cateloge">
                    <div class="changeCate" v-show=showCate>
                        <p>切换栏目</p>
                    </div>
                    <div class="cateBox" id='cateBox'>
                        <ul left="" id="topCateUl">
                            <li v-for="(item,index) in cateList" @click="reloadNews($event,item.id,index)" :class="selectCateId==item.id?'select':''">{{item.cateName}}</li>
                        </ul>
                    </div>
                </div>
                <div class="catelogy" :style="showCate?emstyle:''">
                    <em class="arrow_down" @click="showCate=!showCate"></em>
                </div>
            </div>
            <News :pageNo=pageNo :pageSize=pageSize :cateId=selectCateId></News>
        </div>
        <div class="zhezhao_trans" v-show=isChange @click="isChange=false"></div>
        <div class="zhezhao_trans2" v-show=showCate @click="showCate=false"></div>
        <div class="down_cate" v-show=showCate>
            <ul id="downCateUl">
                <li v-for="(item,index) in cateList" @click="reloadNews($event,item.id,index)"><span>{{item.cateName}}</span></li>
            </ul>
        </div>
        <div class="down_cate2" v-show=isChange>
            <ul>
                <a href="javascript;">
                    <li>
                        <img src="../assets/imgs/icon_atten.png">
                        <p>关注</p>
                    </li>
                </a>
                <a href="javascript;">
                    <li>
                        <img src="../assets/imgs/icon_follow.png">
                        <p>跟踪</p>
                    </li>
                </a>
                <a href="javascript;">
                    <li>
                        <img src="../assets/imgs/icon_collect_yellow.png">
                        <p>收藏</p>
                    </li>
                </a>
            </ul>
        </div>
        <div id="bottomNavbar" data-am-widget="navbar" class="am-navbar am-cf am-navbar-default hbt hborder-color">
            <ul class="am-navbar-nav am-cf am-avg-sm-4" id="menu-list">
            </ul>
        </div>
    </div>
</template>
<script>
import {
    baseUrl,
    getScrollTop,
    getScrollHeight,
    getWindowHeight
} from '../utils.js'
import News from './NewList.vue'
export default {
    data() {
            return {
                emstyle: {
                    transform: "rotate(180deg)"
                },
                cateList: [],
                newsList: [],
                isChange: false,
                showCate: false,
                selectCateId: 0,
                pageNo: 1,
                pageSize: 10,
                pageTotal:0
            }
        },
        components: {
            News
        },
        mounted() {
            this.$nextTick(function() {
                this.selectCateId = 2
                this.pageInit();
                bus.$on('pageTotal',(val)=>{
                    this.pageTotal = val;
                    console(his.pageTotal);
                })
                window.addEventListener('scroll', this.handleScroll);
            }.bind(this));
        },
        methods: {
            pageInit() {
                this.loadCates();
            },
            loadCates() {
                let url = baseUrl + "/api/news/newsCateList";
                this.$http(url).then((res) => {
                    if (res.status == 200) {
                        this.cateList = res.data.data;
                    }
                }, (res) => {
                    console.log(res);
                });
            },
            reloadNews(e, id, index) {
                this.selectCateId = id;
                var target = e.target;
                let len = 52 * (index);
                if (target.nodeName == 'SPAN') {
                    this.showCate = false;
                    document.getElementById('cateBox').scrollLeft = len;
                }


            },
            handleScroll() {
              　if(getScrollTop() + getWindowHeight() == getScrollHeight()){
　　　　            this.pageNo++
　　　　        }
               
            }
        }



}

</script>
