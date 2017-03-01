var processTXT=function(content){
    var html = content;
    var reg = "";
    if(html.length>0){
        reg = /<p.(style)?style=\".*?\">/g;
        html = html.replace(reg,"<p style=\"width:100%; height: auto;\">");

        reg = /<div.(style)?style=\".*?\">/g;
        html = html.replace(reg,"<div style=\"width:100%; height: auto;\">");

        reg = /<h1.(style)?style=\".*?\">/g;
        html = html.replace(reg,"<h1 style=\"width:100%; height: auto;\">");

        reg = /<h2.(style)?style=\".*?\">/g;
        html = html.replace(reg,"<h2 style=\"width:100%; height: auto;\">");

        reg = /<h3.(style)?style=\".*?\">/g;
        html = html.replace(reg,"<h3 style=\"width:100%; height: auto;\">");

        reg = /<table(.*?)style=\".*?\"(.*?)>/g;
        html = html.replace(reg,"<table $1 style=\"width:100%; height:auto\" $2>");

        reg = /<table(.*?)style=\".*?\"(.*?)>/g;
        html = html.replace(reg,"<table $1 style=\"width:100%; height:auto; \" cellspacing='1' $2>");

        reg = /<td.*?>/g;
        html = html.replace(reg,"<td style='padding:4px; background-color: #fff; border: 1px;'>");

        reg = /<img(.*?)style=\".*?\"(.*?)>/g;
        html = html.replace(reg, "<img $1 style=\"width:100%;height:auto;\" $2>");
    }
    return html;
}
//reg = /<p.(style)?style=\"(.*?)height.*?;(.*?)\">/g;
//html = html.replace(reg,"<p style=\"$1height:auto;$2\">");
//
//reg = /<p.(style)?style=\"(.*?)padding:(.*?)px;(.*?)\">/g;
//html = html.replace(reg,"<p style=\" $1width:calc(100% - $2*2px); padding:$2px;$3 \">");

//reg = /<h1.*?style=\".*?width.*?\">/g;
//html = html.replace(reg,"<h1 style=\"width:100%;\">");
//reg = /<h2.*?style=\".*?width.*?\">/g;
//html = html.replace(reg,"<h3 style=\"width:100%;\">");

//reg = /<p.*?style=\"(.*?)width.*?;.*?padding:(.*?)px(.*?)\">/g;
//html.replace(reg,"<p style=\"$1width:calc(100% - $2*2px); padding:$2px$3\">");
//
//reg = /<p.*?style=\"(.*?)width.*?;(.*?)height.*?;(.*?)padding:(.*?)px(.*?)\">/g;
//html = html.replace(reg,"<p style=\"$1width:calc(100% - $4*2px);$2height:auto;$3padding:$4px$5\">");
//
//reg = /<h1(.*?)style=\"(.*?)width.*?;(.*?)\"(.*?)>/g;
//html = html.replace(reg,"<h1 $1 style=\"$2width:100%;$3\"$4>");
//
//reg = /<h1(.*?)style=\"(.*?)width.*?;(.*?)height.*?;(.*?)padding:(.*?)px;(.*?)\"(.*?)>/g;
//html = html.replace(reg,"<h1 $1 style=\"$2width:calc(100% - $5*2px);$3height:auto;$4padding:$5px;$6\"$7>");
//
//reg = /<h2(.*?)style=\"(.*?)width.*?;(.*?)\"(.*?)>/g;
//html = html.replace(reg,"<h2 $1 style=\"$2width:100%;$3\"$4>");
//
//reg = /<h2(.*?)style=\"(.*?)width.*?;(.*?)height.*?;(.*?)padding:(.*?)px;(.*?)\"(.*?)>/g;
//html = html.replace(reg,"<h2 $1 style=\"$2width:calc(100% - $5*2px);$3height:auto;$4padding:$5px;$6\"$7>");