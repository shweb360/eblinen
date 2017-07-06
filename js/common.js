var common = function () {
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i) ? true : false;
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    any: function () {
      return (isMobile.Android() || isMobile.iOS());
    }
  }

  var dropdown = function () {
    if (!isMobile.any()) {
      $("#navbar .j_hover").dropdownHover({
        delay: 600
      }).dropdown();
      $("#navbar .j_hover").click(function () {
        var href = $(this).attr("href");
        window.location = href;
      })
    }
    var timer = null;
    $("#navbar .j_hover").mouseover(function () {
      if (timer != null) clearTimeout(timer);
      if ($(".mask").hasClass("hide")) $(".mask").removeClass("hide");
    })
    $("#navbar .j_hover").mouseout(function () {
      timer = setTimeout(function () {
        $(".mask").addClass("hide");
      }, 600)
    })
  };

  var banner = function () {
    $(".banner-list").bxSlider({
      auto: true,
      autoHover: true,
      pager: false,
      pause:5000
    });
    $("#banner-scroll").click(function () {
      var banner = $(this).parents(".banner");
      var calcHeight = banner.offset().top + banner.height();
      var calcTop = $(document).scrollTop();
      var calcRel = calcHeight - calcTop;
      if (calcRel > 0) {
        $('body,html').animate({
              scrollTop: calcHeight
            },
            500);
      }
    })
  }
  var timeline = function () {
    var lineYears = $(".timeline").bxSlider({
      auto: false,
      pager: false,
      minSlides: 1,
      maxSlides: 6,
      moveSlides:1,
      slideWidth: 200,
      infiniteLoop: false,
      controls: false
    });
    $(".timeline-slider").bxSlider({
      auto: false,
      pagerCustom: '.timeline',
      onSlideNext: function (a, b, c) {
        var count = lineYears.getSlideCount()-1;
        if(b===count) {
          lineYears.goToSlide(0)
          return;
        }else if(b>count-5){
          lineYears.goToSlide(count-5)
        }
        lineYears.goToSlide(b);
      },
      onSlidePrev: function (a, b, c) {
        var count = lineYears.getSlideCount();
        if(b===0) {
          lineYears.goToSlide(count-6)
          return;
        }
        lineYears.goToSlide(b-2);
      }
    });
  }

  var slider = function () {
    if (!isMobile.any()) {
      $(".partner-slider-list").bxSlider({
        pager: false,
        auto:true
      })
    } else {
      $(".partner-slider-list").bxSlider({
        controls: false,
        auto:true
      })
    }
  }

  var animate = function () {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $("#banner-scroll").mouseover(function () {
      $(this).addClass('animated fadeOutDown').one(animationEnd, function () {
        $(this).removeClass();
      });
    })
  }
  // 产品模态框
  var productModal = function () {
    $(".modal").on("shown.bs.modal", function (e) {
      $(".linen-show-slider").bxSlider({
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        nextSelector: '.linen-right',
        prevSelector: '.linen-left',
        nextText: '<i class="iconfont icon-arrows-copy"></i>',
        prevText: '<i class="iconfont icon-arrows-copy"></i>'
      });
    })
    $(".linen-sec-1>a.j_dropdown").click(function (e) {
      e.preventDefault();
      $(this).parent().addClass("hide").next().removeClass("hide").children("div").fadeIn();
    })
  }

  var scrollBar = function () {
    if ($(".proprietor").length > 0) {
      window.onload = function () {
        $(".proprietor").perfectScrollbar({});
      }
    }
  }


  var hoverItem = function () {
    var loadNum, detailSlider;
    //collapse开关
    $(".challenge-wrap .hover-item").click(function (e) {
      e.preventDefault();
      loadNum = $(this).parent().index();
      $(".challenge-row").addClass("hide");
      $('.challenge-wrap .collapse').collapse("show")
    })
    $(".challenge-wrap .collapse .close").click(function () {
      $(this).closest(".collapse").collapse("hide");
      $(".challenge-row").removeClass("hide");
    })
    //collapse展开后执行轮播;
    $('.challenge-wrap .collapse').on("shown.bs.collapse", function () {
      var modalOffset;
      modalOffset = $(".challenge-detail ").offset().top;
      $('body,html').animate({
            scrollTop: modalOffset
          },
          500);
      detailSlider = $(".detail-main").bxSlider({
        pagerType: "short",
        infiniteLoop: false,
        startSlide: loadNum,
        pagerSelector: ".cd-pager",
        nextSelector: '.cd-next',
        prevSelector: '.cd-prev',
        nextText: '<i class="iconfont icon-arrows-copy"></i>',
        prevText: '<i class="iconfont icon-arrows-copy"></i>'
      });
    })
    //collapse关闭后销毁轮播
    $('.challenge-wrap .collapse').on("hidden.bs.collapse", function () {
      detailSlider.destroySlider();
    });
    //tab选项卡
    function tabCard() {
      var index, currentPager;
      $(".j_tab").each(function(){
        $(this).children("li").eq(0).addClass("active");
      })
      $(".j_tab li a").click(function (e) {
        currentPager = $(".bx-pager").text().split("/")[0] - 1;
        e.preventDefault();
        $(this).tab("show");
        index = $(this).closest("li").index();
        $(".shadow-tab").eq(currentPager).children("li").eq(index).find("a").tab("show");
      })
    }

    tabCard();
  }
  return {
    init: function () {
      dropdown();
      banner();
      timeline();
      slider();
      productModal();
      scrollBar();
      hoverItem();
    }
  }
}();
