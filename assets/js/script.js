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
        console.log(e);
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

            default:
                break;
        }

        // if (e.key === "ArrowRight") {
        //     $("#sonic").removeClass("flip-standing");
        //     $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");

        //     $("#sonic").finish().animate({
        //         left: "+=10"
        //     });

        // }

        // if (e.key == "Control") {
        //     $("#sonic").css("background-image", "url('../assets/images/sonic_running.gif')");
        //     $("#sonic").finish().animate({
        //         left: "+=50"
        //     });
        // }

        // if (e.key === "ArrowUp") {
        //     $("#sonic").css("background-image", "url('../assets/images/sonic_spinning.gif')");
        // }

        // if (e.key === "ArrowLeft") {
        //     $("#sonic").addClass("flip-standing");
        //     $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");
        // }
    },

    keyup: function (e) {
        console.log("keyup");
        $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");

        // if (e.key == "Control") {
        //     $("#sonic").css("background-image", "url('../assets/images/sonic_running.gif')");
        //     $("#sonic").finish().animate({
        //         left: "+=50"
        //     });
        // }
    }
});



