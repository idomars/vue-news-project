<template>
    <div>
        <header class="white">
            <h1>我的收藏</h1>
            <div class="arrow_left" onclick="javascript:history.go(-1);"></div>
            <div class="writeBtn" onclick="deleteNews();">编辑</div>
        </header>
        <div class="wrapper collect collected">
            <ul class="news_list">
            </ul>
        </div>
        <div class="deleteConfirm">
            <a class="deleteGreen" href="javascript: void(0);">选择全部</a>
            <a class="deleteRed" href="javascript: void(0);">删除</a>
        </div>
    </div>
</template>

<script>
	export default{
	
	}
</script>
