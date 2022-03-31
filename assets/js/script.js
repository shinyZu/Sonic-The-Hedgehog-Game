// function stop() {
//     console.log("stopped");
//     $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");
// }

var sonic = $("#sonic");
var gameStage = $("#bg-container2");
var jump_state = false;
var isFlipped = false;

$(document).on({
    keydown: function (e) {
        switch (e.which) {

            case 37: // left

                if (!jump_state) {
                    sonic.addClass("flip-standing");
                    isFlipped = sonic.hasClass("flip-standing");

                    sonic.css("background-image", "url('../assets/images/sonic_walking.gif')");

                    sonic.finish().animate({
                        left: "-=10"
                    });

                } else { // up + left
                    sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                    sonic.finish().animate({
                        left: "-=20",
                        bottom: "+=20"
                    });
                }

                if (sonic.position().left <= 0) {
                    sonic.animate({
                        left: "0"
                    });
                }

                break;

            case 38: // up
                jump_state = true;

                sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                sonic.finish().animate({
                    // top: "-=10"
                    bottom: "+=50"
                });

                // if (sonic.position().top > 0) {
                //     console.log(sonic.position());
                //     console.log(sonic.position().top);
                // }

                break;

            case 39: // right

                if (!jump_state) {

                    sonic.removeClass("flip-standing");
                    isFlipped = sonic.hasClass("flip-standing");

                    sonic.css("background-image", "url('../assets/images/sonic_walking.gif')");

                    sonic.finish().animate({
                        left: "+=10"
                    });

                    // if ($("#sonic").position().left == 1280) {
                    //     console.log("1280");
                    //     $("#sonic").css('left', '0px');
                    //     $("#bg-container2").css("margin-left", "-300%").css("transition", "all 1s ease");
                    // }

                    if (sonic.css("width") == "350%") {
                        console.log("400");
                    }

                    if (sonic.position().left >= 1280) {
                        gameStage.css("margin-left", "-100%").css("transition", "all 1s ease");
                        sonic.animate({ "left": "0" });
                        // $("#sonic").css('left', '0px');

                    } else {
                        // $(this).animate({"right": "-=100px"},"slow");
                        // $("#bg-container2").css("margin-left", "100%").css("transition", "all 1s ease");
                        // $("#sonic").animate({ "left": "0" });
                        // console.log("L");
                    }

                } else {
                    sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                    sonic.finish().animate({
                        left: "+=20",
                        bottom: "+=20"
                    });
                }

                break;

            case 40: // down

                sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");

                if (isFlipped) { // if turn back
                    sonic.finish().animate({
                        left: "-=20"
                    });

                } else {
                    sonic.finish().animate({
                        left: "+=20"
                    });
                }

                break;

            case 66: // B

                sonic.css("background-image", "url('../assets/images/sonic_running.gif')");

                if (isFlipped) { // if turn back
                    sonic.finish().animate({
                        left: "-=50"
                    });

                } else {
                    sonic.finish().animate({
                        left: "+=50"
                    });
                }
                break;

            case 32: // space bar --> to jump at same position
                sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                sonic.finish().animate({
                    bottom: "+=50"
                    // top: "-=20"
                });
                break;

            default:
                break;
        }
    },

    keyup: function (e) {

        if (e.which == 38) { // when up key is released prevent from going down from the ground level
            sonic.finish().animate({
                // top: "459.323 "
                bottom: "190"
                // bottom: "-=20"
            });
        }
        sonic.css("background-image", "url('../assets/images/sonic_standing.gif')");
        jump_state = false;

    }
});



