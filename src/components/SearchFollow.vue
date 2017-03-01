<template>
	<div>
    <header class="white2">
        <div class="search_input">
            <div class="search_icon"></div>
            <input id="text_title" type="text" placeholder="请输入感兴趣的内容">
            <div class="icon_close" onclick="clearText();"></div>
        </div>
        <div class="cancel" onclick="goFollowListPage();">
            <a>取消</a>
        </div>
    </header>
    <div class="wrapper search">
        <div class="search_result">
            <div class="result_title">
                <h1>搜索结果</h1>
            </div>
            <ul id="newsTitleUL">
            </ul>
        </div>
        <div class="hotSearch">
            <div class="hot_title">
                <h1>热点话题</h1>
            </div>
            <ul id="hotWordsUL">
            </ul>
        </div>
        <div class="grayLine"></div>
        <div class="haveFollow">
            <div class="follow_title">
                <h1>已跟踪</h1>
                <a class="deleteFollow" onclick="deleteFollow();">删除</a>
            </div>
            <ul id="myFollowUL">
            </ul>
        </div>
    </div>
    </div>
</template>
