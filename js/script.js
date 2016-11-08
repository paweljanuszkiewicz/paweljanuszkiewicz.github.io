$(document).ready(function() {
  respW = 1200;
  respH = 798;
  $('#fullpage').fullpage({
    anchors: ['start', 'about', 'skills', 'js', 'psd', 'contact'],
    verticalCentered: false,
    fitToSection: false,
    scrollingSpeed: 1000,
    responsiveWidth: respW,
    responsiveHeight: respH,
    afterResize: function () {
      $('.anim-fade, .anim-top').each(function () {
        if ( !($(this).hasClass('end')) )
            $(this).addClass('end');
      });
    },
    afterLoad: function(anchor, index) {
      if ($(window).width() > respW && $(window).height() > respH) {
        if (anchor == 'start') {
          setTimeout(function () {
            anim(anchor);
          }, 1200)
        }
        else if (anchor == 'about')
          anim(anchor, 500);
        else if (anchor == 'skills')
          anim(anchor, 200);
        else if (anchor == 'js' || anchor == 'psd')
          anim(anchor, 400);
        else
          anim(anchor);
        var $activeItem;
        $activeItem = $('nav').find('a[href="#' + anchor + '"]');
        $activeItem
          .addClass('active')
          .parent()
          .siblings()
          .children().removeClass('active');
      }
    }
  });
  //animation
  // -start
  function anim(section, delay) {
    var animationDelay = delay || 800;
    var $section = $('section[data-anchor="' + section + '"]');
    var $animTop = $section.find('.anim-top');
    if ($animTop.hasClass('end'))
      return;
    var $animFade = $section.find('.anim-fade');
    if (section == 'start')
      $animFade =  $animFade.add('aside.anim-fade');
    var wait = $animTop.length * animationDelay;
      $animTop.each(function (index) {
      $(this).css('transition-delay', animationDelay * index + 'ms').addClass('end');
    });
    setTimeout(function () {
      $animFade.each(function (index) {
        $(this).css('transition-delay', animationDelay * index + 'ms').addClass('end');
      });
    }, wait);
  }
  // arrow click
  $('.arrow').on('click', function () {
    $.fn.fullpage.moveSectionDown();
  });
  // menu on mobile (w/o fullpage)
  // $('nav a').on('click', function ( e ) {
  //   var to = $(this).attr('href');
  //   to = to.substring(1, to.length);
  //   e.preventDefault();
  //   $('html, body').animate({
  //     scrollTop: $('section[data-anchor="' + to + '"]').position().top
  //   }, 1000);
  // });

  // hamburger
  $('nav a').on('click', function () {
    $('.hamburger').menuHide();
    $(this).addClass('active');
  });

  $('.hamburger').on('click', function () {
    if ($(this).hasClass('active'))
      $(this).menuHide();
    else
      $(this).menuShow();
  });

  $.fn.menuShow = function () {
    var $nav = $(this).parent().parent('aside').find('nav');
    $nav.addClass('active');
    $nav.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      $nav.find('li').each(function (index) {
        $(this).css('transition-delay', index * 100 + 'ms');
        $(this).addClass('show');
      });
    });
    $(this).addClass('active');
  }
  $.fn.menuHide = function () {
    var $nav = $(this).parent().parent('aside').find('nav');
    $nav.removeClass('active');
    $(this).removeClass('active');
    $nav.find('li').css('transition-delay', 0 + 'ms').removeClass('show');
  }

  // clipboard
  var clipboard = new Clipboard('#copy');

  clipboard.on('success', function(e) {
      // console.info('Action:', e.action);
      // console.info('Text:', e.text);
      // console.info('Trigger:', e.trigger);
      $('.copied').addClass('show');
      setTimeout(function () {
        $('.copied').removeClass('show');
      }, 5000);

      e.clearSelection();
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });

});
