// var context, arrow_key, character, loop;
// context = $("canvas").get(0).getContext('2d');

// context.canvas.height = 180;
// context.canvas.width = 320;

// var gamePiece;

// function startGame() {
//     gamePiece = new Component(240, 250, 500, 0, "image", "../assets/images/sonic_standing.gif");
//     gameStage.start();
// }

// var gameStage = {
//     canvas: $("canvas").get(0).getContext('2d'),
//     start: function () {
//         this.canvas.height = 180;
//         this.canvas.width = 320;
//         this.context = $("canvas").get(0).getContext('2d');
//         setInterval(updateGameArea, 20);
//     }
// }

// function Component(width, height, x, y, comp_type, path) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.x_speed = 0;
//     this.y_speed = 0;

//     this.comp_type = comp_type;

//     if (comp_type == "image") {
//         this.image = new Image();
//         this.image.src = path;
//     }

//     this.updateStage = function () {
//         var ctx = gameStage.context;
//         if (comp_typetype == "image") {
//             ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

//         } else {
//             ctx.fillStyle = path;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }
// }


// function updateGameArea() {
//     // myGameArea.clear();
//     // myGamePiece.newPos();
//     gamePiece.updateStage();
// }



/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/


// var myGamePiece;

// function startGame() {
//     myGamePiece = new Component(250, 250, "../assets/images/sonic_standing.gif", 0, 0, "image");
//     myGameArea.start();
// }

// var myGameArea = {
//     canvas: document.createElement("canvas"),
//     start: function () {
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.frameNo = 0;
//         this.interval = setInterval(updateGameArea, 20);
//     },
//     clear: function () {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     },
//     stop: function () {
//         clearInterval(this.interval);
//     }
// }

// function Component(width, height, path, x, y, type) {
//     this.type = type;
//     if (type == "image") {
//         this.image = new Image();
//         this.image.src = path;
//     }
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.x = x;
//     this.y = y;
//     this.update = function () {
//         ctx = myGameArea.context;
//         if (type == "image") {
//             ctx.drawImage(this.image,
//                 this.x,
//                 this.y,
//                 this.width, this.height);
//         } else {
//             ctx.fillStyle = color;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }
//     this.newPos = function () {
//         this.x += this.speedX;
//         this.y += this.speedY;
//     }
// }

// function updateGameArea() {
//     // myGameArea.clear();
//     myGamePiece.newPos();
//     myGamePiece.update();
// }

// function moveup() {
//     myGamePiece.speedY = -1;
// }

// function movedown() {
//     myGamePiece.speedY = 1;
// }

// function moveleft() {
//     myGamePiece.speedX = -1;
// }

// function moveright() {
//     console.log(2);
//     myGamePiece.speedX = 1;
// }

// function clearmove() {
//     myGamePiece.speedX = 0;
//     myGamePiece.speedY = 0;
// }

// $(document).keydown(function (e) {
//     switch (e.which) {
//         case 37: // left key
//             moveleft();
//             break;

//         case 38: // up key
//             moveup();
//             break;

//         case 39: // right key
//             moveright();
//             break;

//         default:
//             break;
//     }
// });


/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/



// character = {
//     height: 32,
//     width: 32,
//     jumping: true,
//     x: 144, // center of the canvas
//     x_vel: 0,
//     y: 0,
//     y_vel: 0
// }

// arrow_key = {
//     left: false,
//     right: false,
//     up: false,

//     onPress: function (e) {
//         var key_state = (e.type == "keydown") ? true : false;

//         switch (e.which) {
//             case 37: // left key
//                 arrow_key.left = key_state;
//                 break;

//             case 38: // up key
//                 arrow_key.up = key_state;
//                 break;

//             case 39: // right key
//                 arrow_key.right = key_state;
//                 break;

//             default:
//                 break;
//         }
//     }
// }

// loop = function () {

//     if (arrow_key.up && character.jumping == false) {
//         character.jumping = true;
//         character.y_vel -= 20;
//     }

//     if (arrow_key.left) {
//         character.x_vel -= 0.5;
//     }

//     if (arrow_key.right) {
//         character.x_vel += 0.5;
//     }

//     character.y_vel += 1.5; // gravity
//     character.x += character.x_vel;
//     character.y += character.y_vel;

//     character.x_vel *= 0.9; // friction
//     character.y_vel *= 0.9; // friction


//     // if character is falling below floor level
//     if (character.y > 180 - 16 - 32) {
//         character.jumping = false;
//         character.y = 180 - 16 - 32;
//         character.y_vel = 0;
//     }

//     // if character is going off the left of the screen
//     if (character.x < 0) {
//         character.x = 0;

//     } else if (character.x > 320) { // if the character goes beyond right boundary
//         character.x = -32;
//     }

//     context.beginPath();
//     context.fillStyle = "#202020";
//     context.fillRect(0, 0, 320, 180); // x,y,width,height

//     context.beginPath();
//     context.rect(character.x, character.y, character.width, character.height);
//     context.fillStyle = "#ff0000";
//     context.fill();
//     context.strokeStyle = "#ffffff";
//     context.lineWidth = 4;
//     context.stroke();

//     context.beginPath();
//     context.moveTo(0, 164); //x,y
//     context.lineTo(320, 164); // x,y
//     context.strokeStyle = "#00ff00";
//     context.lineWidth = 5;
//     context.stroke();

//     // call update when the browser is ready to draw again
//     window.requestAnimationFrame(loop);
// };

// $(window).keydown(arrow_key.onPress);
// $(window).keyup(arrow_key.onPress);
// window.requestAnimationFrame(loop);