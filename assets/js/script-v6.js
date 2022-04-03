// hope to be the final 

let sonic = $("#sonic");
let ring = $("#ring");
var gameStage = $("#bg-container2");
let stage_count = 0;

let sonic_startPosX;
let sonic_startPosY;

let sonic_collider;
let ring_collider;

let sonic_width = sonic.outerWidth();
let sonic_height = sonic.outerHeight();

let ring_width = ring.outerWidth();
let ring_height = ring.outerHeight();

let css_left;
let css_top;

let jump_state = false;
let isFlipped = false;

function moveLeft() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic_startPosX <= 90) {
        avoidMove_atLeftEdge();
    }

    sonic.finish().animate({
        left: "-=10"
    });
}

function moveUp() {
    sonic_startPosY = sonic[0].offsetTop;

    if (sonic_startPosY <= 91) {
        console.log(sonic[0].offsetLeft);
        avoidMove_atTopEdge();
    }

    sonic.finish().animate({
        top: "-=30"
    });
}

function moveRight() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic_startPosX >= 1410) {
        change_Stage();
    }

    sonic.finish().animate({
        left: "+=10"
    });
}

function moveUp_Left() {
    sonic_startPosY = sonic[0].offsetTop;
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();
    }

    sonic.finish().animate({
        left: "-=20",
        bottom: "+=20"
    });
}

function moveUp_Right() {
    sonic_startPosY = sonic[0].offsetTop;
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic[0].offsetLeft >= 1410) {
        change_Stage();
    }

    sonic.finish().animate({
        left: "+=20",
        bottom: "+=20"
    });
}

function avoidMove_atLeftEdge() {
    sonic.animate({
        left: "6%"
    });
}

function avoidMove_atTopEdge() {
    sonic.finish().animate({
        top: "13%"
    });
}

function avoidMove_belowGroundLevel() {
    sonic.finish().animate({
        top: "72%"
    });
}

function moveTo_InitialPosition() {
    sonic.animate({
        left: "6%"
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
                left: "1410"
            });
            break;
    }
}

function roll_forward() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic[0].offsetLeft >= 1410) {
        change_Stage();
    }

    sonic.finish().animate({
        left: "+=20"
    });
}

function roll_backward() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();

    } else {
        sonic.finish().animate({
            left: "-=20"
        });
    }
}

function boost_Left() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();

    } else {
        // sonic.finish().animate({
        //     left: "-=50"
        // });
        sonic.css("left", sonic_startPosX - 30);
    }
}

function boost_Right() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic_startPosX >= 1410) {
        change_Stage();
    }

    // sonic.finish().animate({
    //     left: "+=50"
    // });
    sonic.css("left", sonic_startPosX + 30);


}

function jump_OnSpaceBar() {
    sonic_startPosY = sonic[0].offsetTop;

    if (sonic[0].offsetLeft >= 0) {
        console.log(sonic[0].offsetLeft);
        avoidMove_atTopEdge();
    }

    sonic.finish().animate({
        bottom: "+=20"
    });
}

var lastPosition = 0;

$(document).on({
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
                }

                break;

            case 40: // down
                sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
                sonic_startPosY = sonic[0].offsetTop;

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

        var x_pos;

        if (!isFlipped) {
            // console.log("moved to right");
            x_pos = sonic[0].offsetLeft - sonic.scrollLeft() - 130; // 591 - 721;

        } else {
            // console.log("moved to left");
            x_pos = sonic[0].offsetLeft - sonic.scrollLeft() + 80;// 571 - 706
        }

        sonic_collision = {
            x: x_pos,
            y: sonic[0].offsetTop - sonic.scrollTop(),
            width: sonic_width,
            height: sonic_height
        };

        ring_collision = {
            x: ring[0].offsetLeft - ring.scrollLeft(),
            y: ring[0].offsetTop - ring.scrollTop(),
            width: ring_width,
            height: ring_height
        };

        if (sonic_collision.x > ring_collision.x + ring_width ||
            sonic_collision.x + sonic_width < ring_collision.x ||
            sonic_collision.y > ring_collision.y + ring_collision.height ||
            sonic_collision.y + sonic_collision.height < ring_collision.y) {

            console.log("NO Collision Detected");
            // sonic.css("background-color", "blue");
            // ring.css("background-color", "red");

        } else {
            console.log("Collision Detected");
            ring.css("display", "none");
            // sonic.css("background-color", "black");
            // ring.css("background-color", "black");
        }
    },

    keyup: function (e) {

        if (e.which == 38 || e.which == 32 || e.which == 39 || e.which == 37) { // when up key is released prevent from going down from the ground level
            avoidMove_belowGroundLevel();
        }

        sonic.css("background-image", "url('../assets/images/sonic_standing.gif')");
        jump_state = false;

    }
});
