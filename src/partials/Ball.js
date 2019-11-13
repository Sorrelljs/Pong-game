import { SVG_NS } from "../settings";
import PingSound from '../../public/sounds/ahem_x.wav';
import PingOut from '../../public/sounds/boo.wav';
/* import PingMusic from '../../public/sounds/ufo_x.wav'; */
import finishHim from "../../public/sounds/Finish_Him.mp3";
import windows from "../../public/sounds/windows.mp3";

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {

        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.ping = new Audio(PingSound);
        this.pingOut = new Audio(PingOut);
        this.finishHim = new Audio(finishHim);
        this.windows = new Audio(windows);
        this.speed = 1;

       // this.pingMusic = new Audio(pingMusic)
        this.reset();
    }

        ballMove() {
            this.x = this.x + (this.vx * this.speed);
            this.y = this.y + (this.vy * this.speed);
        }
    
    setSpeed(speed) {
        this.speed = speed;
    }

    reset(){
    
        this.x = this.boardWidth/2;
        this.y = this.boardHeight/2;
        this.vy = 0;
        this.speed = 1;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10) - 5;
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision(paddle1, paddle2) {
        const hitTop = (this.y - this.radius <=  0); 
        const hitBottom = (this.y + this.radius >= this.boardHeight);
        const hitLeft = (this.x + this.radius < 0 );
        const hitRight = (this.x - this.radius> this.boardWidth);
        if (hitTop ||  hitBottom)  {
            this.vy = this.vy * -1;
        }
        if (hitLeft) {
            this.direction = 1;
           // this.pingOut.play();
            paddle2.increaseScore();
            this.reset();
        }
        if (hitRight) {
            this.direction = -1;
            paddle1.increaseScore();
            //this.pingOut.play();
            this.reset();
        }
    }

        


    paddleCollision(paddle1, paddle2) {
        let hitWall = false, checkTop = false, checkBottom = false;
        this.setSpeed(this.speed += 0.001);
        if (this.vx > 0) {
            
            const p2Walls = paddle2.getCoordinates();
             hitWall = (this.x + this.radius >= p2Walls.left);
             checkTop = (this.y - this.radius >= p2Walls.top);
             checkBottom = (this.y + this.radius <= p2Walls.bottom);
        
        } else {

            const p1Walls = paddle1.getCoordinates();
            hitWall = (this.x - this.radius <= p1Walls.right);
            checkTop = (this.y - this.radius >= p1Walls.top);
            checkBottom = (this.y + this.radius <= p1Walls.bottom);
          
        }

            if (hitWall && checkTop && checkBottom) {
                this.vx = this.vx * - 1;
                this.ping.play();
                
                 }
        
    }
  


  render(svg, paddle1, paddle2) {
      let ball = document.createElementNS(SVG_NS, "circle");
      ball.setAttributeNS(null, "r", this.radius);
      ball.setAttributeNS(null, "cx", this.x);
      ball.setAttributeNS(null, "cy", this.y);
      ball.setAttributeNS(null, "fill", "white");
      svg.appendChild(ball);
      this.ballMove();
      this.wallCollision(paddle1, paddle2);
      this.paddleCollision(paddle1, paddle2);
    }

}