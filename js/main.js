$(document).ready(function () {
    var b = ("body")
    var list = (".list ul")
    var on = (".on")
    $('#fullpage').fullpage({
        //헤더 숨기기
        afterRender: function () {
            $('.gnb').hide();
        },
        anchors: ['page01', 'page02', 'page03'],
        menu: '.gnb',
        afterLoad: function (origin, destination, direction) {
            var loadedSection = this;
            //using index
            if ($(b).hasClass("fp-viewing-page01")) {
                console.log("true")
                $('.gnb').stop().animate({
                    "left": "-500px",
                }, 500)
                $('.songgauge').stop().animate({
                    opacity: "0",
                }, 300)
            }


            if ($(b).hasClass("fp-viewing-page02")) {
                $('.gnb').stop().animate({
                    "left": "0px"
                }, 500)
                $('.songgauge').stop().animate({
                    opacity: "1",
                }, 500)
            }
        }
    })

    $('.hots li').on('click', function () {
        $(this).addClass(on)
        $(this).siblings().removeClass(on)
    })


    // sound wave

    var waveCount = 100;
    var maxRange = 226;
    var minRange = 10

    for (i = 0; i < waveCount; i++) {
        $(".sound .wave").append("<i></i>")
    }

    setInterval(function () {
        $(".sound .wave i").each(function () {
            var i = $(this).index();
            var max = (function () {
                if (i <= waveCount / 5 * 1) {
                    return maxRange * 1.7;
                } else if (i <= waveCount / 5 * 2) {
                    return maxRange * 1.2;
                } else if (i > waveCount / 5 * 3) {
                    return maxRange * 1.2;
                } else if (i > waveCount / 5 * 4) {
                    return maxRange * 1.7;
                } else {
                    return maxRange * 0.7;
                }
            }());

            var gauge = Math.random() * (max - minRange) + minRange;
            $(this).stop().animate({
                "height": gauge
            }, 200, function () {
                gauge = Math.random() * (max - minRange) + minRange;
                $(this).stop().animate({
                    "height": gauge / 2
                }, 400)
            })
        })
    }, 600);

    //시간
    var runTime = 209000; //ms
    var playTime = 0;

    function converter(len, ele) {
        var min = len / 1000 / 60;
        min = parseInt(min);
        var sec = (len / 1000 / 60 - min) * 60;
        sec = Math.round(sec);

        if (min < 10) {
            min = "0" + min
        }

        if (sec < 10) {
            sec = "0" + sec
        }

        $(ele).text(`${min}:${sec}`)
    }

    function current() {
        var idx = playTime / runTime * 100;
            idx = Math.round(idx);
        $(".sound .wave i").eq(idx).addClass("summit");

        if (playTime == runTime) {
            clearInterval(play);
        } else {
            converter(playTime, ".sound .now")
            converter(playTime, ".songgauge .now")
        }
        playTime += 1000
    }

    var play = setInterval(current, 1000);
    current();
    converter(runTime, ".sound .end");
    converter(runTime, ".songgauge .end");
});