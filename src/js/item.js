$(function () {

    //{{comment.createtime | dateFormat: 'yyyy-MM-dd hh:mm:ss'}}
   /* template.helper('dateFormat', function (date, format) {
        date = new Date(date);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    });*/
    $.get('http://localhost:3000/item',function (dataJson) {
        const obj = {item:JSON.parse(dataJson)};
        $.get('src/template/item-t.html',function (data) {
            const render = template.compile(data);
            const html = render(obj);
            $('.boxtab').append(html);
        })
    });
    $.get('http://localhost:3000/comment',function (dataJson) {
        const arr = JSON.parse(dataJson);
        var page = 1;
        let $ulUp = $('.page ul .up');
        var $li;
        const num = arr.length/10;
        //因为是每次插入到up的后面,所以要倒着来
        for(let i = num; i > 0; i--){
           if(i===1){
               $li = `<li class='num active'>${i}</li>`;
           }else{
               $li = `<li class='num'>${i}</li>`;
           }
            $ulUp.after($li);
        }
        $('.page ul .num').hover(function(e){
            $(e.target).css({
                backgroundColor:'rgb(254,69,74)',
                color:"white",
            });
        },function(e){
            $(e.target).css({
                backgroundColor: 'white',
                color:"black",
            });
        });
       /* const start = (page-1)*10;
        const newArr = arr.slice(start,page*10);
        const commentObj = {comments:newArr};*/
        const commentObj = {comments:arr};
        $.get('src/template/comments.html',function (data) {
            const render = template.compile(data);
            const html = render(commentObj);
            $('.comment-wrap .title').after(html);
            $('.comments').css({
                display:"none"
            });
            $('.comments').each(function (index,ele) {
                if(index<10){
                    $($('.comments')[index]).css({
                        display:'block',
                    })
                }
            })
        });
        $('.page ul .num').click(function (e) {
            //$(window).scrollTop(700);
            /*$('.page ul .num').removeClass('active');
            page = +e.target.innerHTML;
            $('.comments').hide();
            const start = (page-1)*10;
            const newArr = arr.slice(start,page*10);
            const commentObj = {comments:newArr};
            const html = template('comments',commentObj);
            $('.comment-wrap .title').after(html);
            $(e.target).addClass('active');*/
            $('.page ul .num').removeClass('active');
            page = +e.target.innerHTML;
            $('.comments').css({
                display:"none"
            });
            $('.comments').each(function (index,ele) {
                if(index>=(page-1)*10&&index<(page*10)){
                    $(ele).css({
                        display:'block',
                    })
                }

            });
            $(e.target).addClass('active');
        });
    });
    $('.up').click(function (e) {
        var page = +$('.page ul .active').html();
        if(page!=1){
            page = page-1;
            toggle('prev',page);
        }
    });
    $('.down').click(function (e) {
        var page = +$('.page ul .active').html();
        if(page<9){
            page = page+1;
            toggle('next',page);
        }
    });
    function toggle(method,page) {
        $('.comments').css({
            display:"none"
        });
        $('.comments').each(function (index,ele) {
            if(index>=(page-1)*10&&index<(page*10)){
                $(ele).css({
                    display:'block',
                })
            }

        });
        const current = $('.page ul .active');
        $('.page ul .num').removeClass('active');
        if(method==='prev'){
            $(current).prev().addClass('active');
        }else{
            $(current).next().addClass('active');
        }

    }
});
