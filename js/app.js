/**
 * Created by Baron on 2016/5/25.
 */

var icon_count = true;

function g(selector){
    var method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}

function change_style(ele, class_n){
    var element = g(ele);
    element.className = class_n;
}

function scroll_o(isTop, timer){
    if(!isTop){
        clearInterval(timer);
    }
    isTop = false;
}

function scroll_t(){
    var scrTop = document.documentElement.scrollTop || document.body.scrollTop,
        page_top = g('.three_page')[0].offsetTop - 600,
        page_bottom = page_top + 1200;
    if(scrTop > page_top && scrTop < page_bottom){
        change_style('#T_degreen', 'T_degreen');
    }else{
        change_style('#T_degreen', '');
    }
}

window.onscroll = function(){
    scroll_o();
    scroll_t();
};

function nav_to_page(target){
    var pageTop = target,
        isTop = true,
        timer = null;
    scroll_o(isTop, timer);
    timer = setInterval(function(){
        var scrTop = document.documentElement.scrollTop || document.body.scrollTop,
            speed = Math.ceil( (pageTop- scrTop) / 5);
        document.documentElement.scrollTop = document.body.scrollTop = scrTop + speed;
        isTop = true;
        if(scrTop >= pageTop){
            clearInterval(timer);
        }

    }, 30);
}

function switch_to_page(i, page_nav){
    g('.nav_title')[i].addEventListener('click',function(){
        var page_top = g('.' + page_nav + '_page')[0].offsetTop;
        change_style('#icon', 'icon');
        change_style('#nav', 'nav_hide');
        icon_count = true;
        nav_to_page(page_top);
    });
}

g('#icon_hun').addEventListener("click", function(){
    if(icon_count){
        change_style('#icon', 'icon_change');
        change_style('#nav', 'nav_show');
        icon_count = false;
    }else{
        change_style('#icon', 'icon');
        change_style('#nav', 'nav_hide');
        icon_count = true;
    }
});

for(var i = 0; i < 3; i++){
    var page_nav = null;
    switch(i){
        case 0:
            page_nav = 'second';
            switch_to_page(i, page_nav);
            break;
        case 1:
            page_nav = 'three';
            switch_to_page(i, page_nav);
            break;
        default:
            page_nav = 'four';
            switch_to_page(i, page_nav);
            break;
    }
}
