$('.menu-bar').click(function () {
  $('.slide-menu-overlay').slideDown(750);
  $('.slide-menu-plate').slideDown(800);
  $(body).css({'z-index':'-5'});
})
$('.slide-menu-close').click(function () {
  $('.slide-menu-plate').slideUp(750);
  $('.slide-menu-overlay').slideUp(800);
  $(body).css({'z-index':'0'});
})
$('#link-6').mouseenter(function () {
  $('.dropdown-menu-container').slideDown(250);
})
$('#link-6').mouseleave(function () {
  $('.dropdown-menu-container').slideUp(250);
})

//carousel logic
$('#slide-1').show();
var slideCount = $('.slide').length;
var currentSlide = 1;
var currentSlideID = "#slide-"+currentSlide;
var carouselTimer = createNewTimer();

function nextSlide() {
  if (currentSlide != slideCount) {
    currentSlide++;
    var slideToDisplayID = '#slide-' + currentSlide;
    $('.carousel-dot').prop('class','carousel-dot');
    $('.carousel-controller').find(slideToDisplayID).prop('class','carousel-dot active');
  } else {
    currentSlide = 1;
    $('.carousel-dot').prop('class','carousel-dot');
    $('.carousel-controller').find('#slide-1').prop('class','carousel-dot active');
  }
}

function prevSlide() {
  if (currentSlide != 1) {
    currentSlide--;
    var slideToDisplayID = '#slide-' + currentSlide;
    $('.carousel-dot').prop('class','carousel-dot');
    $('.carousel-controller').find(slideToDisplayID).prop('class','carousel-dot active');
  } else {
    currentSlide = slideCount;
    $('.carousel-dot').prop('class','carousel-dot');
    $('.carousel-controller').find('#slide-'+slideCount).prop('class','carousel-dot active');
  }
}

function displaySlide() {
  var slideToDisplayID = '#slide-' + currentSlide;
  $(currentSlideID).fadeOut();
  $(slideToDisplayID).fadeIn();
  currentSlideID = slideToDisplayID
}

function createNewTimer() {
  carouselTimer = setInterval(function () {
    nextSlide();
    displaySlide();
  }, 5000);
}

function populateCarouselController() {
  for (var i = 0; i < slideCount; i++) {
    if (i == 0) {
      $('.carousel-controller').append('<span onclick="dotClick(this)" id="slide-'+(i+1)+'" class="carousel-dot active"></span>');
    } else {
      $('.carousel-controller').append('<span onclick="dotClick(this)" id="slide-'+(i+1)+'" class="carousel-dot"></span>');
    }
  }
}
populateCarouselController();

$('.carousel-dot').click(function () {
  var id = '#' + $(this).prop("id");
  if (id != currentSlideID) {
    $('.carousel-dot').prop('class','carousel-dot');
    $(this).prop('class','carousel-dot active');
    $(id).fadeIn();
    $(currentSlideID).fadeOut();
    currentSlideID = id;
  }
})

$('.carousel-next').click(function (e) {
  nextSlide();
  displaySlide();
});

$('.carousel-next').click(function (e) {
  prevSlide();
  displaySlide();
});


function dotClick(ele) {
  var id = '#' + $(this).prop("id");
  if (id != currentSlideID) {
    $('.carousel-dot').prop('class','carousel-dot');
    $(this).prop('class','carousel-dot active');
    $(id).fadeIn();
    $(currentSlideID).fadeOut();
    currentSlideID = id;
  }
}

//slider logic

var aboutSlideCount = 3;
var currentAboutSlide = 1;
var currentAboutSlideID = "#about-1";
var aboutTimer;
var divs = $('.about-slide');

function nextAboutSlide() {
  if (currentAboutSlide != aboutSlideCount) {
    currentAboutSlide++;
  } else {
    currentAboutSlide = 1;
  }
}

function prevAboutSlide() {
  if (currentAboutSlide != 1) {
    currentAboutSlide--;
  } else {
    currentAboutSlide = aboutSlideCount;
  }
}

function displayAboutSlide(dir) {
  console.log(dir);
  var aboutSlideToDisplayID = "#about-" + currentAboutSlide;
  if (dir == 'right') {
    customTransitionRight(aboutSlideToDisplayID,null)
  } else {
    customTransitionLeft(aboutSlideToDisplayID,null);
  }
  currentAboutSlideID = aboutSlideToDisplayID;
}

function customTransitionLeft(aboutSlideToDisplayID,event) {
  if (event != null) {
    event.preventDefault();
  }
  var id = aboutSlideToDisplayID;
  var slide = $(aboutSlideToDisplayID);
  var slideWidth = slide.width();
  var center = $(window).width() / 2 - slideWidth / 2;
  if (id != currentAboutSlideID) {
    if (currentAboutSlideID == '') {
      slide.animate({'left': center}, 1000);
    } else {
      $(currentAboutSlideID).animate({'left': '110%'}, 800);
      divs.css({'left':-(slideWidth + 100)});
      slide.animate({'left': center}, 1000);
    }
  }
}

function customTransitionRight(aboutSlideToDisplayID,event) {
  if (event != null) {
    event.preventDefault();
  }
  var id = aboutSlideToDisplayID;
  var slide = $(aboutSlideToDisplayID);
  var slideWidth = slide.width();
  var center = $(window).width() / 2 - slideWidth / 2;
  if (id != currentAboutSlideID) {
    if (currentAboutSlideID == '') {
      slide.animate({'left': -(center)}, 1000);
    } else {
      $(currentAboutSlideID).animate({'left': '-110%'}, 800);
      divs.css({'left':(slideWidth + 100)});
      slide.animate({'left': -(center)}, 1000);
    }
  }
}

function createNewAboutTimer() {
  aboutTimer = setInterval(function () {
    if ($(window).width() <= 900) {
      nextAboutSlide();
      displayAboutSlide('right');
    }
  }, 30000);
}

$('.about-next').click(function (e) {
  e.preventDefault();
  nextAboutSlide();
  displayAboutSlide('right',e);
});

$('.about-prev').click(function (e) {
  e.preventDefault();
  prevAboutSlide();
  displayAboutSlide('left',e);
})

var resized = false;
$(window).resize(function () {
  if ($(this).width() > 900) {
    resized = false;
    $('#about-1').show();
    $('#about-2').show();
    $('#about-3').show();
    clearInterval(aboutTimer);
  } else if (!resized) {
    resized = true;
    nextAboutSlide();
    displayAboutSlide('right');
    aboutTimer = createNewAboutTimer();
  }
})

$(document).ready(function () {
  $(window).load(function () {
    if ($(this).width() > 900) {
      resized = false;
      $('#about-1').show();
      $('#about-2').show();
      $('#about-3').show();
      clearInterval(aboutTimer);
    } else {

      resized = true;
      nextAboutSlide();
      displayAboutSlide('right');
      aboutTimer = createNewAboutTimer();
    }
  })

})

//info-circles spin logic
function AnimateRotate(d){
  $({deg: 0}).animate({deg: d}, {
    step: function(now, fx){
      $(".people-info").css({
        transform: "rotate(" + now + "deg)"
      });
      $(".diagnoses-info").css({
        transform: "rotate(" + now + "deg)"
      });
    }
  });
}

$(window).scroll(function () {
  $('.diagnoses-info').each(function (i) {
    var bottomOfObject = $(this).offset().top + $(this).outerHeight()+500;
    var bottomOfWindow = $(window).scrollTop() + $(window).height()-100;
    if (bottomOfWindow > bottomOfObject) {
      $(this).fadeIn(1000);
      AnimateRotate(720);
    }
  })
  $('.people-info').each(function (i) {
    var bottomOfObject = $(this).offset().top + $(this).outerHeight()+500;
    var bottomOfWindow = $(window).scrollTop() + $(window).height()-100;
    if (bottomOfWindow > bottomOfObject) {
      $(this).fadeIn(1000);
      AnimateRotate(1080);
    }
  })
})

//news logic
$('.story-info').mouseenter(function () {
  $(this).find('.story-info-p').slideDown(500)
  $(this).css({
    'transition':'margin-top 1s, height 1s',
    'height':'100%',
    'margin-top':'0'
  });
})

$('.story-info').mouseleave(function () {
  $(this).find('.story-info-p').slideUp(500)
  $(this).css({
    'transition':'margin-top 1s, height 1s',
    'height':'50px',
    'margin-top':'250px'
  });
})
