<template>
    <div>
        <header class="white2">
            <div class="search_input">
                <div class="search_icon" onclick="new_query();"></div>
                <input type="text" placeholder="请输入感兴趣的内容" id="keyword">
                <div class="icon_close" id="clear_btn" onclick="keyclear();" style="display: none"></div>
            </div>
            <div class="cancel">
                <a onclick="back();">取消</a>
            </div>
        </header>
        <div class="wrapper indexsearch">
            <div class="search_index">
                <div class="result_title">
                    <h1>搜索结果</h1>
                </div>
                <ul>
                </ul>
            </div>
        </div>
    </div>
</template>
