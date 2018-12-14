$(function () {
    //头部效果
    let ishide=true;
    $(window).scroll( function() {
        if(scrollY===0){
            $('.header').css({
                transform:'rotateX(0deg)',
                transformOrigin:'50% 0'
            });
            ishide=true;
        }else if(scrollY>0){
            if(ishide){
                $('.header').css({
                    transform:'rotateX(-180deg)',
                    transformOrigin:'50% 0'
                });
                ishide=false;
                setTimeout(()=>{
                    $('.header').css({
                        transform:'rotateX(0deg)',
                        transformOrigin:'50% 0'
                    });
                },300)
            }

        }
    });
});