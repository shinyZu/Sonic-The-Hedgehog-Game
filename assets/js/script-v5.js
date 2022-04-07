let sonic = document.querySelector('#sonic');
let ring = document.querySelector('#ring');

let sonic_startPosX;
let sonic_startPosY;

let sonic_collider;
let ring_collider;

let sonic_width = sonic.offsetWidth;
let sonic_height = sonic.offsetHeight;

let ring_width = ring.offsetWidth;
let ring_height = ring.offsetHeight;

document.addEventListener('keydown', function (e) {
    if (e.code == 'ArrowLeft') {
        sonic_startPosX = sonic.offsetLeft;
        sonic.style.left = sonic_startPosX - 15 + 'px';
    } else if (e.code == 'ArrowRight') {
        sonic_startPosX = sonic.offsetLeft;
        sonic.style.left = sonic_startPosX + 15 + 'px';
    } else if (e.code == 'ArrowUp') {
        sonic_startPosY = sonic.offsetTop;
        sonic.style.top = sonic_startPosY - 15 + 'px';
    } else if (e.code == 'ArrowDown') {
        sonic_startPosY = sonic.offsetTop;
        sonic.style.top = sonic_startPosY + 15 + 'px';
    }

    sonic_collider = {
        x: sonic.offsetLeft - sonic.scrollLeft - 165, // 1052 - 887
        y: sonic.offsetTop - sonic.scrollTop,
        width: sonic_width,
        height: sonic_height
    };

    ring_collider = {
        x: ring.offsetLeft - ring.scrollLeft,
        y: ring.offsetTop - ring.scrollTop,
        width: ring_width,
        height: ring_height
    };

    if (sonic_collider.x > ring_collider.x + ring_collider.width ||
        sonic_collider.x + sonic_collider.width < ring_collider.x ||
        sonic_collider.y > ring_collider.y + ring_collider.height ||
        sonic_collider.y + sonic_collider.height < ring_collider.y) {

        console.log("NO Collision Detected");
        // sonic.style.backgroundColor = "blue";
        // ring.style.backgroundColor = "red";
        // ring.style.visible = false;
    } else {
        console.log("Collision Detected");
        // sonic.style.backgroundColor = "black";
        // ring.style.backgroundColor = "black";
        ring.style.display = "none";
    }
})
