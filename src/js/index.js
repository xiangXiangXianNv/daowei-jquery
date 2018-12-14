$(function () {
    /*首页nav动态显示*/
    //一. 获取home的json数据
    $.get('http://localhost:3000/home',(dataJson)=>{
        //1.1 获取home的nav数据
        var tmpData = {};
        $.get('src/template/carusel-nav.html', function (data) {
            let render = template.compile(data);
            tmpData.nav = JSON.parse(dataJson);
            let html = render(tmpData);
            $('.banner-wrap').append(html);
            //等数据过来之后再进行下列操作
            const $lis = $('.nav-name');
            const $uls = $('.hov-content');
            const $lilis = $('.nav-name');
            const $icons = $('.nav-name .icon');
            const $rightImg = $('.nav-name .right');
            $.each($uls,(index,item)=>{
                $(item).css({
                    top : -30*index + "px"
                })
            });
            $.each($lis,(index,item)=>{
                $(item).mouseenter(()=>{
                    $($uls[index]).css({
                        display:'block'
                    });
                    $($lilis[index]).addClass('act');
                    $($icons[index]).removeClass('iconfont icon-jiantouarrow487');
                    $($rightImg[index]).attr({
                        src : 'src/images/icon1.png'
                    })
                });
                $(item).mouseleave(()=>{
                    $($uls[index]).css({
                        display:'none'
                    });
                    $($lilis[index]).removeClass('act');
                    $($icons[index]).addClass('iconfont icon-jiantouarrow487');
                    $($rightImg[index]).attr({
                        src : ''
                    })

                })
            });
        });
        //2.获取每个service的 json数据
        $.get('src/template/service.html',function (data) {
            let render = template.compile(data);
            tmpData.service = JSON.parse(dataJson);
            let html = render(tmpData);
            $('.box-wrap').append(html);
        })
    });
    /*首页轮播图*/
    new Swiper(".swiper-container",{
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable:true,
        },
        autoplay:{
            delay: 1000,
            //设置点击之后自动轮播还有效
            disableOnInteraction: false,
        },
        effect:'fade',
    });
});