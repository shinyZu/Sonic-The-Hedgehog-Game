let audio1 = new Audio();
audio1.src = "../assets/audio/TitleScreen.mp3";
audio1.play();
// audio1.loop = true;

$("#sound-icon").click(function (e) {
    if (!audio1.paused) {
        audio1.pause();
    } else {
        audio1.play();
    }
});

$("#btnPlay").click(function (e) {
    // $(document).load('../../index2.html');
    window.location.href = "index2.html";
});