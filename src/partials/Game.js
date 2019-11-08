import { SVG_NS, PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_GAP, PADDLE_SPEED, KEYS, BALL_RADIUS, TEXT_SIZE} from '../settings';
import Board from './Board'; 
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './score';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.paddleLeft = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, PADDLE_GAP, this.height/2 - PADDLE_HEIGHT/2, KEYS.p1Up, KEYS.p1Down);
    this.paddleRight = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, this.width - PADDLE_GAP - PADDLE_WIDTH, this.height/2 - PADDLE_HEIGHT/2,  KEYS.p2Up, KEYS.p2Down);
    this.ball = new Ball(BALL_RADIUS, this.width, this.height);
    this.paused = false;
    this.score1 = new Score(this.width/2 - 50 , 30, TEXT_SIZE)
    this.score2 = new Score(this.width/2 + 24 , 30, TEXT_SIZE)
    document.addEventListener("keydown", (event) => {
      if (event.key === KEYS.pause) {
        this.paddleLeft.setSpeed(PADDLE_SPEED);
        this.paddleRight.setSpeed(PADDLE_SPEED);
        this.paused = !(this.paused);
    }
    // Other code goes here...
  });
}

  render(){
    if(this.paused){
      this.paddleLeft.setSpeed(0);
      this.paddleRight.setSpeed(0);
      return; 
    }

    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.paddleLeft.render(svg);
    this.paddleRight.render(svg);
    this.ball.render(svg, this.paddleLeft,this.paddleRight);
    this.score1.render(svg, this.paddleRight.getScore());
    this.score2.render(svg, this.paddleLeft.getScore());
    
// More code goes here....




  }
}
