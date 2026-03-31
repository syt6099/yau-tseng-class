$(function () {

    $(".hd_search").click(function () {
        var title = $("#pc_txt").val();
        if (/\S/.test(title)) {
            queryData.query(title);
        }
    })
    // 搜索新闻
    $("#pc_txt").keydown(function (e) {
        if (e.keyCode == 13) {
            var title = $(this).val();
            if (/\S/.test(title)) {
                queryData.query(title);
            }
        }
    })
    $("#ph_search").click(function () {
        var title = $("#ph_title").val();
        if (/\S/.test(title)) {
            queryData.query(title);
        }
    })

    // 3.13
    if($(".mc_b2_subtitle").text()==""){
        $(".mc_b2_subtitle").css("margin",0);
    }
    //IE兼容placeholder
    $('input, textarea').placeholder();
    // wow初始化
    new WOW().init();
    // pc导航菜单
    topNavDrop();
    // 手机导航下拉
    phMenu();
    //search hover效果
    // searchHover();
    //ph端
    if ($(window).width() < 1200) {
        //手机端视频不自动播放
        mc.phVideo()
        // 页脚轮播
        // ftSlick()
        //侧边下拉
        mc.select($(".mc_ph_select"))
        // 去掉视频
        $("#index_banner_video").remove();
    }

    // 9.3
    innerMain();
    window.onresize = function () {
        innerMain();
        phHead();
    }

    window.onload = function () {
        innerMain();
    }
    $(".mc_inbanner_bg img").load(function () {
        innerMain();
    })

    if ($(window).width() > 1200) {
        parMargin()
        window.onresize = function () {
            parMargin();
        }
    }
    footInit();
    phHead();
    window.onscroll = function () {
        footInit();
        navFixed();
        phHead();
    }
    navFixed();


    // 9.10
    $(".mc_xlbox_hd").click(function () {
        $(this).parents(".mc_xlbox").toggleClass("on");
        $(this).siblings(".mc_xlbox_bd").stop().slideToggle();
    });

    // 9.17
    $(".mc_ft_wx_modal").clone(true).addClass("mc_ft_modal_clone").appendTo($(".mc_main"));
    $(".mc_ft_wx").click(function () {
        $(".mc_ft_modal_clone").stop().fadeIn();
        $(".mc_menu_expand").css("left", -100 + "vw");
        $(".mc_menu_modal").fadeOut();
    })
    $(".mc_ft_wxmodal_close").click(function () {
        $(".mc_ft_modal_clone").stop().fadeOut();
    })

})

queryData = {
    url: '/Cn/Index/search',
    query: function (wd) {
        var base = new this.Base64();
        window.open(this.url + "/wd/" + base.encode(wd));
    },
    Base64: function Base64() {

        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        // public method for decoding
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }

        // private method for UTF-8 encoding
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }

        // private method for UTF-8 decoding
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }
}

// pc导航菜单
function topNavDrop() {
    $(".mc_lisfir").mouseenter(function () {
        $(this).find(".mc_hd_xlbox").stop().fadeIn();
    })
    $(".mc_lisfir").mouseleave(function () {
        $(this).find(".mc_hd_xlbox").stop().fadeOut();
    })
}

//search hover效果
function searchHover() {
    if ($(".mc_hd_pc").hasClass("navfixed")) {
        $(".hd_search").hover(
                function () {
                    $(".hd_logo").stop().animate({
                        marginLeft: -69,
                    }, 500)
                },
                function () {
                    $(".hd_logo").stop().animate({
                        marginLeft: 74,
                    }, 500)
                }
        )
    }
}

// 手机导航下拉
function phMenu() {

    // ph导航
    $(".mc_ph_menu").click(function () {
        $(".mc_menu_expand").css("left", 0);
        // $(".mc_menu_expand_ft").show();
        $(".mc_menu_modal").fadeIn();
    });
    $(".menu_expand_close,.mc_menu_modal").click(function () {
        $(".mc_menu_expand").css("left", -100 + "vw");
        // $(".mc_menu_expand_ft").hide();
        $(".mc_menu_modal").fadeOut();

    });
    $(".mc_ph_search").click(function () {
        $(".mc_search_expand").css("left", 0);
    });
    $(".menu_search_close").click(function () {
        $(".mc_search_expand").css("left", 100 + "vw");

    });
    // ph导航二级
    $(".xialaph  h4").click(function () {
        $(this).siblings(".ul2").slideToggle();
        $(this).parent().parent().siblings().find(".ul2").slideUp();
        $(this).toggleClass("active");
        $(this).parent().parent().siblings().find("h4,h5").removeClass('active');
    });
    /*ph导航三级*/
    $(".xialaph h5").click(function () {
        $(this).siblings(".ul3").slideToggle();
        $(this).parent().siblings().find(".ul3").slideUp();
        $(this).toggleClass("active");
        $(this).parent().siblings().find("h4,h5").removeClass('active');
    });


}

// 锚点
function yxtop() {
    var test = (window.location.href).split('tp/');
    if (!isNaN(test[1])) {
        $("html,body").animate({
            scrollTop: $('[yxdatop-pag="' + test[1] + '"]').offset().top - 90
        }, 700);
    }
}
;

//search hover效果
function searchHover() {
    $(".hd_search").hover(
            function () {
                if ($(".mc_hd_pc").hasClass("navfixed")) {
                    $(".hd_logo").stop().css({
                        marginLeft: -69,
                    })
                }
            },
            function () {
                if ($(".mc_hd_pc").hasClass("navfixed")) {
                    $(".hd_logo").stop().css({
                        marginLeft: 74,
                    })

                }
            }
    )
}

// 页脚轮播
function ftSlick() {
    $(".ft1_r_list").slick({
        autoplay: true,
    })
}


// 9.3
//partner间距
function parMargin() {
    $(".index_s4_list>li").css({
        marginLeft: ($(".index_s4_list").width() - 1020) / 5,
    })
    $(".index_s4_list>li").eq($(this).length - 1).css({
        marginLeft: 0,
    })
}

// bannerfootshow
function footInit() {
    if ($(window).scrollTop() < $(".mc_main").offset().top + 100) {

        $(".index_banner").css("opacity", 1);
        // if($(window).scrollTop() > $(".mc_main").offset().top){
        // 	if(window.count==0){
        // 		$('.mc_banner_slick').slick("next");
        // 		// $('.mc_banner_slick').slick("prev");
        // 		window.count++;
        // 	}
        // }
    } else {
        $(".index_banner").css("opacity", 0);
        ;
    }
    if ($(window).scrollTop() < 200) {
        $(".mc_ft").hide();
    } else {
        $(".mc_ft").show();
    }
}

function navFixed() {
    var mainTop;
    if ($(window).width() > 1680) {
        mainTop = $(".mc_main").offset().top - 157;
    } else if ($(window).width() > 1200) {
        mainTop = $(".mc_main").offset().top - 114;
    } else {
        mainTop = $(".mc_main").offset().top - 64;
    }
    if ($(window).scrollTop() > $(".mc_main").offset().top - 158) {

        $(".mc_hd_pc").addClass("navfixed");
    } else {
        $(".mc_hd_pc").removeClass("navfixed");
    }

    $(".index_explore").click(function () {
        $("html").stop().animate({
            scrollTop: mainTop
        }, 'slow');
    })
}

// 内页内容区响应式
function innerMain() {
    var mainH = $(".mc_banner").height() - 1
    var padmainH = mainH + 63;
    if ($(window).width() > 1200) {
        $(".inner_main").css("marginTop", mainH);
    } else if ($(window).width() > 767) {
        $(".inner_main").css("marginTop", mainH);
    }
}

function phHead() {
    if ($(window).scrollTop() > $(".mc_main").offset().top - 64) {
        $(".mc_ph_hd").addClass("on");
    } else {
        $(".mc_ph_hd").removeClass("on");
    }
}

// 12.20
$(function(){
    $(".yx_mc_xlbox_hd").click(function () {
        $(this).parents(".yx_mc_xlbox").toggleClass("on");
        $(this).siblings(".yx_mc_xlbox_bd").stop().slideToggle();
    });
})

// 202203
$(function(){
  	if($(".yx1_mes_slick").length>0){
    	$(".yx1_mes_slick").slick({
			arrow: true,
		});
    }
})

// 20240229
$(function(){
  	if($(".viewerimgph").length>0){
      if($(window).width()<768){
          $('.viewerimgph').viewer({
              navbar: false,
              title: false,
              toolbar: true,
              tooltip: false,
          });
      }
    }
    if($(".viewerimg").length>0){
      $('.viewerimg').viewer({
              navbar: false,
              title: false,
              toolbar: true,
              tooltip: false,
          });
    }
})