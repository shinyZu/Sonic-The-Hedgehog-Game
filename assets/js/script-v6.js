let sonic = $("#sonic");

let rings = $(".ring");
let ring1 = $("#ring1");

let score = $("#score");
let initial_score = 0;

let life = $("#life");
let initial_lifes = 3;

let jump_pad1 = $("#jump_pad1");
let barrier1 = $("#barrier1");
let barrier2 = $("#barrier2");

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

var active_ring;

// let jump_state = false;
let isFlipped = false;

let sonic_collision;
let ring_collision;
let jump_pad_collision;
let barrier1_collision;
var x_pos;

let barrier_boundingRect = barrier1[0].getBoundingClientRect();
let sonic_boundingRect = sonic[0].getBoundingClientRect();
let ring_boundingRect = ring1[0].getBoundingClientRect();
let active_ring_boundingRect = ring1[0].getBoundingClientRect();

let audio1 = new Audio();
audio1.src = "assets/audio/BridgeZone.mp3";
audio1.play();
audio1.loop = true;

let audio2 = new Audio();
audio2.src = "assets/audio/RingCollect.mp3";

let audio3 = new Audio();
audio3.src = "assets/audio/GameOver2.wav";

let audio4 = new Audio();
audio4.src = "assets/audio/GameOver.mp3";

let audio5 = new Audio();
audio5.src = "assets/audio/ActCleared.mp3";

(function () {
    hide_components();
    $("#btnSound").addClass("sound-on");
    barrier1.css("display", "none");
})();

function playBgTrack() {
    if ($("#btnSound").hasClass("sound-on")) {
        audio1.play();
    } else {
        audio1.pause();
    }
}

function fill_ringArray() {
    for (let i = 0; i < rings.length; i++) {
        ring_array[i] = $(rings[i]);
    }

    ring_array[2].removeClass("ring_top");
    ring_array[2].addClass("alt_ring_top");
}

fill_ringArray();

let restart_timerId;

function reduce_lifeCount() {
    initial_lifes = initial_lifes - 1;
    $(life).text("x " + initial_lifes);

    if (initial_lifes == 0) {
        game_over();
    } else {
        restart_timerId = setTimeout(restartGame, 2000);
    }
}

function game_over() {
    blurComponents();

    $("#gameOver-bg").css("display", "block");
    $("#gameOver_title-img").css("display", "block");

    audio1.pause();
    audio4.play();
    $("#btnSound").removeClass("sound-on");

    sonic.css("display", "none");
    return;
}

function restartGame() {
    clearTimeout(restart_timerId);
    sonic.css("display", "block");
    keys = {};
    audio1.currentTime = 0;
    playBgTrack();
    alt_rings();


    gameStage.css("margin-left", "0%").css("transition", "margin-left 0.5s");
    moveTo_InitialPosition();
    setTimeout(showRings, 800);


    check_ring_collision();
    playGame();


    stage_count = 0;
    // ring_array[1].css("left", "35%");
    initial_score = 0;
    $(score).text("0" + initial_score);
}

/* ----------------------------------------------------S Key, Space Bar & Arrow Keys-------------------------------------------------------------------------- */

function moveUp() {
    sonic_startPosY = sonic[0].offsetTop;

    if (keys["ArrowRight"]) {
        sonic.css("background-image", "url('assets/images/sonic_spinning.gif')");
        moveUp_Right();

    } else if (keys["ArrowLeft"]) {
        sonic.css("background-image", "url('assets/images/sonic_spinning.gif')");
        moveUp_Left();
    }

    if (sonic_startPosY <= 91) {
        avoidMove_atTopEdge();
    }

    sonic.finish().animate({
        top: "40%"
    });

    // sonic.css("top", sonic_startPosY - 10);
}

function moveRight() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (keys["ArrowUp"]) {
        sonic.css("background-image", "url('assets/images/sonic_spinning.gif')");
        moveUp_Right();
    }

    if (sonic_startPosX >= screen.availWidth) {
        change_Stage();
        moveTo_InitialPosition();
    }

    sonic.finish().animate({
        left: "+=10"
    });
}

function moveLeft() {
    sonic_startPosX = sonic[0].offsetLeft;

    if (keys["ArrowUp"]) {
        sonic.css("background-image", "url('assets/images/sonic_spinning.gif')");
        moveUp_Left();
    }

    if (sonic_startPosX <= 90) {
        avoidMove_atLeftEdge();
    }

    sonic.finish().animate({
        left: "-=10"
    });
}

function moveDown() {
    sonic_startPosY = sonic[0].offsetTop;

    if (isFlipped) { // if turn back
        roll_backward();

    } else {
        roll_forward();
    }
}

function moveUp_Left() {
    sonic_startPosY = sonic[0].offsetTop;
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic.position().left <= 0) {
        avoidMove_atLeftEdge();
    }

    if (sonic_startPosY <= 91) {
        avoidMove_atTopEdge();
    }

    sonic.finish().animate({
        // left: "-=20"
        left: "-=10"
    });
}

function moveUp_Right() {
    sonic_startPosY = sonic[0].offsetTop;
    sonic_startPosX = sonic[0].offsetLeft;

    if (sonic[0].offsetLeft >= screen.availWidth) {
        change_Stage();
    }

    if (sonic_startPosY <= 91) {
        avoidMove_atTopEdge();
    }

    sonic.finish().animate({
        // left: "+=20"
        left: "+=10"
    });
}

function roll_forward() {
    sonic_startPosX = sonic[0].offsetLeft;

    // if (sonic[0].offsetLeft >= 1410) {
    if (sonic[0].offsetLeft >= screen.availWidth) {
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

    // if (sonic_startPosX >= 1410) {
    if (sonic_startPosX >= screen.availWidth) {
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
        // if (sonic[0].offsetLeft <= 90) {
        avoidMove_atTopEdge();
    }

    sonic.finish().animate({
        bottom: "+=5"
        // top: "10%"
    });

    sonic_collision = {
        x: sonic[0].offsetLeft,
        y: sonic[0].offsetTop,
        width: sonic_width,
        height: sonic_height,
        left: sonic_boundingRect.left,
        right: sonic_boundingRect.right
    };

    for (let i in ring_array) {
        active_ring = ring_array[i]
        active_ring_boundingRect = active_ring[0].getBoundingClientRect();
        // sonic_boundingRect = sonic[0].getBoundingClientRect();

        ring_collision = {
            x: active_ring[0].offsetLeft,
            y: active_ring[0].offsetTop,
            width: ring_width,
            height: ring_height,
            right: active_ring_boundingRect.right + 90,
            left: active_ring_boundingRect.left
        };

        if (
            ring_collision.x > sonic_collision.left &&
            ring_collision.x + ring_collision.width < sonic_collision.x + sonic_collision.width &&
            ring_collision.y > sonic_collision.y &&
            ring_collision.y + ring_collision.height > sonic_collision.y + sonic_collision.height) {

            // sonic.css("background-color", "green");
            // active_ring.css("background-color", "green");

            if (sonic_startPosX >= screen.availWidth) {
                if (stage_count == 3) {
                    final_score = initial_score;
                    $(score).text(final_score);
                    return;
                }
            }

            initial_score = initial_score + 10;
            $(score).text(initial_score);

            active_ring.css("display", "none");
            audio2.play();
            audio2.currentTime = 0;

        } else {
            // console.log("NO Collision Detected");
            // sonic.css("background-color", "blue");
            // active_ring.css("background-color", "red");
        }
    }
}

/* ---------------------------------------------------------------------------------------------------------------------------------------- */

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
    sonic.css("background-image", "url('assets/images/sonic_standing.gif')");
    if (isFlipped) {
        sonic.removeClass("flip-standing");
    }
    sonic.animate({
        left: "6%",
        top: "72%"
    });
}

function change_Stage() {
    switch (stage_count) {
        case 0:
            gameStage.css("margin-left", "-100%").css("transition", "all 1s ease");
            barrier1.css("display", "block");
            moveTo_InitialPosition();
            setTimeout(showRings, 800);
            stage_count++;
            break;

        case 1:
            gameStage.css("margin-left", "-200%").css("transition", "all 1s ease");
            barrier1.css("display", "none");
            moveTo_InitialPosition();
            setTimeout(showRings, 800);
            // hideRings(2);
            stage_count++;
            break;

        case 2:
            gameStage.css("margin-left", "-300%").css("transition", "all 1s ease");
            barrier1.css("display", "none");
            moveTo_InitialPosition();
            stage_count++;
            setTimeout(showRings(1), 800);
            break;

        default:
            barrier1.css("display", "none");
            sonic.animate({
                left: "1410"
            });
            displayPlayerResults();
            break;
    }
}

function displayPlayerResults() {

    $(document).off("keydown");
    $(document).off("keyup");

    blurComponents();

    $("#gameWin-bg").css("display", "block");
    $("#gameWin_title-img").css("display", "block");

    audio1.pause();
    audio5.play();
    $("#btnSound").removeClass("sound-on");

    sonic.css("display", "none");
}

/* ---------------------------------------------------------------------------------------------------------------------------------------- */

function showRings() {
    for (let i in ring_array) {
        ring_array[i].css("display", "block").css("transition", "all 1s ease");
        alt_rings();
    }
}

function alt_rings() {
    switch (stage_count) {
        case 0:
            // console.log("stage count is 0 : " + stage_count);
            ring_array[2].removeClass("ring_top");
            ring_array[2].addClass("alt_ring_top");
            ring_array[1].css("left", "35%");
            break;

        case 1:
            // console.log("stage count is 1 : " + stage_count);
            ring_array[1].css("left", "30%");
            ring_array[2].css("display", "none");
            ring_array[3].css("left", "75%");
            ring_array[4].css("left", "90%");
            break;

        case 2:
            // console.log("stage count is 2 : " + stage_count);
            ring_array[4].removeClass("ring_top");
            ring_array[4].addClass("alt_ring_top");
            break;

        case 3:
            // console.log("stage count is 3 : " + stage_count);
            ring_array[1].removeClass("ring_top");
            ring_array[1].addClass("alt_ring_top");
            break;

        default:
            break;
    }
}

function check_ring_collision() {
    sonic_boundingRect = sonic[0].getBoundingClientRect();

    sonic_collision = {
        x: sonic[0].offsetLeft,
        y: sonic[0].offsetTop,
        width: sonic_width,
        // height: sonic_boundingRect.height,
        height: sonic_height,
        left: sonic_boundingRect.left,
        right: sonic_boundingRect.right
    };

    for (let i in ring_array) {
        active_ring = ring_array[i]
        active_ring_boundingRect = active_ring[0].getBoundingClientRect();

        ring_collision = {
            x: active_ring[0].offsetLeft,
            y: active_ring[0].offsetTop,
            width: ring_width,
            height: ring_height,
            right: active_ring_boundingRect.right + 90,
            left: active_ring_boundingRect.left
        };

        // if (sonic_collision.x < ring_collision.right &&
        //     sonic_collision.x + sonic_collision.width > ring_collision.right) {
        // sonic_collision.y < ring_collision.y + ring_collision.height &&
        // sonic_collision.y + sonic_collision.height > ring_collision.y) {

        if (sonic_collision.x < ring_collision.x + ring_collision.width &&
            sonic_collision.x + sonic_collision.width > ring_collision.x + ring_collision.width &&
            sonic_collision.y < ring_collision.y + ring_collision.height &&
            sonic_collision.y + sonic_collision.height > ring_collision.y) {

            // console.log("Collision Detected");
            // sonic.css("background-color", "black");
            // active_ring.css("background-color", "black");


            // if (ring_collision.x > sonic_collision.x &&
            //     ring_collision.x + ring_collision.width < sonic_collision.x + sonic_collision.width &&
            if (ring_collision.y > sonic_collision.y &&
                ring_collision.y + ring_collision.height < sonic_collision.y + sonic_collision.height) {

                // sonic.css("background-color", "green");
                // active_ring.css("background-color", "green");

                if (sonic_startPosX >= screen.availWidth) {
                    if (stage_count == 3) {
                        final_score = initial_score;
                        $(score).text(final_score);
                        return;
                    }
                }

                initial_score = initial_score + 10;
                $(score).text(initial_score);

                active_ring.css("display", "none");
                audio2.play();
                audio2.currentTime = 0;

            } else {
                // console.log("NO Collision Detected");
                // sonic.css("background-color", "blue");
                // active_ring.css("background-color", "red");

            }


            // if (sonic_startPosX >= screen.availWidth) {
            //     if (stage_count == 3) {
            //         final_score = initial_score;
            //         $(score).text(final_score);
            //         return;
            //     }
            // }

            // initial_score = initial_score + 10;
            // $(score).text(initial_score);

            // active_ring.css("display", "none");
            // audio2.play();
            // audio2.currentTime = 0;

        } else {

            // console.log("NO Collision Detected");
            // active_ring.css("display", "block");
            // sonic.css("background-color", "blue");
            // active_ring.css("background-color", "red");

        }
    }
}

function isWithinBarrierRange() {
    if (!isFlipped) { // if moving to right

        if ((sonic[0].offsetLeft + 1440) > barrier_boundingRect.left - 120 && (sonic[0].offsetLeft + 1440) < barrier_boundingRect.right - 40
            && sonic[0].offsetTop > 430) {

            return true;

        } else {
            return false;
        }

    } else { // if moving to left
        if ((sonic[0].offsetLeft + 1440) < barrier_boundingRect.right - 40 && (sonic[0].offsetLeft + 1440) > barrier_boundingRect.left - 120
            && sonic[0].offsetTop > 430) {

            return true;

        } else {
            return false;
        }
    }
}

function check_barrier_collision() {
    sonic_collision = {
        x: sonic[0].offsetLeft + 1440,
        y: sonic[0].offsetTop,
        width: sonic_boundingRect.width,
        height: sonic_boundingRect.height
    };

    barrier_collision = {
        x: barrier_boundingRect.left,
        y: 430,
        width: barrier_boundingRect.width,
        height: barrier_boundingRect.height,
        right: barrier_boundingRect.right - 40,
        left: barrier_boundingRect.left - 120
    }

    if (sonic_collision.x > barrier_collision.left &&
        sonic_collision.x < barrier_collision.right &&
        sonic_collision.y > barrier_collision.y) {

        //---- Collision Detected
        // sonic.css("background-color", "black");
        // barrier1.css("background-color", "black");

        sonic.css("background-image", "url('assets/images/sonic_standing.gif')");
        $(document).off("keydown");
        $(document).off("keyup");

        audio1.pause();
        audio3.play();

        sonic.addClass("animate_onBarrier");
        // restart_timerId = setTimeout(restartGame, 2000);
        reduce_lifeCount();

    } else {
        //---- Collision Not Detected
        // sonic.css("background-color", "blue");
        // barrier1.css("background-color", "red");
    }
}

// function check_jumpPad_collision() {
//     // var x_pos;
//     // if (!isFlipped) { // if moving to right
//     //     x_pos = sonic[0].offsetLeft - sonic.scrollLeft() - 130; // 591 - 721;

//     // } else { // if moving to left
//     //     x_pos = sonic[0].offsetLeft - sonic.scrollLeft() + 80;// 571 - 706
//     // }

//     // sonic_collision = {
//     //     x: x_pos,
//     //     y: sonic[0].offsetTop - sonic.scrollTop(),
//     //     width: sonic_width,
//     //     height: sonic_height
//     // };

//     jump_pad_collision = {
//         x: jump_pad1[0].offsetLeft - jump_pad1.scrollLeft(),
//         y: jump_pad1[0].offsetTop - jump_pad1.scrollTop(),
//         width: jump_pad1.outerWidth(),
//         height: jump_pad1.outerHeight()
//     }

//     if (sonic_collision.x > jump_pad_collision.x + jump_pad_collision.width ||
//         sonic_collision.x + sonic_width < jump_pad_collision.x ||
//         sonic_collision.y > jump_pad_collision.y + jump_pad_collision.height ||
//         sonic_collision.y + sonic_collision.height < jump_pad_collision.y) {

//         // console.log("NO Collision Detected");
//         // sonic.css("background-color", "blue");
//         // jump_pad1.css("background-color", "red");

//     } else {
//         // console.log("Collision Detected");
//         // jump_pad1.css("display", "none");
//         // sonic.css("background-color", "black");
//         // jump_pad1.css("background-color", "black");

//         // sonic.removeClass("sonic_top");
//         // sonic.addClass("sonic_alt_top");
//         // sonic.css("top", sonic_collision.x);
//     }
// }

/* ---------------------------------------------------------------------------------------------------------------------------- */

var timerId = setInterval(playGame, 100);
var keys = {};

function playGame() {
    clearInterval(timerId);

    $(document).on({
        keydown: function (e) {
            sonic_boundingRect = sonic[0].getBoundingClientRect();
            keys[e.key] = true;

            switch (e.which) {

                case 37: // left
                    sonic.removeClass("animate_onBarrier");
                    sonic.addClass("flip-standing");
                    isFlipped = sonic.hasClass("flip-standing");
                    sonic.css("background-image", "url('assets/images/sonic_walking.gif')");
                    moveLeft();
                    break;

                case 38: // up
                    sonic.css("background-image", "url('assets/images/sonic_spinning.gif')");
                    moveUp();
                    break;

                case 39: // right
                    sonic.removeClass("animate_onBarrier");
                    sonic.removeClass("flip-standing");
                    isFlipped = sonic.hasClass("flip-standing");
                    sonic.css("background-image", "url('assets/images/sonic_walking.gif')");
                    moveRight();

                    break;

                case 40: // down
                    sonic.css("background-image", "url('assets/images/sonic_spinning.gif')");
                    moveDown();
                    // sonic.css("top", sonic_startPosY + 10);
                    break;

                case 83: // A
                    sonic.css("background-image", "url('assets/images/sonic_running.gif')");
                    if (isFlipped) { // if turn back
                        boost_Left();
                    } else {
                        boost_Right();
                    }
                    break;

                case 32: // space bar --> to jump at same position
                    sonic.css("background-image", "url('assets/images/sonic_spinning.gif')");
                    jump_OnSpaceBar();
                    break;

                default:
                    break;
            }

            check_ring_collision();
            // check_jumpPad_collision();

            switch (stage_count) {
                case 1:
                    check_barrier_collision();
                    break;

                case 3:
                    check_barrier_collision();
                    break;

                default:
                    break;
            }
        },

        keyup: function (e) {

            if (e.which == 38 || e.which == 32 || e.which == 39 || e.which == 37) { // when up key is released prevent from going down from the ground level
                // if (e.which == 38 || e.which == 32) { // when up key is released prevent from going down from the ground level
                avoidMove_belowGroundLevel();
            }

            sonic.css("background-image", "url('assets/images/sonic_standing.gif')");
            delete keys[e.key];
        }
    });
}

/* ---------------------------------------------------------------------------------------------------------------------------- */

$("#btn_goToMenu").click(function (e) {
    window.location.href = "index.html";
});

$("#btnSound").click(function (e) {
    if (!audio1.paused) {
        audio1.pause();
        $("#btnSound").removeClass("sound-on");
    } else {
        audio1.play();
        $("#btnSound").addClass("sound-on");
    }
});

function blurComponents() {
    $("#bg-container1").addClass("bg-blur");
    $("#score-img").addClass("bg-blur");
    $("#life-img").addClass("bg-blur");
    sonic.addClass("bg-blur");
    rings.addClass("bg-blur");
}

function remove_blur() {
    $("body").removeClass("bg-blur");
    $("#bg-container1").removeClass("bg-blur");
    $("#score-img").removeClass("bg-blur");
    $("#life-img").removeClass("bg-blur");
    sonic.removeClass("bg-blur");
    rings.removeClass("bg-blur");
}

$("#btnPause").click(function (e) {
    $("body").css("pointer-events", "none");
    $("#btnPause").css("pointer-events", "auto");
    $("#btnResume").css("pointer-events", "auto");
    $("#btnRestart").css("pointer-events", "auto");
    $(document).off("keydown");
    $(document).off("keyup");

    $("#btnPause").addClass("pause");
    $("#btnResume").removeClass("pause");

    blurComponents();

    $("#pause-bg").css("display", "block");
    $("#title-img").css("display", "block");

    audio1.pause();
});

$("#btnResume").click(function (e) {
    $("body").css("pointer-events", "auto");
    $("#btnPause").removeClass("pause");
    $("#btnRestart").removeClass("pause");
    $("#btnResume").addClass("pause");

    remove_blur();
    hide_components();
    playBgTrack();
    playGame();

});

$("#btnRestart").click(function (e) {
    // $("body").css("pointer-events", "auto");
    // $("#btnPause").removeClass("pause");
    // $("#btnResume").removeClass("pause");
    // $("#btnRestart").addClass("pause");

    // remove_blur();
    // hide_components();

    // initial_lifes = 3;
    // life.text("x " + initial_lifes);

    location.reload();
    // restartGame();
    // sonic.css("display", "block");
});

function hide_components() {
    $("#pause-bg").css("display", "none");
    $("#title-img").css("display", "none");

    $("#gameOver-bg").css("display", "none");
    $("#gameOver_title-img").css("display", "none");

    $("#gameWin-bg").css("display", "none");
    $("#gameWin_title-img").css("display", "none");
}

$(function () {
    $("#game-controls").draggable({
        containment: "window"
    });
});


// $("#game-controls>div#move").css("display", "none");
$("#game-controls").hover(function () {
    // over
    $("#game-controls").css("cursor", "grab");
    // $("#game-controls>div#move").css("display", "block");
    // $("#game-controls").css("box-shadow", "10px 11px 19px -5px #7c7c7c");

}, function () {
    // out
    $("#game-controls").css("cursor", "pointer");
    // $("#game-controls>div#move").css("display", "none");
    // $("#game-controls").css("box-shadow", "none");
}
);

$(function () {
    $("#scoreBoard").draggable({
        containment: "window"
    });
});

// $("#scoreBoard>div#move_scoreBoard").css("display", "none");
$("#scoreBoard").hover(function () {
    // over
    $("#scoreBoard").css("cursor", "grab");
    // $("#scoreBoard>div#move_scoreBoard").css("display", "block");
    // $("#scoreBoard").css("box-shadow", "10px 11px 19px -5px #7c7c7c");


}, function () {
    // out
    $("#scoreBoard").css("cursor", "pointer");
    // $("#scoreBoard>div#move_scoreBoard").css("display", "none");
    // $("#scoreBoard").css("box-shadow", "none");
}
);

