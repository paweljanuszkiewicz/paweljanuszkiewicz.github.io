$(document).ready(function() {
  $('#fullpage').fullpage({
      anchors: ['start', 'about', 'skills', 'js', 'psd', 'contact'],
      verticalCentered: true,
      responsiveWidth: 800,
			fitToSection: false,
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
});
