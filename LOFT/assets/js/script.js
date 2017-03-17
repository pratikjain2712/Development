/* Author: Pratik*/
$(document).ready(function() {
// to display the menu on click
  $('.cd-primary-nav-trigger').on('click', function(){
    $('.cd-menu-icon').toggleClass('is-clicked');
    $('.cd-header').toggleClass('menu-is-open');
    if( $('.cd-primary-nav').hasClass('is-visible') ) {
      $('.cd-primary-nav').removeClass('is-visible');
      // to hide the menu if open
    } else {
      // to show the menu if hidden
      $('.cd-primary-nav').addClass('is-visible');
    }
  });

  $('.smoothScroll').click(function() {//to smoothly scroll the window
    $('.cd-primary-nav-trigger').click();//to close the overlay menu
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: -125+target.offset().top//moving towards the top of the section
        },2000); // The number here represents the speed of the scroll in milliseconds
        return false;
      }
    }
  });

  // $(".box").find('iframe').attr('src', '');
  $('.light-box-triger').on('click',function(e){
    $('html').css('overflow','hidden');
    // e.stopPropogation();
    $('.iframe-trigger').on('click',function(event){
      event.stopImmediatePropagation();
      var url = $(this).data('url');
      $('.box').find('iframe').attr('src', url);
      console.log($('iframe').src);
    });
    // console.log($('iframe').src);
    $('.backdrop').fadeIn(300,'linear');
    $('.backdrop').on('click',closeBox);
    $('.lb-close').on('click',closeBox);
  });

  var currentPostion = 0,
  currentImage = 0,
  ul = document.getElementById('gallery'),
  slides,
  imageNumber,
  imageWidth,
  prev,
  next;

  $('.mainSlider-nav > .left').click(function() {
    onClickPrev(); //on click of left button go back one image from length
  });

  $('.mainSlider-nav > .right').click(function() {
    onClickNext();// on click of right button go forward one image
  });
  slider(); //slider function initialised


  function closeBox(){ //to close the lightbox
    $('.backdrop').fadeOut(300,'linear',function(){
      $(".box").find('iframe').attr('src', '');
    });
    $('html').css('overflowY','scroll');
  }
  //slider function
  function slider(){
    slides = ul.children;
    imageNumber = slides.length;
    imageWidth = slides[0].children[0].clientWidth;
    //set ul width to all image
    ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
  }
  //to animate the slider with different config
  function animate(opts){
    var start = new Date();
    var id = setInterval(function(){
      var timePassed = new Date - start;
      var progress = timePassed / opts.duration;
      if (progress > 1){ progress = 1; }
      var delta = opts.delta(progress);
      opts.step(delta);
      if (progress == 1){
        clearInterval(id);
        opts.callback();
      }
    }, opts.delay || 27);
  }
  //moving the image to dsplay
  function slideTo(imageToGo){
    var direction;
    var numOfImageToGo = Math.abs(imageToGo - currentImage);
    // slide toward left

    direction = currentImage > imageToGo ? 1 : -1;
    currentPostion = -1 * currentImage * imageWidth;
    var opts = {
      duration: 1000,
      delta: function(p){return p;},
      step: function(delta){
        // set width to current ul
        ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px';
      },
      callback:function(){currentImage = imageToGo;}
    };
    animate(opts);
  }
  //prev image function
  function onClickPrev(){
    if (currentImage == 0){ slideTo(imageNumber - 1); }
    else{ slideTo(currentImage - 1); }
  }
  //next image function
  function onClickNext(){
    if (currentImage == imageNumber - 1){
      slideTo(0);
    }
    else{
      slideTo(currentImage + 1);
    }
  }
});