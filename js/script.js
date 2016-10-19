$(document).ready(function() {
  $('#fullpage').fullpage({
      anchors: ['start', 'about', 'skills', 'js', 'psd', 'contact'],
      verticalCentered: true,
      responsiveWidth: 1200,
      // height to content
      // scrollOverflow: false,
      // responsiveHeight: 1200,
      autoScrolling: false,
			fitToSection: false,
      scrollingSpeed: 1000,
      afterLoad: function(anchor, index){
        var $activeItem;
        $activeItem = $('nav').find('a[href="#' + anchor + '"]');
        $activeItem
            .addClass('active')
            .parent()
            .siblings()
            .children().removeClass('active');
    }
  });
  $('.arrow').on('click', function () {
    $.fn.fullpage.moveSectionDown();
  });
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
