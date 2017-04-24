jQuery(document).ready(function () {

    var d = getLoadingElement();
    document.body.appendChild(d);

    jQuery('.slide-crop > img').css('display', 'none');


    imagesLoaded(function () {
        
        
        var windowWidth = parseInt(jQuery(window).outerWidth(), 10);
        
        if(windowWidth > 700) {
            jQuery('.slide-crop > img.desktop-image').css('display', 'inline-block');
        }
        else {
            jQuery('.slide-crop > img.mobile-image').css('display', 'inline-block');
        }
        
        jQuery(d).remove();
        setCredits();

    });


    setSliderHeight();
    cropImages('.slick');
    initSlider();
    setCredits();

    jQuery('img').one('load', function () {
        jQuery('.slide-title').text(titles[getDefoultSlideNum()]);
        cropImages('.slick');
        setSliderHeight();
    });



    if (window.location.hash !== "") {
        //jQuery.fn.fullpage.silentMoveTo(window.location.hash);
        var hash = window.location.hash.replace("#", "").split("/");


        if (hash[0] == "profile") {
            jQuery('.projects').css('display', 'none');
            sendRequest(hash[0], function (html) {
                if (!jQuery('.site-profile').length) {
                    jQuery('#main').append(html);
                }

                jQuery('.site-profile').css('bottom', '0px');
                jQuery('.site-profile').css('display', 'block');
                animsitionIn('.site-profile');

            });
        } else if (hash[0] !== undefined && hash[1] !== undefined) {
            jQuery('.projects').css('display', 'block');

            animsitionOut('.site-profile');
        } else {
            jQuery('.projects').css('display', 'block');
            jQuery('.slide-title').text(titles[getDefoultSlideNum()]);
            setSliderHeight();

        }

    } else {
        jQuery('.projects').css('display', 'block');
        jQuery('.slide-title').text(titles[getDefoultSlideNum()]);
        setSliderHeight();
    }


    jQuery(window).bind('hashchange', function (e) {
        var hash = window.location.hash.replace("#", "").split("/");

        if (hash[0] == "profile" && hash[1] == undefined) {

            var d = getLoadingElement();
            document.body.appendChild(d);

            sendRequest(hash[0], function (html) {

                if (!jQuery('.site-profile').length) {
                    jQuery('#main').append(html);
                }
                jQuery('.site-profile').css('bottom', '-' + screen.height + 'px');
                jQuery('.site-profile').css('display', 'block');
                animsitionIn('.site-profile');
                jQuery(d).remove();
            });
        } else if (hash[0] == "projects") {
            jQuery('.projects').css('display', 'block');
            jQuery('.slide-title').text(titles[getDefoultSlideNum()]);
            setSliderHeight();
            animsitionOut('.site-profile');

            jQuery('.slider').slick('unslick');
            initSlider();

            jQuery('img').one('load', function () {
                jQuery('.slide-title').text(titles[getDefoultSlideNum()]);
                setSliderHeight();
            });
        }
    });
    jQuery(window).resize(function () {
        var hash = window.location.hash.replace("#", "").split("/");

        if (hash[0] !== "profile") {
            jQuery('.site-profile').css('bottom', '-' + screen.height + 'px');
        }

        jQuery('.slider').slick('unslick');
        initSlider();
        setSliderHeight();
        cropImages('.slick');
        setCredits();

    });

    jQuery(window).on("orientationchange", function () {
        var hash = window.location.hash.replace("#", "").split("/");

        if (hash[0] !== "profile") {
            jQuery('.site-profile').css('bottom', '-' + screen.height + 'px');
        }

        jQuery('.slider').slick('unslick');

        initSlider();
        setSliderHeight();
        cropImages('.slick');
        setCredits();
    });
});

function initSlider() {

    jQuery('.slider').slick({
        dots: false,
        speed: 700,
        infinite: true,
        mobileFirst: true,
        swipe: true,
        touchMove: true,
        initialSlide: getDefoultSlideNum()
    }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
        jQuery('.slide-title').text(titles[currentSlide]);
        window.location.hash = '#projects/' + links[currentSlide]
    });


}

function getDefoultSlideNum() {
    var num = 0;
    var hash = window.location.hash.replace("#", "").split("/");

    if (hash[0] == "projects" !== undefined && hash[1] !== undefined) {
        num = links.indexOf(hash[1]);
    }
    return num;
}


function sendRequest(url, callback) {
    jQuery.ajax({
        url: '/' + url,
        data: {
            //'action': 'ajax_request',
        },
        success: function (html) {
            var page = jQuery(html).find('#main').html();
            callback(page);
        }
    });
}
function animsitionIn(block) {
    jQuery(block).addClass('animation')
            .animate({bottom: '0px'}, 700);

}
function animsitionOut(block) {
    jQuery(block).addClass('animation')
            .animate({bottom: '-' + document.documentElement.clientHeight + 'px'}, 700);
}


function cropImages(block) {
    if (!block) {
        block = '.slick-current';
    }

    var margH = parseInt(jQuery(".slide-crop").outerHeight() - jQuery(".slide-crop > img").outerHeight(), 10);
    var margW = parseInt(jQuery(".slide-crop").outerWidth() - jQuery(".slide-crop > img").outerWidth(), 10);


    if (margW < 0) {
        jQuery(block + ' > .slide-crop > img').css({
            'margin-left': parseInt(margW / 2, 10) + 'px',
            'margin-top': '0px',
            'height': '100%',
            'width': 'auto',
            'min-width': '100%',
        });
    }
    if (margW >= 0) {
        jQuery(block + ' > .slide-crop > img').css({
            'margin': '0px',
            'width': '100%',
            'height': jQuery(".slide-crop > img").outerHeight()+"px !important",
        });
    }

    if (margH > 0) {
        jQuery(block + ' > .slide-crop > img').css({
            'margin-top': parseInt(margH / 2, 10) + 'px',
            'height': '100%',
            'width': 'auto',
            'min-width': '100%',
        });
    }



    if (document.documentElement.clientWidth >= 1700) {

        jQuery(block + ' > .slide-crop > img').css({
            'margin': parseInt(margH / 2, 10) + 'px auto 20% ' + parseInt(margW / 2, 10) + 'px',
            'height': 'auto',
            'min-height': '100%',
        });
    } else if (document.documentElement.clientHeight >= 600 && document.documentElement.clientWidth >= 1200) {
        var margH = parseInt(jQuery(".slide-crop").outerHeight() - jQuery(".slide-crop > img").outerHeight(), 10);
        var margW = parseInt(jQuery(".slide-crop").outerWidth() - jQuery(".slide-crop > img").outerWidth(), 10);


    }

}


function setSliderHeight() {
    var sHeight = document.documentElement.clientHeight;
    var sWidth = document.documentElement.clientWidth;
    var tHeight = jQuery(".site-titles").outerHeight();
    var fHeight = jQuery(".site-footer").outerHeight();


    if (sWidth > sHeight) {
        var sliderHeight = sHeight - (tHeight + fHeight + 55);

        if (sHeight <= 320) {
            sliderHeight = 240;
        } else if (sHeight <= 360) {
            sliderHeight = 260;
        } else if (sHeight <= 390) {
            sliderHeight = 300;
        }

        jQuery('.slide > .slide-crop').css({
            'height': '100%',
            'margin-bottom': '-' + fHeight + 'px',
            'max-height': sliderHeight + 'px'
        });

    } else {
        var sliderHeight = sHeight - (tHeight + fHeight + 70);

        if (sHeight <= 360) {
            sliderHeight = 200;
        } else if (sHeight <= 390) {
            sliderHeight = 300;
        }

        jQuery('.slide > .slide-crop').css({
            'height': '100%',
            'margin-bottom': '-' + fHeight + 'px',
            'max-height': sliderHeight + 'px',
        });
    }
}

function setCredits() {
    var sWidth = document.documentElement.clientWidth;
    jQuery('.slick-slide > .slide-crop > img').each(function (i, img) {

        if (jQuery(img).css('display') == 'inline' ) {
            var imgPosition = getElementPosition(jQuery(img));
            var slidePosition = getElementPosition(jQuery(img).parents('.slide-crop').parents('.slide'));
            var slideCropPosition = getElementPosition(jQuery(img).parents('.slide-crop'));
            var credits = getElementPosition(jQuery(img).parents('.slide-crop').parents('.slide').find('.credits'));

            var margW = parseInt(slidePosition.width, 10) - parseInt(imgPosition.width, 10);

            var tmp = 0;
            if (margW >= 0) {
                tmp = (((imgPosition.documentWidth - imgPosition.width) / 2) + (imgPosition.width));
            } else {
                tmp = (((slideCropPosition.documentWidth - slideCropPosition.width) / 2) + (slideCropPosition.width));
            }

            var ml = -173;


            jQuery(img).parents('.slide-crop').parents('.slide').find('.credits').css({
                'left': parseInt(tmp, 10) + 'px',
                'margin-left': parseInt(ml, 10) + credits.height + 'px'
            });
        }
    });
}
function getElementPosition(block) {
    var sWidth = parseInt(document.documentElement.clientWidth, 10);

    var w = parseInt(block.width(), 10);
    var h = parseInt(block.height(), 10);

    var l = 0;
    var r = 0;

    l += block.position(document).left;
    r += sWidth - ((sWidth - w) / 2);

    return {"left": l, "right": r, "width": w, "documentWidth": sWidth, "height": h};
}



function getLoadingElement() {
    var div = document.createElement('div');
    div.setAttribute('id', 'site-loader');
    div.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-50-50 100 100" height="100" width="100"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="#29358e"/><stop offset="0%" stop-color="#bce2c5"/><stop offset="100%" stop-color="#bce2c5"/></linearGradient></defs><circle transform="rotate(0)" cx="0" cy="0" r="50" fill="url(#g)"></circle></svg>';



    div.stop = function () {
        div.setAttribute('style', 'height:0px;');
    };

    div.start = function () {
        div.setAttribute('style', 'height:100px;');
    };

    var stops = div.querySelectorAll('stop');
    var grad = div.querySelector('#g');
    var circ = div.querySelector('circle');
    var colors = [stops[0].getAttribute('stop-color'), stops[1].getAttribute('stop-color')];

    function step(t) {
        var oldStop = parseInt(stops[0].getAttribute('offset'));
        var newStop = (Math.floor(t) % 500) / 5;
        var rotation;
        if (oldStop > newStop) {
            rotation = parseInt(circ.getAttribute('transform').replace(/[^\d]/g, '')) || 0;
            rotation = (rotation + 90) % 360;
            circ.setAttribute('transform', 'rotate(' + rotation + ')');
            colors.reverse();
            stops[0].setAttribute('stop-color', colors[0]);
            stops[1].setAttribute('stop-color', colors[1]);
            stops[2].setAttribute('stop-color', colors[1]);
        }
        stops[0].setAttribute('offset', newStop + '%');
        stops[1].setAttribute('offset', newStop + '%');
        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);

    div.start();
    return div;
}

jQuery('.credits').css('display', 'none');
imagesLoaded(function () {
    jQuery('#site-loader').remove();
    
    var windowWidth = parseInt(jQuery(window).outerWidth(), 10);

    if(windowWidth > 700) {
        jQuery('.slide-crop > img.desktop-image').css('display', 'inline-block');
    }
    else {
        jQuery('.slide-crop > img.mobile-image').css('display', 'inline-block');
    }

    setTimeout(function() {
        setCredits();
        jQuery('.credits').css('display', 'block');
    }, 50);
});



function imagesLoaded(callback) {
    var urls = [];
    var windowWidth = parseInt(jQuery(window).outerWidth(), 10);
    var imgSelector = '.slide-crop > img';
    
    if(windowWidth > 700) {
        imgSelector = '.slide-crop > img.desktop-image';
    }
    else {
        imgSelector = '.slide-crop > img.mobile-image';
    }


    jQuery(imgSelector).each(function (i, img) {
        urls.push(jQuery(img).attr('src'));
    });
    var imgs = [];
    var cnt = 0;
    for (var i = 0; i < urls.length; i++) {
        var img = new Image();
        img.onload = function () {
            ++cnt;
            if (cnt >= urls.length) {
                callback();
            }
        };
        img.src = urls[i];
        imgs.push(img);
    }
}
