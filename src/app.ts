/// <reference path="Car.ts" />
/// <reference path="KeyboardListener.ts" />

enum GAME_STATE {
  BEGIN,
}

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;

  // the state of the game: begin, dice and end
  private gameState: GAME_STATE;
  private winner: string;

  // Car objects
  private car1: Car;
  private car2: Car;
  private car1v: number = 8;
  private car2v: number = 8;

  // Texts
  private titleText: string;


  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.keyboardListener = new KeyboardListener();

    this.gameState = GAME_STATE.BEGIN;

    this.titleText = "Formula one Game Cars Race Win Dice (best)";

    /* Create cars */
    this.car1 = new Car("Green car", './assets/img/green-racing-car.png');
    this.car2 = new Car("Red car", './assets/img/red-racing-car.png');

    this.loop();
  }

  /**
   * Function to give a number between 1 and 6
   * @returns {number} number - number between 1 and 6
   */
  private rollDice(): number {
    return this.randomNumber(1, 6);
  }

  /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    
    this.draw();

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.car1.setDistance(this.car1.getDistance() + this.car1v);
      
      this.car1v += 1.2;
    } else {
      
      this.car1v = 0;
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
      this.car2.setDistance(this.car2.getDistance() + this.car2v);
      this.car2v += 1;
    } else if (this.car2v >= 0)  {
      this.car2v = 0;
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
      this.car1.setDistance(this.car1.getDistance() - 1 );
    }

    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
      this.car2.setDistance(this.car2.getDistance() - 1);

    } 

    requestAnimationFrame(this.loop);
  };

  /**
   * Function to draw all the cars on the canvas
   */
  private draw() {

    this.clearCanvas();

    this.writeTextToCanvas(
      this.titleText, 
      30, 
      this.canvas.width / 2,
      60,
      "center",
      "black"
      );


    [this.car1, this.car2].forEach( (car) => {

      this.writeTextToCanvas(
        car.getName(), 
        50, 
        this.canvas.width / 2,
        car.getyPosition() - 5,
        "center",
        "black"
        );
      car.draw(this.ctx);

    });


    this.car1.draw(this.ctx);
    this.car2.draw(this.ctx);
    
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px monospace`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
  /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
var game;
let init = () =>
  game = new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
