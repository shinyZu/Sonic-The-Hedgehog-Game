// $(document).keydown(function (e) {
//     console.log(e);
//     if (e.key === "ArrowRight") {
//         e.originalEvent.repeat = true;
//         console.log(e.originalEvent.repeat);
//         $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");
//         setTimeout(stop, 300);


//         // $("#sonic").addClass("flip-standing");
//         // setTimeout(removeClass, 500);
//         // $("#sonic").animate({
//         //     left: "+=980"
//         // });

//     } else if (e.key === "ArrowDown") {
//         $("#sonic").css("background-image", "url('../assets/images/sonic_spinning.gif')");
//         setTimeout(stop, 200);

//     } else if (e.key === "ArrowLeft") {
//         $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");
//         setTimeout(stop, 200);

//     } else if (e.key === "ArrowUp") {
//         $("#sonic").css("background-image", "url('../assets/images/sonic_running.gif')");
//         setTimeout(stop, 200);

//     } else if (e.key === " ") {
//         $("#sonic").css("background-image", "url('../assets/images/sonic_spinning.gif')");
//         setTimeout(stop, 200);
//     }

// });

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/

// var timer = false;
// var pressedTime = 1000; //one second

// $(document).on({

//     keydown: function (e) {
//         var charCode = (e.which) ? e.which : e.keyCode, keyP;
//         if (charCode === 37) keyP = 'left';
//         if (charCode === 38) keyP = 'up';
//         if (charCode === 39) keyP = 'right';
//         if (charCode === 40) keyP = 'down';

//         if (!timer) {
//             timer = setTimeout(function () {
//                 clearTimeout(timer);
//                 timer = false;
//                 alert(keyP + ' arrow key held down for 1 second');
//                 // $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");
//             }, pressedTime);
//         }
//     },

//     keyup: function () {
//         clearTimeout(timer);
//         timer = false;
//     }
// });

// var pressed = null;
// $(document).on('keydown', function (event) {
//     pressed = +new Date();
//     console.log(pressed);
//     // do whatever else you need upon key down
//     $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");
// });

// $(document).on('keyup', function (event) {
//     console.log(+new Date());
//     var duration = +new Date() - pressed;
//     console.log(duration);
//     pressed = null;
//     // do whatever you need to do based on the duration of the press
// });

// $(document).keyup(function (e) {
//     if (e.key === "ArrowRight") {
//         $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");
//     }
// });


/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/

// function Component(element, width, height, x, y, img_src) {
//     this.element = element;
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.img_src = img_src;
// }

// function Character(element, width, height, x, y, img_src) {
//     Component.apply(this, arguments);
// }

// Character.prototype = Object.create(Component.prototype);
// Character.prototype.constructor = Character;

// Character.prototype.x_speed = 0;
// Character.prototype.y_speed = 0;
// Character.prototype.jump_state = true;
// // Character.prototype.new_class = "";

// var c = new Component();

// var element = $("#sonic");
// var sonic = new Character(element, 238, 250, 0, 0, "../assets/images/sonic_standing.gif");

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/

// var sonic = {
//     element: $("#sonic"),
//     jumping: true,
//     x_speed: 0.5,
//     y_speed: 0.5,
//     x_friction: 0.9,
//     y_friction: 0.9
// }


/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/


// if (sonic.hasClass("flip-standing")) { // if turn back
//     sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
//     sonic.finish().animate({
//         left: "-=20"
//         // bottom: "+=10"

//     });

// } else {
//     sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
//     sonic.finish().animate({
//         left: "+=20"
//     });
// }


/* --------------------------------------------------------Checking Barrier Collision-----------------------------------------------------------------------------------------*/


// var barrier1_boundingRect = barrier1[0].getBoundingClientRect();
// var barrier2_boundingRect = barrier2[0].getBoundingClientRect();

// function isWithinBarrierRange() {
//     if (!isFlipped) { // if moving to right

//         if ((sonic[0].offsetLeft + 1440) > barrier1_boundingRect.left - 120 && (sonic[0].offsetLeft + 1440) < barrier1_boundingRect.right - 40
//             && sonic[0].offsetTop > 430) {

//             // console.log("inside1");
//             // console.log("offsetLeft : " + (sonic[0].offsetLeft + 1440));
//             // console.log("offsetTop : " + (sonic[0].offsetTop));
//             // console.log("left : " + (barrier1_boundingRect.left - 130));
//             // console.log("right : " + (barrier1_boundingRect.right - 40));

//             // sonic.css("background-color", "black");
//             // barrier1.css("background-color", "black");
//             // barrier2.css("background-color", "black");

//             audio1.pause();
//             audio3.play();

//             sonic.addClass("animate_onBarrier");
//             setTimeout(restartGame, 2000);

//             return true;
//         } else {

//             // console.log("outside1");
//             // console.log("offsetLeft : " + (sonic[0].offsetLeft + 1440));
//             // console.log("offsetTop : " + (sonic[0].offsetTop));
//             // console.log("left : " + (barrier1_boundingRect.left - 130));
//             // console.log("right : " + (barrier1_boundingRect.right - 40));

//             // sonic.css("background-color", "blue");
//             // barrier1.css("background-color", "red");
//             // barrier2.css("background-color", "red");

//             return false;
//         }

//     } else { // if moving to left
//         if ((sonic[0].offsetLeft + 1440) < barrier1_boundingRect.right - 40 && (sonic[0].offsetLeft + 1440) > barrier1_boundingRect.left - 130
//             && sonic[0].offsetTop > 430) {

//             // console.log("inside2");
//             // console.log("offsetLeft : " + (sonic[0].offsetLeft + 1440));
//             // console.log("right : " + (barrier1_boundingRect.right - 40));
//             // console.log("left : " + (barrier1_boundingRect.left - 130));

//             // sonic.css("background-color", "black");
//             // barrier1.css("background-color", "black");
//             // barrier2.css("background-color", "black");

//             audio1.pause();
//             audio3.play();

//             sonic.addClass("animate_onBarrier");
//             setTimeout(restartGame, 2000);


//             return true;
//         } else {

//             // console.log("outside2");
//             // console.log("offsetLeft : " + (sonic[0].offsetLeft + 1440));
//             // console.log("right : " + (barrier1_boundingRect.right - 40));
//             // console.log("left : " + (barrier1_boundingRect.left - 130));

//             // sonic.css("background-color", "blue");
//             // barrier1.css("background-color", "red");
//             // barrier2.css("background-color", "red");

//             return false;

//         }
//     }
// }

// function check_barrier_collision(barrier, event) {
//     // if (!isFlipped) { // if moving to right
//     //     x_pos = sonic[0].offsetLeft - sonic.scrollLeft() - 130; // 551 - 421

//     // } else { // if moving to left
//     //     x_pos = sonic[0].offsetLeft - sonic.scrollLeft() - (70 + 50) / 2;// 1021 - 951
//     // }

//     // sonic_collision = {
//     //     x: x_pos,
//     //     y: sonic[0].offsetTop - sonic.scrollTop() - 170, // 459 - 289
//     //     width: sonic_width,
//     //     height: sonic_height
//     // };

//     isWithinBarrierRange();

//     // switch (barrier) {
//     //     case barrier1:

//     //         barrier1_collision = {
//     //             x: barrier1[0].offsetLeft - barrier1.scrollLeft(),
//     //             y: barrier1[0].offsetTop - barrier1.scrollTop(),
//     //             width: barrier1.outerWidth(),
//     //             height: barrier1.outerHeight()
//     //         }

//     //         if (sonic_collision.x > barrier1_collision.x + barrier1_collision.width ||
//     //             sonic_collision.x + sonic_width < barrier1_collision.x ||
//     //             sonic_collision.y > barrier1_collision.y + barrier1_collision.height ||
//     //             sonic_collision.y + sonic_collision.height < barrier1_collision.y) {

//     //             // console.log("NO Collision Detected");
//     //             sonic.css("background-color", "blue");
//     //             barrier1.css("background-color", "red");

//     //         } else {
//     //             // console.log("Collision Detected");
//     //             // barrier1.css("display", "none");
//     //             sonic.css("background-color", "black");
//     //             barrier1.css("background-color", "black");

//     //             // audio1.pause();
//     //             // audio3.play();

//     //             // sonic.addClass("animate_onBarrier");
//     //             // setTimeout(restartGame, 2000);
//     //         }
//     //         break;

//     //     case barrier2:
//     //         barrier2_collision = {
//     //             x: barrier2[0].offsetLeft - barrier2.scrollLeft(),
//     //             y: barrier2[0].offsetTop - barrier2.scrollTop(),
//     //             width: barrier2.outerWidth(),
//     //             height: barrier2.outerHeight()
//     //         }

//     //         if (sonic_collision.x > barrier2_collision.x + barrier2_collision.width ||
//     //             sonic_collision.x + sonic_width < barrier2_collision.x ||
//     //             sonic_collision.y > barrier2_collision.y + barrier2_collision.height ||
//     //             sonic_collision.y + sonic_collision.height < barrier2_collision.y) {

//     //             // console.log("NO Collision Detected");
//     //             // sonic.css("background-color", "blue");
//     //             // barrier2.css("background-color", "red");

//     //         } else {
//     //             // console.log("Collision Detected");
//     //             // barrier1.css("display", "none");
//     //             // sonic.css("background-color", "black");
//     //             // barrier2.css("background-color", "black");

//     //             audio1.pause();
//     //             audio3.play();

//     //             sonic.addClass("animate_onBarrier");
//     //             setTimeout(restartGame, 2000);
//     //         }
//     //         break;

//     //     default:
//     //         console.log("default barriers");
//     //         break;
//     // }

// }

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/

///////////////////////////////1st Attempt of checking Ring Collision/////////////////////////////////////

// function check_ring_collision() {
//     var x_pos;
//     if (!isFlipped) { // if moving to right
//         x_pos = sonic[0].offsetLeft - sonic.scrollLeft() - 130; // 591 - 721;

//     } else { // if moving to left
//         x_pos = sonic[0].offsetLeft - sonic.scrollLeft() + 80;// 571 - 706
//     }

//     sonic_collision = {
//         x: x_pos,
//         // y: sonic[0].offsetTop - sonic.scrollTop(),
//         y: sonic[0].offsetTop,
//         width: sonic_width,
//         height: sonic_height
//     };

//     for (let i in ring_array) {
//         active_ring = ring_array[i]

//         ring_collision = {
//             x: active_ring[0].offsetLeft - active_ring.scrollLeft(),
//             y: active_ring[0].offsetTop - active_ring.scrollTop(),
//             width: ring_width,
//             height: ring_height
//         };

//         if (sonic_collision.x > ring_collision.x + ring_collision.width ||
//             sonic_collision.x + sonic_width < ring_collision.x ||
//             sonic_collision.y > ring_collision.y + ring_collision.height ||
//             sonic_collision.y + sonic_collision.height < ring_collision.y) {

//             // console.log("NO Collision Detected");
//             // sonic.css("background-color", "blue");
//             // active_ring.css("background-color", "red");

//         } else {
//             // console.log("Collision Detected");
//             // sonic.css("background-color", "black");
//             // active_ring.css("background-color", "black");

//             if (sonic_startPosX >= screen.availWidth) {
//                 if (stage_count == 3) {
//                     final_score = initial_score;
//                     $(score).text(final_score);
//                     return;
//                 }
//             }

//             initial_score = initial_score + 10;
//             $(score).text(initial_score);

//             active_ring.css("display", "none");
//             audio2.play();
//             audio2.currentTime = 0;
//         }
//     }
// }

/* ------------------------------------------Play Game (KeyEvents) - 1st Attempt-------------------------------------------------------------------------------------*/

// function moveLeft() {
//     sonic_startPosX = sonic[0].offsetLeft;

//     if (sonic_startPosX <= 90) {
//         avoidMove_atLeftEdge();
//     }

//     sonic.finish().animate({
//         left: "-=10"
//     });
// }

/*----------------------------------------------- */

// function moveUp() {
//     sonic_startPosY = sonic[0].offsetTop;

//     if (sonic_startPosY <= 91) {
//         avoidMove_atTopEdge();
//     }

//     sonic.finish().animate({
//         top: "40%"
//     });

//     // sonic.css("top", sonic_startPosY - 10);
// }

/*----------------------------------------------- */

// function moveRight() {
//     sonic_startPosX = sonic[0].offsetLeft;

//     // console.log(keys);

//     // if (keys["ArrowRight"] && keys["ArrowUp"]) {
//     //     console.log(2222222222222222222);
//     // }

//     // if (sonic_startPosX >= 1410) {
//     if (sonic_startPosX >= screen.availWidth) {
//         change_Stage();
//         moveTo_InitialPosition();
//     }

//     sonic.finish().animate({
//         left: "+=10"
//     });
// }

/*----------------------------------------------- */

// function playGame() {
//     clearInterval(timerId);

//     $(document).on({
//         keydown: function (e) {

//             // console.log(e);
//             // console.log(e.which);
//             // console.log(e.key);

//             // keys[e.which] = e.type == 'keydown';
//             keys[e.key] = true;

//             switch (e.which) {

//                 case 37: // left
//                     move_state = false;
//                     sonic.removeClass("animate_onBarrier");

//                     if (!jump_state) {

//                         sonic.addClass("flip-standing");
//                         isFlipped = sonic.hasClass("flip-standing");
//                         sonic.css("background-image", "url('../assets/images/sonic_walking.gif')");

//                         moveLeft();

//                     } else { // up + left
//                         sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
//                         moveUp_Left();
//                     }

//                     break;

//                 case 38: // up
//                     jump_state = true;
//                     sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");

//                     moveUp();
//                     break;

//                 case 39: // right
//                     move_state = true;
//                     sonic.removeClass("animate_onBarrier");

//                     if (!jump_state) { // if not jumped at the moment (jump_state = false)
//                         sonic.removeClass("flip-standing");
//                         isFlipped = sonic.hasClass("flip-standing");

//                         sonic.css("background-image", "url('../assets/images/sonic_walking.gif')");
//                         moveRight();

//                     } else { // up + right
//                         sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
//                         moveUp_Right();
//                     }

//                     break;

//                 case 40: // down
//                     sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
//                     moveDown();

//                     // sonic.css("top", sonic_startPosY + 10);

//                     break;

//                 case 83: // A
//                     sonic.css("background-image", "url('../assets/images/sonic_running.gif')");
//                     if (isFlipped) { // if turn back
//                         boost_Left();

//                     } else {
//                         boost_Right();
//                     }
//                     break;

//                 case 32: // space bar --> to jump at same position
//                     sonic.css("background-image", "url('../assets/images/sonic_spinning.gif')");
//                     jump_OnSpaceBar();
//                     break;

//                 default:
//                     break;
//             }

//             check_ring_collision();
//             // check_jumpPad_collision();

//             switch (stage_count) {
//                 case 1:
//                     check_barrier_collision();
//                     break;

//                 case 3:
//                     check_barrier_collision();
//                     break;

//                 default:
//                     break;
//             }
//         },

//         keyup: function (e) {

//             if (e.which == 38 || e.which == 32 || e.which == 39 || e.which == 37) { // when up key is released prevent from going down from the ground level
//                 // if (e.which == 38 || e.which == 32) { // when up key is released prevent from going down from the ground level
//                 avoidMove_belowGroundLevel();
//             }

//             sonic.css("background-image", "url('../assets/images/sonic_standing.gif')");
//             jump_state = false;
//             delete keys[e.key];
//         }
//     });
// }

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/

// function hideRings(index) {
//     ring_array[index].css("display", "none");
// }

// function remove_altRing_class() {
//     for (let i in ring_array) {
//         ring_array[i].removeClass(".alt_ring");
//     }
// }