$(document).ready(function(){
  $(".back-to-top").hide();

  $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 800) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();

            }
        });


        // scroll body to 0px on click
        $('.back-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

  

});
