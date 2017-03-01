<template>
    <div>
        <div>
            <ul class="news_list">
                <li v-for="(item,index) in newsList">
                    <div class="news_hd">
                        <a ><img class="imgmiddle" :src="item.img"></a>
                    </div>
                    <div class="news_bd">
                        <a ><h1>{{item.title}}</h1></a>
                        <div class="bd_bd">
                            <div class="bd_left">
                                <p><span>{{item.addTime}}</span>&nbsp; 喜欢
                                    <span>{{item.likeNum}}</span> 阅读
                                    <span>{{item.clickNum}}</span></p>
                            </div>
                            <div class="bd_right">
                                <p>{{item.sourceName}}</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    baseUrl
} from '../utils.js'
export default {
    data() {
            return {
                newsList: [],
                cateoryId: 0
            }
        },
        props: {
            pageNo: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            cateId: {
                require: true
            }
        },
        watch: {
            'cateId': function(newVal, oldVal) {
                if (newVal == 2) {
                    this.cateoryId = 0;
                } else {
                    this.cateoryId = newVal;
                }
                this.queryNews();
            }
        },
        methods: {
            queryNews() {
                let url = baseUrl + "/api/news/listByCid/" + this.cateoryId + "/" + this.pageNo + "/" + this.pageSize;
                console.log(url);
                this.$http(url).then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        this.newsList = res.data.data;
                        if(this.pageNo == 1){
                        	bus.$emit('pageTotal',res.data.pageCount)
                        }
                    }
                }, (res) => {
                    console.log(res);
                });
            }
        }

}
</script>
