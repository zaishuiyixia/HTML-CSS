var $imgList = $('.imgList'),
    $imgLists = $imgList.children(),
    $pre = $('.pre'),
    $next = $('.next'),
    $btnList = $('.btnList'),
    $btnLists = $('.btnList li'),
    imgWidth = $('.imgList li img').width();
    $container = $('.container');

var $firstImg = $imgList.find('li').first(),
    $lastImg = $imgList.find('li').last();

var curPage = 0,
    isAnimate = false,
    //在这里写图片个数为4
    $imgLen = $imgList.children().length;

$imgList.width(imgWidth*$imgLen)

function playNext(len){
    if(isAnimate) {
        return;
    }
    isAnimate = true;
    curPage++;
    if(curPage === $imgLen){
        $imgLists.eq(curPage).fadeOut(500);
        $imgLists.eq(0).fadeIn(500,function(){
            isAnimate = false;
            curPage = 0;
            setBtnList();
        })
    }else{
        $imgLists.eq(curPage-1).fadeOut(500);
        $imgLists.eq(curPage).fadeIn(500,function(){
            isAnimate = false;
            setBtnList();
        })
    }
}
    
function playPre(len){
    if(isAnimate) {
        return;
    }
    isAnimate = true;
    curPage--;
    if(curPage < 0){
        $imgLists.eq(curPage+1).fadeOut(500);
        $imgLists.eq(3).fadeIn(500,function(){
            isAnimate = false;
            curPage = 3;
            setBtnList();
        })
    }else{
        $imgLists.eq(curPage+1).fadeOut(500);
        $imgLists.eq(curPage).fadeIn(500,function(){
            isAnimate = false;
            setBtnList();
        })
    }
}

//上一页
$pre.on('click',function(e){
    e.preventDefault();
    playPre(1);
})
//下一页
$next.on('click',function(e){
    e.preventDefault();
    playNext(1);
})

//点击$btnLists图片跳转
function pageTurn(idx){
    $imgLists.eq(curPage).fadeOut(500);
    $imgLists.eq(idx).fadeIn(500,function(){
        $btnList.children()
            .removeClass('active')
            .eq(idx)
            .addClass('active')
        curPage = idx;
    });
}

$btnLists.on('click',function(e){
    var idx = $(e.target).index();
    console.log(idx)
    pageTurn(idx);
})

function setBtnList(){
    $btnList.children()
            .removeClass('active')
            .eq(curPage)
            .addClass('active')
}
//自动播放

var timer = '';

function autoPlay(){
     timer = setInterval(function(){
        playNext(1)
    },2000)
}

$container.on('mouseover',function(){
    console.log(1)
    clearInterval(timer);
})

$container.on('mouseout',function(){
    timer = setInterval(function(){
        playNext(1)
    },2000)
})

autoPlay()