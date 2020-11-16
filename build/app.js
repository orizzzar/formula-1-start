class Car {
    constructor(name, imagePath) {
        this.distance = 0;
        Car.carsAmount += 1;
        this.name = name;
        this.image = this.loadNewImage(imagePath);
        this.xInitialPosition = 50;
        this.yPosition = 200 + (Car.carsAmount - 1) * 280;
    }
    setDistance(distance) {
        this.distance = distance;
    }
    getDistance() {
        return this.distance;
    }
    getxPosition() {
        return this.xInitialPosition + this.distance;
    }
    getyPosition() {
        return this.yPosition;
    }
    getName() {
        return this.name;
    }
    draw(ctx) {
        ctx.filter = "drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.2)";
        ctx.drawImage(this.image, this.getxPosition(), this.getyPosition());
        ctx.filter = "none;";
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
Car.carsAmount = 0;
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
            console.log(ev.keyCode + " pressed");
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_R = 82;
var GAME_STATE;
(function (GAME_STATE) {
    GAME_STATE[GAME_STATE["BEGIN"] = 0] = "BEGIN";
})(GAME_STATE || (GAME_STATE = {}));
class Game {
    constructor(canvas) {
        this.car1v = 8;
        this.car2v = 8;
        this.loop = () => {
            this.draw();
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
                this.car1.setDistance(this.car1.getDistance() + this.car1v);
                this.car1v += 1.2;
            }
            else {
                this.car1v = 0;
            }
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
                this.car2.setDistance(this.car2.getDistance() + this.car2v);
                this.car2v += 1;
            }
            else if (this.car2v >= 0) {
                this.car2v = 0;
            }
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
                this.car1.setDistance(this.car1.getDistance() - 1);
            }
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
                this.car2.setDistance(this.car2.getDistance() - 1);
            }
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboardListener = new KeyboardListener();
        this.gameState = GAME_STATE.BEGIN;
        this.titleText = "Formula one Game Cars Race Win Dice (best)";
        this.car1 = new Car("Green car", './assets/img/green-racing-car.png');
        this.car2 = new Car("Red car", './assets/img/red-racing-car.png');
        this.loop();
    }
    rollDice() {
        return this.randomNumber(1, 6);
    }
    draw() {
        this.clearCanvas();
        this.writeTextToCanvas(this.titleText, 30, this.canvas.width / 2, 60, "center", "black");
        [this.car1, this.car2].forEach((car) => {
            this.writeTextToCanvas(car.getName(), 50, this.canvas.width / 2, car.getyPosition() - 5, "center", "black");
            car.draw(this.ctx);
        });
        this.car1.draw(this.ctx);
        this.car2.draw(this.ctx);
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px monospace`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
var game;
let init = () => game = new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map