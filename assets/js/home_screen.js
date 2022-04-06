let audio1 = new Audio();
audio1.src = "../assets/audio/TitleScreen.mp3";
audio1.play();
// audio1.loop = true;

$("#help").css("display", "none");

$("#sound-icon").click(function (e) {
    if (!audio1.paused) {
        audio1.pause();
        $("div#controller-icons>button#sound-icon").addClass("pressed");
    } else {
        audio1.play();
        $("div#controller-icons>button#sound-icon").removeClass("pressed");
    }
});

$("#btnPlay").click(function (e) {
    // $(document).load('../../index2.html');
    window.location.href = "index2.html";
});

$("#help-icon").click(function (e) {
    $("#help").css("display", "block");
    $("div#controller-icons>button#help-icon").css("pointer-events", "none");
    $("#home-bg").addClass("bg-blur");
    $("div#controller-icons>button#help-icon").addClass("pressed");
});

$("#btnClose").click(function (e) {
    $("#help").css("display", "none");
    $("div#controller-icons>button#help-icon").css("pointer-events", "auto");
    $("#home-bg").removeClass("bg-blur")
    $("div#controller-icons>button#help-icon").removeClass("pressed");
});