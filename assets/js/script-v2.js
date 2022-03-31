// console.log(1);
var context, arrow_key, character, loop;
// context = document.querySelector("canvas").getContext("2d");
context = $("canvas").get(0).getContext('2d');

context.canvas.height = 180;
context.canvas.width = 320;

character = {
    height: 32,
    width: 32,
    jumping: true,
    x: 144, // center of the canvas
    x_vel: 0,
    y: 0,
    y_vel: 0
}

arrow_key = {
    left: false,
    right: false,
    up: false,

    onPress: function (e) {
        // console.log(2);
        var key_state = (e.type == "keydown") ? true : false;

        switch (e.which) {
            case 37: // left key
                arrow_key.left = key_state;
                break;

            case 38: // up key
                arrow_key.up = key_state;
                break;

            case 39: // right key
                arrow_key.right = key_state;
                break;

            default:
                break;
        }
    }
}

loop = function () {

    // console.log(3);

    if (arrow_key.up && character.jumping == false) {
        // console.log(4);
        character.jumping = true;
        character.y_vel -= 30;
    }

    if (arrow_key.left) {
        character.x_vel -= 0.3;
        // character.x_vel -= 1.5;
    }

    if (arrow_key.right) {
        character.x_vel += 0.5;
    }

    character.y_vel += 1.5; // gravity
    character.x += character.x_vel;
    character.y += character.y_vel;

    character.x_vel *= 0.9; // friction
    character.y_vel *= 0.9; // friction


    // if character is falling below floor level
    if (character.y > 180 - 16 - 32) {
        character.jumping = false;
        character.y = 180 - 16 - 32;
        character.y_vel = 0;
    }

    // if character is going off the left of the screen
    // if (character.x < -32) {
    if (character.x < 0) {
        // character.x = 320;
        character.x = 0;

    } else if (character.x > 320) { // if the character goes beyond right boundary
        character.x = -32;
        // character.x = 300;
    }

    context.beginPath();
    context.fillStyle = "#202020";
    context.fillRect(0, 0, 320, 180); // x,y,width,height

    context.beginPath();
    context.rect(character.x, character.y, character.width, character.height);
    context.fillStyle = "#ff0000";
    context.fill();
    // context.strokeStyle = "#202830";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 4;
    context.stroke();

    context.beginPath();
    context.moveTo(0, 164); //x,y
    context.lineTo(320, 164); // x,y
    context.strokeStyle = "#00ff00";
    context.lineWidth = 5;
    context.stroke();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);
};

$(window).keydown(arrow_key.onPress);
$(window).keyup(arrow_key.onPress);

// $(window).keydown(function (e) {
//     arrow_key.onPress;
// });

// $(window).keyup(function (e) {
//     arrow_key.onPress;
// });

// window.requestAnimationFrame(loop);


// window.addEventListener("keydown", arrow_key.onPress)
// window.addEventListener("keyup", arrow_key.onPress);
window.requestAnimationFrame(loop);

// window.addEventListener("", function(){});