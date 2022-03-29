$(document).keydown(function (e) {
    // console.log(e);
    if (e.key === "ArrowRight") {
        $("#sonic").css("background-image", "url('../assets/images/sonic_walking.gif')");

    } else if (e.key === "ArrowDown") {
        $("#sonic").css("background-image", "url('../assets/images/sonic_spinning.gif')");

    } else if (e.key === "ArrowLeft") {
        $("#sonic").css("background-image", "url('../assets/images/sonic_standing.gif')");

    } else if (e.key === "ArrowUp") {
        $("#sonic").css("background-image", "url('../assets/images/sonic_running.gif')");
    }

});