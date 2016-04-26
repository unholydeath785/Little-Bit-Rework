$('.menu-bar').click(function () {
  $('.slide-menu-overlay').slideDown(750);
  $('.slide-menu-plate').slideDown(800);
})
$('.slide-menu-close').click(function () {
  $('.slide-menu-plate').slideUp(750);
  $('.slide-menu-overlay').slideUp(800);
})
$('#link-6').mouseenter(function () {
  $('.dropdown-menu-container').slideDown(250);
})
$('#link-6').mouseleave(function () {
  $('.dropdown-menu-container').slideUp(250);
})
