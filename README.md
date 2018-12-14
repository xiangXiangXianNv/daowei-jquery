###day01
 1. art-template给模版的数据必须是对象中的一个属性,each循环的必须是对象中真实存在的一个属性(属性名必须对应)
 2. jquery中的$.each中循环的参数是(index,item)(顺序不要弄反了)
 3.each一定要写结束标志
 4.在模版中要动态的实现src属性的值可以直接写{{item.imgUrl}}
 5.设置swiper的分页器点击事件后( clickable:true)会出现自动轮播失效,解决办法:
 autoplay:{
    delay: 1000,
    //设置点击之后自动轮播还有效
    disableOnInteraction: false,
 },
 6.
    