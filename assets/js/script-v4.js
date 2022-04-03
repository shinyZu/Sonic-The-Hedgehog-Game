let sonic = $("#sonic");
let ring = $("#ring");

let sonic_startPosX;
let sonic_startPosY;

let sonic_collider;
let ring_collider;

let sonic_width = sonic.outerWidth();
let sonic_height = sonic.outerHeight();

let ring_width = ring.outerWidth();
let ring_height = ring.outerHeight();

let css_left;
let css_top;

$(document).keydown(function (e) {
    if (e.code == "ArrowLeft") {
        sonic_startPosX = sonic[0].offsetLeft;
        sonic.css("left", sonic_startPosX - 15);

    } else if (e.code == "ArrowRight") {
        sonic_startPosX = sonic[0].offsetLeft;
        sonic.css("left", sonic_startPosX + 15);

    } else if (e.code == "ArrowUp") {
        sonic_startPosY = sonic[0].offsetTop;
        sonic.css("top", sonic_startPosY - 15);

    } else if (e.code == "ArrowDown") {
        sonic_startPosY = sonic[0].offsetTop;
        sonic.css("top", sonic_startPosY + 15);
    }

    sonic_collider = {
        x: sonic[0].offsetLeft - sonic.scrollLeft() - 135, // 571 - 706
        y: sonic[0].offsetTop - sonic.scrollTop(),
        width: sonic_width,
        height: sonic_height
    };

    ring_collider = {
        x: ring[0].offsetLeft - ring.scrollLeft(),
        y: ring[0].offsetTop - ring.scrollTop(),
        width: ring_width,
        height: ring_height
    };

    if (sonic_collider.x > ring_collider.x + ring_width ||
        sonic_collider.x + sonic_width < ring_collider.x ||
        sonic_collider.y > ring_collider.y + ring_collider.height ||
        sonic_collider.y + sonic_collider.height < ring_collider.y) {

        console.log("NO Collision Detected");

    } else {
        console.log("Collision Detected");
        ring.css("display", "none");
    }
});
