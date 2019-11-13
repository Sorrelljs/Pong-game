import { SVG_NS, PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_GAP, PADDLE_SPEED, KEYS, BALL_RADIUS, TEXT_SIZE, MAXIMUM_POINT} from '../settings';
import Board from './Board'; 
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './score';
import Windows from "../../public/sounds/windowss.wav";

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
    this.ball2 = new Ball(BALL_RADIUS, this.width, this.height);
    this.paused = false;
    this.score1 = new Score(this.width/2 - 50 , 30, TEXT_SIZE)
    this.score2 = new Score(this.width/2 + 24 , 30, TEXT_SIZE)
    this.windows = new Audio(Windows);
    document.addEventListener("keydown", (event) => {
      if (event.key === KEYS.pause) {
        this.paddleLeft.setSpeed(PADDLE_SPEED);
        this.paddleRight.setSpeed(PADDLE_SPEED);
        this.paused = !(this.paused);
    }
    // Other code goes here...
  });

// TRYING TO GET FINISH HIM AUDIO TO PLAY ON THE LAST POINT 
/*gameWin(){
if (this.paddleLeft.getScore() >= 1 || this.paddleRight.getScore() >= 1){
  this.finishHim.Play();
} */ 
}
createWinText(svg, player){
  let gameWinText = document.createElementNS(SVG_NS, "text")
  gameWinText.setAttributeNS(null, "font-size", 50);
  gameWinText.setAttributeNS(null, "x", 80);
  gameWinText.setAttributeNS(null, "y", 120);
  gameWinText.setAttributeNS(null, "fill", "white");
  gameWinText.textContent = 'WIN GAME ' + player + ' !';
  svg.appendChild(gameWinText);
}

gameWin (svg){
  if (this.paddleLeft.getScore() === MAXIMUM_POINT){
    this.paddleLeft.resetScore();
    this.paddleRight.resetScore();
    this.paused = true; 
    this.createWinText(svg, ' P1');
    this.windows.play();
  }

  if (this.paddleRight.getScore() === MAXIMUM_POINT){
    this.paddleLeft.resetScore();
    this.paddleRight.resetScore();
    this.paused = true; 
    this.createWinText(svg, ' P2');
    this.windows.play();
  };
  
}
  


/*
    if(this paddleLeft.getScore() === MAXIMUM_POINT ){
      if  }
*/   

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
    this.score1.render(svg, this.paddleLeft.getScore());
    this.score2.render(svg, this.paddleRight.getScore());



  if(this.paddleLeft.getScore() === 3 || this.paddleRight.getScore() === 3){
    this.ball2.render(svg, this.paddleLeft,this.paddleRight);
  }






    if(this.paddleRight.getScore() === 9){
      console.log('score 9');
    }

    if(this.paddleLeft.getScore() === 9){
      console.log('score 9');
    }
     
   // if(this paddleLeft.getScore()=== 2 )
    this.gameWin(svg);
// More code goes here....

  }
}


