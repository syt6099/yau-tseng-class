(function (window) {
    var mc = {};
    if (window.mc) {
        mc = window.mc
    }

    /**
     * @description 将列表等分排列
     * 
     * @param {Document} $obj - jQuery dom对象
     * @param {number} column - 列数
     * @param {number} space - 左右留白
     */
    mc.list = function ($obj, column, space) {
        $obj.children().css({
            float: "left",
            width: Math.floor(100 / column) + "%",
            paddingLeft: space,
            paddingRight: space
        })
        $obj.css({
            marginLeft: -space,
            marginRight: -space
        })
    }
    /**
     * @description 数字滚动 需引入appear.js 并在元素上加上data-num属性
     *
     * @param {Document} $obj - jQuery dom对象
     */
    mc.numRoll = function ($obj) {
        // 数字滚动
        $obj.appear(function () {
            var content = $(this).text();
            var counter = parseInt($(this).text().replace(/,/g, ""));
            $(this).countTo({
                from: 1,
                to: counter,
                speed: 1500,
                refreshInterval: 60,
                onComplete: function () {
                    $(this).text(content);
                }
            });
        });
    }
    // 手机端视频不自动播放
    mc.phVideo = function () {
        if ($(window).width() < 1200) {
            
            $("video").each(function () {
                $(this).get(0).pause();
            })
        }
    }
    /**
     * @description 轮播视频相关初始化
     *
     * @param {*} $obj - JQuery轮播对象
     */
    mc.vidioInit = function ($obj) {

        var video = $obj.find("video").get(0);
        if(video){
            // 播放结束切换到下一张
            video.onended = function () {
                $obj.slick("next")
            }
            // 切换后转为自动轮播
            $obj.on('afterChange', function (event, slick, currentSlide) {
                if (currentSlide == 0) {
                    $obj.slick('slickPause');
                } else {
                    $obj.slick('slickPlay');
                    video.currentTime = 0;
                    video.play();
                }
            });
        }else{
            $obj.slick('slickPlay');
        }
        
        if($(window).width()<1200){
            $obj.slick('slickPlay');
        }

    }
    //下拉选择
    mc.select = function ($obj) {
        $obj.find(".mc_select_head").click(function (e) {
            var target = $(this).siblings(".mc_select_body").get(0);
            $(".mc_select_body").not(target).stop().slideUp();
            $(this).siblings(".mc_select_body").stop().slideToggle();
            $(this).find(".mc_select_xtb").addClass("on");
            e.stopPropagation();
        })
        $obj.find(".mc_select_list li").click(function () {
            var selectShow = $(this).text();
            $(this).parents(".mc_select_body").siblings(".mc_select_head").find(".mc_select_show").text(selectShow);
            // $(this).parents(".mc_select_body").slideUp();
        })
        // 点击页面关闭
        $("body").click(function () {
            $(this).find(".mc_select_xtb").removeClass("on");
            $(".mc_select_body").stop().slideUp();
        })
    }

    // 瀑布流
    mc.warterfall = function ($obj) {

        // 瀑布流宽度
        var wfWidth = $obj.width();
        var item = $obj.find(".mc_wf_item");
        var itemWidth = item.width();
        //一行放几个
        var count = Math.floor(wfWidth / itemWidth);

        var heightArr = [];
        for (var i = 0; i < count; i++) {
            heightArr[i] = 0;
        }

        item.each(function () {

            var minAndIndexArr = minAndIndex(heightArr);
            var minHeihgt = minAndIndexArr[0];
            var index = minAndIndexArr[1];

            $(this).css("left", index * itemWidth);
            $(this).css("top", minHeihgt);

            heightArr[index] += $(this).height();

            var maxHeihgt = Math.max.apply(null, heightArr);
            $(".f1_waterfall").height(maxHeihgt);
        })

        // 获取数组的最小高度和它的索引
        function minAndIndex(arr) {
            var minHeihgt = Math.min.apply(null, arr);
            var index = arr.indexOf(minHeihgt);
            var minAndIndexArr = [minHeihgt, index];
            return minAndIndexArr;
        }
    }

    window.mc = mc;
}(window))


// slick常用方法
function slickInit() {
    // 轮播初始化
    $('.mc_banner_slick').slick({
        dots: true,
        arrows: true,
        autoPlay: true,
        // vertical: true,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // asNavFor: ".s3_subcontent ul,.s3_img_slide",
        // responsive: [{
        //     breakpoint: 1200,
        //     settings: {
        //         slidesToShow: 1
        //     }
        // }, ]
    });
    //上一张 下一张
    $('.mc_banner_slick').slick("prev");
    $('.mc_banner_slick').slick("next");
    // 到哪一张
    $(".mc_banner_slick").slick("slickGoTo", index)
    //翻页完成后执行
    $(".mc_banner_slick").on('afterChange', function (event, slick, currentSlide, nextSlide) {
        var index = currentSlide;
    });
    //开始停止自动播放
    $obj.slick('slickPause');
    $obj.slick('slickPlay');
}