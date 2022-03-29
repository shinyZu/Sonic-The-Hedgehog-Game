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