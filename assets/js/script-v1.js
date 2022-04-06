// function stop() {
//     console.log("stopped");
//     $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");
// }

var sonic = $("#sonic");
var gameStage = $("#bg-container2");
let stage_count = 0;

var jump_state = false;
var isFlipped = false;
var sonic_xPos = 0;
var sonic_yPos = 0;

// let jump_pad = $("#jump_pad1");
var ring = $("#ring");

var jumpPad_top;
var sonic_top;

// ring.position().left = 1000;

function moveLeft() {
    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();
    }

    sonic.finish().animate({
        left: "-=10"
    });
}

function moveUp() {
    sonic.finish().animate({
        // top: "-=10",
        bottom: "+=30"
    });
}

function moveRight() {
    if (sonic.position().left >= 1280) {
        change_Stage();
    }

    sonic.finish().animate({
        left: "+=10"
    });


    var sonic_offset = sonic.offset();
    var sonic_top = sonic_offset.top;
    var sonic_left = sonic_offset.left;

    var ring_offset = ring.offset();
    var ring_top = ring_offset.top;
    var ring_left = ring_offset.left;

    // if (sonic.position().left == 685.55) {
    //     console.log("grab2");
    //     // ring.hide();
    // }
    if (sonic.offset({ top: 363.3333435058594, left: 685.5556030273438 })) {
        console.log(3);
    }

}

function moveUp_Left() {
    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();
    }

    sonic.finish().animate({
        left: "-=20",
        bottom: "+=20"
    });
}

function moveUp_Right() {
    if (sonic.position().left >= 1280) {
        change_Stage();
    }

    sonic.finish().animate({
        left: "+=20",
        bottom: "+=20"
    });
}

function avoidMove_atLeftEdge() {
    sonic.animate({
        left: "0"
    });
}

function avoidMove_atTopEdge() {
    sonic.finish().animate({
        top: "300",
        bottom: "800"
    });
}

function avoidMove_belowGroundLevel() {
    sonic.finish().animate({
        top: "459.323 ",
        bottom: "190"
    });
}

function moveTo_InitialPosition() {
    sonic.animate({
        left: "0"
    });
}

function change_Stage() {
    switch (stage_count) {
        case 0:
            gameStage.css("margin-left", "-100%").css("transition", "all 1s ease");
            console.log(sonic.position().left);
            moveTo_InitialPosition();
            stage_count++;
            break;

        case 1:
            gameStage.css("margin-left", "-200%").css("transition", "all 1s ease");
            console.log(sonic.position().left);
            moveTo_InitialPosition();
            stage_count++;
            break;

        case 2:
            gameStage.css("margin-left", "-300%").css("transition", "all 1s ease");
            console.log(sonic.position().left);
            moveTo_InitialPosition();
            stage_count++;
            break;

        default:
            sonic.animate({
                left: "1280"
            });
            break;
    }
}

function roll_forward() {
    if (sonic.position().left >= 1280) {
        change_Stage();
    }

    sonic.finish().animate({
        left: "+=20"
    });
}

function roll_backward() {
    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();

    } else {
        sonic.finish().animate({
            left: "-=20"
        });
    }
}

function boost_Left() {
    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();

    } else {
        sonic.finish().animate({
            left: "-=50"
        });
    }
}

function boost_Right() {
    if (sonic.position().left >= 1280) {
        change_Stage();
    }

    sonic.finish().animate({
        left: "+=50"
    });


}

function jump_OnSpaceBar() {
    if (sonic.position().top >= -300) {
        console.log(sonic.position().top);
        avoidMove_atTopEdge();
    }

    sonic.finish().animate({
        bottom: "+=20"
        // top: "-=20"
    });
}

var controller = $(document).on({
    keydown: function (e) {
        switch (e.which) {

            case 37: // left

                if (!jump_state) {
                    sonic.addClass("flip-standing");
                    isFlipped = sonic.hasClass("flip-standing");
                    sonic.css("background-image", "url('../assets/images/sonic_walking.gif')");
                    moveLeft();

                } else { // up + left
                    sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                    moveUp_Left();
                }

                break;

            case 38: // up
                jump_state = true;
                sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                moveUp();

                // if (sonic.position().top <= 700) {
                // if (sonic.position().top >= -300) {
                //     console.log(sonic.position().top);
                //     avoidMove_atTopEdge();
                // }

                break;

            case 39: // right

                if (!jump_state) { // if not jumped at the moment (jump_state = false)
                    sonic.removeClass("flip-standing");
                    isFlipped = sonic.hasClass("flip-standing");
                    sonic.css("background-image", "url('../assets/images/sonic_walking.gif')");

                    moveRight();

                } else { // up + right
                    sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                    moveUp_Right();

                    // if (sonic.position().top >= -jump_pad.position().top) {
                    //     console.log(sonic.position().top);
                    //     sonic_yPos = sonic.position().top;
                    //     // jump_state = true;

                    //     // sonic.finish().animate({
                    //     //     top: "-212",
                    //     //     // bottom: "800"
                    //     // });
                    // }
                }

                break;

            case 40: // down

                sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");

                if (isFlipped) { // if turn back
                    roll_backward();

                } else {
                    roll_forward();
                }

                break;

            case 66: // B
                sonic.css("background-image", "url('../assets/images/sonic_running.gif')");
                if (isFlipped) { // if turn back
                    boost_Left();

                } else {
                    boost_Right();
                }
                break;

            case 32: // space bar --> to jump at same position
                sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                jump_OnSpaceBar();
                break;

            default:
                break;
        }
    },

    keyup: function (e) {

        if (e.which == 38 || e.which == 32 || e.which == 39 || e.which == 37) { // when up key is released prevent from going down from the ground level
            avoidMove_belowGroundLevel();
        }

        // if (e.which == 39 && sonic.position().top >= -jump_pad.position().top) {
        //     console.log(sonic.position().top);

        //     // sonic.finish().animate({
        //     //     // top: -jump_pad1.position().top
        //     //     top: "-212"
        //     // });
        // }

        sonic.css("background-image", "url('../assets/images/sonic_standing.gif')");
        jump_state = false;

    }
});

$(document).keydown(function (e) {
    if (e.which == 65) {
        console.log("A");
        $("#sonic").prependTo($("#jump_pad1"));
    }
});