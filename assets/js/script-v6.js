// hope to be the final 

let sonic = $("#sonic");

let rings = $(".ring");
let ring1 = $("#ring1");
let ring2 = $("#ring2");
let ring3 = $("#ring3");
let ring4 = $("#ring4");
let ring5 = $("#ring5");
let ring6 = $("#ring6");

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

var active_ring;

function fill_ringArray() {
    for (let i = 0; i < rings.length; i++) {
        ring_array[i] = $(rings[i]);
        console.log(ring_array[i]);
    }

    ring_array[2].removeClass("ring_top");
    ring_array[2].addClass("alt_ring_top");

    // getAllNonCollectedRings();
}
fill_ringArray();

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
        ring_array[i].css("display", "block").css("transition", "all 1s ease");
        alt_rings();
    }
}

function hideRings() {
    for (let i in ring_array) {
        ring_array[i].css("display", "none");
    }
}

function remove_altRing_class() {
    for (let i in ring_array) {
        ring_array[i].removeClass(".alt_ring");
    }
}

function alt_rings() {
    switch (stage_count) {
        case 0:
            console.log("stage count is 0 : " + stage_count);
            ring_array[2].removeClass("ring_top");
            ring_array[2].addClass("alt_ring_top");
            break;

        case 1:
            console.log("stage count is 1 : " + stage_count);
            ring_array[3].removeClass("ring_top");
            ring_array[3].addClass("alt_ring_top");
            break;

        case 2:
            console.log("stage count is 2 : " + stage_count);
            ring_array[4].removeClass("ring_top");
            ring_array[4].addClass("alt_ring_top");
            break;

        case 3:
            console.log("stage count is 3 : " + stage_count);
            ring_array[1].removeClass("ring_top");
            ring_array[1].addClass("alt_ring_top");
            break;

        default:
            break;
    }
}

// let non_collected_rings = [];

// function getAllNonCollectedRings() {
//     for (let i in ring_array) {
//         if ($(ring_array[i]).css("display") == "block") {
//             non_collected_rings[0] = ring_array[i];
//         }
//     }
//     console.log(non_collected_rings);
// }

function change_Stage() {
    switch (stage_count) {
        case 0:
            gameStage.css("margin-left", "-100%").css("transition", "all 1s ease");
            moveTo_InitialPosition();
            setTimeout(showRings, 800);
            stage_count++;
            break;

        case 1:
            gameStage.css("margin-left", "-200%").css("transition", "all 1s ease");
            moveTo_InitialPosition();
            setTimeout(showRings, 800);
            stage_count++;
            break;

        case 2:
            gameStage.css("margin-left", "-300%").css("transition", "all 1s ease");
            moveTo_InitialPosition();
            stage_count++;
            setTimeout(showRings(1), 800);
            break;

        default:
            sonic.animate({
                left: "1410"
            });
            // hideRings();
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


        L1: for (let i in ring_array) {
            active_ring = ring_array[i]

            // switch (i) {
            //     case 0:
            //         active_ring = ring_array[0];
            //         console.log(active_ring);
            //         break;

            //     case 1:
            //         active_ring = ring_array[1];
            //         console.log(active_ring);
            //         break;

            //     case 2:
            //         active_ring = ring_array[2];
            //         console.log(active_ring);
            //         break;

            //     case 3:
            //         active_ring = ring_array[3];
            //         console.log(active_ring);
            //         break;

            //     default:
            //         active_ring = ring_array[i];
            //         // active_ring = ring6;
            //         console.log(active_ring);
            //         break;
            // }

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

                // console.log("NO Collision Detected");
                // sonic.css("background-color", "blue");
                // active_ring.css("background-color", "red");

            } else {
                // console.log("Collision Detected");
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
