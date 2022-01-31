import { Game, InputData } from "./Game";

class ColorChangeGame extends Game
{
    name: string = "Color Change";
    description: string = "In this exercise you must click the screen as soon as it turns red. \n The lower the score the better";
    averageScore: number = 400;
    averageScoreTouch: number = 400;
    topScore: number = localStorage["rta-" + this.name] ?? -1;

    private state: undefined | 'start' | 'playing' | 'restart';
    private changeTime: number = -1;
    private changeFrame: number = -1;
    private currentFrame: number = -1;
    private clickTime: number = -1;
    private doChange: boolean = false;
    private exitSize: number = parseFloat(getComputedStyle(document.body).fontSize) * 3;
    private score: number = -1;

    constructor()
    { super(); }
    
    override start() {
        this.state = 'start';
        this.score = -1;
    }

    override end() {
        
    }

    startGame()
    {
        this.state = 'playing';
        this.changeFrame = Math.floor(Math.random() * 500);
        this.changeTime = -1;
        this.currentFrame = 0;
        this.doChange = false;
    }

    override onClick(inputData: InputData)
    {
        switch(this.state)
        {
            case 'start':
            case 'restart':
                if(inputData.cursorPos.x < this.exitSize && inputData.cursorPos.y < this.exitSize)
                    this.exit();
                else
                    this.startGame();
                break;
            case 'playing':
                this.clickTime = performance.now();
                this.score = this.clickTime - this.changeTime;
                if(this.changeTime !== -1)
                {  
                    if(this.score < this.topScore || this.topScore === -1)
                        this.setHighScore(Math.round(this.score));
                }
                this.state = 'restart';
                break;
        }
    }

    override onKeyPress(inputData: InputData, key: string)
    {

    }
    
    override updateTick(inputData: InputData, width: number, height: number)
    {
        switch(this.state)
        {
            case 'start':
                
                break;
            case 'restart':
                
                break;
            case 'playing':
                this.currentFrame++;
                this.doChange = this.changeFrame <= this.currentFrame;
                break;
        }
    }

    override renderTick(ctx: CanvasRenderingContext2D, width: number, height: number, inputData: InputData)
    {
        switch(this.state)
        {
            case 'start':
            case 'restart':
                ctx.fillStyle = 'lime';
                ctx.fillRect(0, 0, width, height);

                // exit button black on hover
                if(inputData.cursorPos.x < this.exitSize && inputData.cursorPos.y < this.exitSize)
                    ctx.strokeStyle = 'black';
                else
                    ctx.strokeStyle = 'grey';

                // draw exit button
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(10, 10);
                ctx.lineTo( this.exitSize - 10, this.exitSize - 10);
                ctx.moveTo(this.exitSize - 10, 10);
                ctx.lineTo(10, this.exitSize - 10);
                ctx.stroke();

                // draw prompt
                ctx.fillStyle = '#333333';
                ctx.textAlign = 'center';
                ctx.font = "3em Arial";
                ctx.fillText(
                    "Click to start...",
                    width / 2, height / 2);

                // draw score
                if(this.score != -1)
                {
                    ctx.font = "2em Arial";
                    ctx.fillText(
                        `score: ${Math.round(this.score)}ms`,
                        width / 2, height / 2 + this.exitSize);
                }

                break;
            case 'playing':
                if(this.doChange)
                {
                    if(this.changeTime === -1)
                        this.changeTime = performance.now();
                    ctx.fillStyle = 'red';
                } else {
                    ctx.fillStyle = 'lime';
                }

                ctx.fillRect(0, 0, width, height);
                break;
        }
    }
}

export default ColorChangeGame;
