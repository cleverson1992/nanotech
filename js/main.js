$(window).ready(function(){

// Nav Menu fixo
  $('#top').fadeOut(); //Remove botão aoTopo

  $(window).scroll(function(){
    var windowTop = $(this).scrollTop(),
        reference = $('.introducao').offset().top,
        navHeight = $('.navmenu').height();
        windownWidth = $(window).width();

    if(windowTop > reference && windownWidth > 920) {
      $('.navmenu').css({
         'transform': 'translateY(-60px)'
      });
    } else {
      $('.navmenu').css({
          'transform': 'translateY(0)'
        });
      }
    if(windowTop > reference + 50 && windownWidth > 920) {
      $('.navmenu').addClass('fixed');
      $('.headerLogo').css({
          'margin-bottom': navHeight
        });
      $('.navmenu').css({
        'transform': 'translateY(0)'
      });
    } else {
      $('.navmenu').removeClass('fixed');
      $('.headerLogo').css({
          'margin-bottom': 0
        });
      }

    //Remove botão aoTopo
    if(windowTop < reference){
      $('#top').fadeOut();
    } else {
      $('#top').fadeIn();
    }
  });

// Scroll Suave
  $('.navmenu a[href^="#"], #top a').click(function(e){
    e.preventDefault();

    var id = $(this).attr('href'),
        menuHeight = $('.menu').innerHeight(),
        targetOffset = $(id).offset().top - $('.navmenu').height();

    $('html, body').animate({
      scrollTop: targetOffset
    }, 600);

  });

//Slider function
  $('[data-slide] > :first').addClass('active');
  verifyActive();

  function verifyActive(){
    var activeClass = 'active';

    $('[data-image]').each(function(){
      var id = $(this).data('image');

      if($(this).hasClass(activeClass)){
        $('[data-button] > .active').removeClass('active');
        $('[data-click="'+id+'"]').addClass(activeClass);
      }
    });
  };

  $('[data-click]').click(function(){
    var idClick = $(this).data('click');
  //remover active
    $('[data-slide] > .active').removeClass('active');

  //adicionar activeClass
    $('[data-image="'+idClick+'"]').addClass('active');

    verifyActive();
  });

  rotate = setInterval(rotateSlide, 4000);
  function rotateSlide () {
    var activeSlide = $('[data-slide] > .active'),
        nextSlide = activeSlide.next();

        if(nextSlide.length == 0) {
          nextSlide = $('[data-slide] > :first');
        }
        activeSlide.removeClass('active');
        nextSlide.addClass('active');

        verifyActive();
  };

  //Pausar Slider no Hover
  $('[data-slide], [data-button]').hover(function(){
    clearInterval(rotate);
  }, function(){
    rotate = setInterval(rotateSlide, 4000);
  });



  //Mobile Menu
  $('.btn-mobile').click(function(){
    $(this).toggleClass('active');
    $('.list-menu').toggleClass('active');

    $('.navmenu a[href^="#"]').click(function(){
      $('.btn-mobile').click();
    });
  });

});
