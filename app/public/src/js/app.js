$(document).ready(function() {

    $(".back-to-top").hide();


    TweenMax.set('.back-to-top span', {
        alpha: 0
    });

    TweenMax.set('#logo-container', {
        scale: 0.4,
        left:"-90px",
        top:"-82px"
    });

    TweenMax.to('.hero-overlay', 1, {
        ease: Power1.easeInOut,
        alpha: 0,
        delay: 0.5
    });

    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 800) {
                TweenMax.set('.back-to-top', {
                    left: "20px"
                });
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();

            }
        });


        // scroll body to 0px on click
        $('.back-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    //findShapeIndex("#slik-s", "#circle-svg");



    function logoMorph() {
      var tl = new TimelineMax();

      tl
        .to("#logo-container", 1.2, {rotation:360, transformOrigin: "50% 57%", ease: Sine.easeInOut}, ".5")
        .to("#pt01-container", 1.3, {x:27, y:25, rotation:90, transformOrigin: "50% 50%", ease: Expo.easeInOut}, ".5")
        .to("#pt02-container", .6, {x:-7, y:66, rotation:90, transformOrigin: "50% 50%", ease: Sine.easeInOut}, ".4")
        .to("#pt03-container", .6, {x:-25, y:11, rotation:90, transformOrigin: "50% 50%", ease: Sine.easeInOut}, ".3")
        .to("#pt04-container", .6, {x:5, y:-40, rotation:90, transformOrigin: "50% 50%", ease: Sine.easeInOut}, ".2")


        .to("#icon-pt01", .4, {transformOrigin: "50% 50%", morphSVG:{shape:"#loading-pt01", shapeIndex:"auto"}, ease: Sine.easeInOut}, ".7")
        .to("#icon-pt02", .6, {transformOrigin: "50% 50%", morphSVG:{shape:"#loading-pt02", shapeIndex:"auto"}, ease: Sine.easeInOut}, ".2")
        .to("#icon-pt03", .4, {transformOrigin: "50% 50%", morphSVG:{shape:"#loading-pt03", shapeIndex:"1"}, ease: Sine.easeInOut}, ".4")
        .to("#icon-pt04", .6, {transformOrigin: "50% 50%", morphSVG:{shape:"#loading-pt04", shapeIndex:"auto"}, ease: Sine.easeInOut}, ".2")

        .to("#logo-container", 1, {scale:.35, y:-10, transformOrigin: "50% 56%", ease: Sine.easeInOut}, ".5")
        .to('.back-to-top span', 0.5, { ease: Power1.easeInOut, x: 35, alpha: 1 });

        return tl;

    }

    $(".back-to-top").hover(over, out);

    function over(){
      //check if this item has an animation
      if(!this.animation){
        //if not, create one
        this.animation = logoMorph(this).timeScale(3);

      } else{
        //or else play it
       this.animation.play();
      }
    }

    function out(){
     this.animation.reverse();
    }

    loadSocial();

    /* Scrollmagic - body content transitions on scroll */

    var scrollController = new ScrollMagic.Controller(),
        heroTween, socialTween, clientsTween, contactTween, moreToComeTween,
        scene, scene2, scene3, scene4, scene5;

    heroTween = new TimelineMax();
    heroTween.from('.were-slik-1', 1, { ease:Power1.easeInOut, x:50, alpha:0, delay: 0.5 })
               .from('.were-slik-2', 0.9, { ease:Power1.easeInOut, x:-50, alpha:0 }, "-=1")
               .from('.hero-description span', 0.9, { ease:Power1.easeInOut,  alpha:0 }, "-=0.5")
               .from('.hero-description p', 0.9, { ease:Power1.easeInOut, alpha:0 }, "-=0.75")
               .from('#line1', 0.9, { ease:Power1.easeInOut, scaleY:0, alpha:0 }, "-=0.9")
               .from('#line2', 0.9, { ease:Power1.easeInOut, scaleY:0, alpha:0 }, "-=0.55")
    ;

    scene = new ScrollMagic.Scene({
      triggerElement: '#hero',
      offset: 50,
      reverse:false
    })
    .setTween(heroTween)
    .addTo(scrollController);


    socialTween = new TimelineMax();
    socialTween.staggerFrom('.social-feed li', 1, { ease:Power1.easeInOut, alpha:0 }, 0.07)

    ;

    scene2 = new ScrollMagic.Scene({
      triggerElement: '#slik-tricks',
      offset: 50,
      reverse:false
    })
    .setTween(socialTween)
    .addTo(scrollController);


    clientsTween = new TimelineMax();
    socialTween.staggerFrom('.companies-list li', 0.75, { ease:Power1.easeInOut, y: 50, alpha:0 }, 0.07)

    ;

    scene3 = new ScrollMagic.Scene({
      triggerElement: '#companies',
      offset: 150,
      reverse:false
    })
    .setTween(clientsTween)
    .addTo(scrollController);

    var parallaxSceneCli = new ScrollMagic.Scene({
			triggerElement: '#companies',
			duration: '200%',
			triggerHook: 1
		})
		.setTween('.cli', {
			y: "200%",
			ease: Power1.easeInOut
		})
		.addTo(scrollController);

    var parallaxSceneEnts = new ScrollMagic.Scene({
			triggerElement: '#companies',
			duration: '200%',
			triggerHook: 1.4
		})
		.setTween('.ents', {
			y: "-600",
			ease: Power1.easeInOut
		})
		.addTo(scrollController);

    var parallaxSceneCon = new ScrollMagic.Scene({
			triggerElement: '#get-in-touch',
			duration: '200%',
			triggerHook: 1
		})
		.setTween('.con', {
			y: "200%",
			ease: Power1.easeInOut
		})
		.addTo(scrollController);

    var parallaxSceneTact = new ScrollMagic.Scene({
			triggerElement: '#get-in-touch',
			duration: '200%',
			triggerHook: 1.4
		})
		.setTween('.tact', {
			y: "-600",
			ease: Power1.easeInOut
		})
		.addTo(scrollController);


    contactTween = new TimelineMax();
    socialTween.staggerFrom('#get-in-touch .contact', 1, {ease: Power1.easeInOut, y:30, alpha:0}, 0.1)
    .from('.office', 1, {ease: Power1.easeInOut, y:30, alpha:0})

    ;

    scene4 = new ScrollMagic.Scene({
      triggerElement: '#get-in-touch',
      offset: 250,
      reverse:false
    })
    .setTween(contactTween)
    .addTo(scrollController);


    moreToComeTween = new TimelineMax();
    socialTween.from('.coming', 1, {ease: Power1.easeInOut, x:-30, alpha:0})
    .from('.soon', 1, {ease: Power1.easeInOut, x:30, alpha:0})

    ;

    scene5 = new ScrollMagic.Scene({
      triggerElement: '#more-to-come',
      offset: 150,
      reverse:false
    })
    .setTween(moreToComeTween)
    .addTo(scrollController);

});

function loadSocial() {

    $.getJSON('/api/social', function(data) {

        console.log(data)

        var items = []
        var max = data.items.length;

        if(max > 6)
          max = 6;

        $.each(data.items, function(key, val) {
            var url = data.items[key].images.standard_resolution.url;
            var caption = data.items[key].caption.text;
            var linkUrl = data.items[key].link;
            var li = "<li><a href='"+linkUrl+"' target='_blank'><div class='feed-background'><img src='"+url+"' /></div><div class='feed-copy'><h4>Instagram</h4><p>'"+caption+"'</p></div></a></li>"
            items.push(li);

        });

        var html = ''

        for(var i = 0; i < max; i++){
          html += items[i];
        }

        $('.social-feed').html(html);

    })

}
