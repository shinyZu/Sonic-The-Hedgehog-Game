function stop() {
    console.log("stopped");
    $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");
}

// $(document).on({
//     keydown: function (e) {
//         if (e.key === "ArrowRight") {
//             $("#sonic").removeClass("flip-standing");
//             $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");

//             $("#sonic").finish().animate({
//                 left: "+=10"
//             });

//         }

//         if (e.key == "Control") {
//             $("#sonic").css("background-image", "url('../assets/images/sonic_running.gif')");
//         }

//         if (e.key === "ArrowUp") {
//             $("#sonic").css("background-image", "url('../assets/images/sonic_spinning.gif')");
//         }

//         if (e.key === "ArrowLeft") {
//             $("#sonic").addClass("flip-standing");
//             $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");
//         }
//     },

//     keyup: function () {
//         console.log("keyup");
//         $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");
//     }
// });

$(document).on({
    keydown: function (e) {
        // console.log(e);
        switch (e.which) {
            case 37: // left
                $("#sonic").addClass("flip-standing");
                $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");

                $("#sonic").finish().animate({
                    left: "-=10"
                });

                break;

            case 38: // up
                $("#sonic").css("background-image", "url('../assets/images/sonic_spinning.gif')");
                $("#sonic").finish().animate({
                    bottom: "+=50"
                });

                if ($("#sonic").hasClass("flip-standing")) { // if turn back
                    $("#sonic").finish().animate({
                        left: "-=20",
                    });

                } else {
                    $("#sonic").finish().animate({
                        left: "+=20"
                    });
                }

                break;

            case 39: // right
                $("#sonic").removeClass("flip-standing");
                $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");

                $("#sonic").finish().animate({
                    left: "+=10"
                });

                break;

            case 66: // B
                $("#sonic").css("background-image", "url('../assets/images/sonic_running.gif')");

                if ($("#sonic").hasClass("flip-standing")) { // if turn back
                    $("#sonic").finish().animate({
                        left: "-=50"
                    });

                } else {
                    $("#sonic").finish().animate({
                        left: "+=50"
                    });
                }
                break;

            // case 32: // space bar
            //     $("#sonic").finish().animate({
            //         bottom  : "+=50"
            //     });
            //     break;

            default:
                break;
        }
    },

    keyup: function (e) {

        if (e.which == 38) {
            $("#sonic").finish().animate({
                bottom: "190"
            });
        }
        $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");

    }
});



