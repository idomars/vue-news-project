<template>
    <div>
        <header>
            <h1>排名</h1>
            <div class="arrow_left" onclick="back();"></div>
        </header>
        <div class="wrapper">
            <div class="tabs">
                <ul class="rank" style="font-size:1.4rem">
                    <li class="select" isAvg="0" id="total">总点击</li>
                    <li isAvg="1" id="avg">平均点击</li>
                </ul>
            </div>
            <div class="click">
                <table>
                    <thead>
                        <tr>
                            <th style="text-align: center;">排名</th>
                            <th style="text-align: center;">名称</th>
                            <th ordtype="2" class="ordtype" nameval="阅读">
                                <div class="table_green table_th">
                                    <p>阅读量</p>
                                    <em class="up"></em>
                                </div>
                            </th>
                            <th style="text-align: right;" ordtype="1" class="ordtype" nameval="点赞">
                                <div class="table_th table_gray" style="float: right;">
                                    <p>点赞量</p>
                                    <em class="down"></em>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
