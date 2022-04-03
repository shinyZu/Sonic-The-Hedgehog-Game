// hope to be the final 

let sonic = $("#sonic");

let rings = $(".ring");
let ring1 = $("#ring1");
let ring2 = $("#ring2");
let ring3 = $("#ring3");
let ring4 = $("#ring4");

var gameStage = $("#bg-container2");
let stage_count = 0;

let sonic_startPosX;
let sonic_startPosY;

let sonic_collider;
let ring_collider;

let sonic_width = sonic.outerWidth();
let sonic_height = sonic.outerHeight();

let ring_width = ring1.outerWidth();
let ring_height = ring1.outerHeight();

let ring_array = [];
let ring_widthInfo = [];
let ring_heightInfo = [];

function fill_ringArray() {
    for (let i = 0; i < rings.length; i++) {
        ring_array[i] = $(rings[i]);
        console.log(ring_array[i]);
    }
}

// function cal_ring_Width_Height() {
//     for (let i in ring_array) {
//         ring_widthInfo[i] = ring_array[i].outerWidth();
//         ring_heightInfo[i] = ring_array[i].outerHeight();
//     }

//     console.log(ring_widthInfo);
//     console.log(ring_heightInfo);
// }

fill_ringArray();
// cal_ring_Width_Height();

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
        top: "-=20",
        left: "-=20"
    });
}

function moveUp_Right() {
    sonic_startPosY = sonic[0].offsetTop;
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic[0].offsetLeft >= 1410) {
        change_Stage();
    }

    sonic.finish().animate({
        top: "-=10",
        left: "+=20"
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

function showRings() {
    for (let i in ring_array) {
        ring_array[i].css("display", "block");
    }
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
    showRings();
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

        if (!isFlipped) { // if moving to right
            x_pos = sonic[0].offsetLeft - sonic.scrollLeft() - 130; // 591 - 721;

        } else { // if moving to left
            x_pos = sonic[0].offsetLeft - sonic.scrollLeft() + 80;// 571 - 706
        }

        sonic_collision = {
            x: x_pos,
            y: sonic[0].offsetTop - sonic.scrollTop(),
            width: sonic_width,
            height: sonic_height
        };

        // ring_collision = {
        //     x: ring1[0].offsetLeft - ring1.scrollLeft(),
        //     y: ring1[0].offsetTop - ring1.scrollTop(),
        //     width: ring_width,
        //     height: ring_height
        // };


        var ring_collision;
        var active_ring;

        L1: for (let i in ring_array) {
            switch (i) {
                case 0:
                    active_ring = ring_array[0];
                    break;

                case 1:
                    active_ring = ring_array[1];
                    break;

                case 2:
                    active_ring = ring_array[2];
                    break;

                case 3:
                    active_ring = ring_array[3];
                    break;

                default:
                    active_ring = ring_array[i];
                    break;
            }

            ring_collision = {
                x: active_ring[0].offsetLeft - active_ring.scrollLeft(),
                y: active_ring[0].offsetTop - active_ring.scrollTop(),
                width: ring_width,
                height: ring_height
            };

            if (sonic_collision.x > ring_collision.x + ring_width ||
                sonic_collision.x + sonic_width < ring_collision.x ||
                sonic_collision.y > ring_collision.y + ring_collision.height ||
                sonic_collision.y + sonic_collision.height < ring_collision.y) {

                console.log("NO Collision Detected");
                // sonic.css("background-color", "blue");
                // active_ring.css("background-color", "red");

            } else {
                console.log("Collision Detected");
                active_ring.css("display", "none");
                // sonic.css("background-color", "black");
                // active_ring.css("background-color", "black");
            }
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
