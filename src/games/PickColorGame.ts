import { Game, InputData } from "./Game";

class PickColorGame extends Game
{
    name: string = "Color Pick";
    description: string = "In this exercise you must click the screen as soon as it turns the color listed at the top of the screen. clicking when target color not displaying will end game without score";
    averageScore: number = 800;
    averageScoreTouch: number = 500;
    topScore: number = localStorage["rta-" + this.name] ?? -1;

    private state: undefined | 'start' | 'playing' | 'restart';
    private exitSize: number = parseFloat(getComputedStyle(document.body).fontSize) * 3;
    private score: number = -1;

    private colors: string[] = [
        'Lime', 'Yellow', 'Cyan', 'Orange', 'Magenta', 'Red'
    ];
    private colorInterval: number = 0;
    private currentColor: number = 0;
    private targetColor: number = 0;
    private lastTime: number = 0;
    private colorChange: boolean = false;

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
        this.targetColor = Math.floor(Math.random() * this.colors.length);
        do
            this.currentColor = Math.floor(Math.random() * this.colors.length);
        while(this.currentColor === this.targetColor)
        this.colorInterval = Math.random() * 500 + 1000;
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
                this.score = -1;
                
                if(this.currentColor === this.targetColor)
                {
                    this.score = performance.now() - this.lastTime;
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
    
    override updateTick(inputData: InputData)
    {
        switch(this.state)
        {
            case 'start':
                
                break;
            case 'restart':
                
                break;
            case 'playing':
                if(this.lastTime + this.colorInterval < performance.now())
                {
                    this.colorChange = true;
                    this.currentColor = Math.floor(Math.random() * this.colors.length);
                    this.colorInterval = Math.random() * 500 + 1000;
                }
                break;
        }
    }

    override renderTick(ctx: CanvasRenderingContext2D, width: number, height: number, inputData: InputData)
    {
        switch(this.state)
        {
            case 'start':
            case 'restart':
                ctx.fillStyle = 'white';
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
                if(this.score !== -1)
                {
                    ctx.font = "2em Arial";
                    ctx.fillText(
                        `score: ${Math.round(this.score)}ms`,
                        width / 2, height / 2 + this.exitSize);
                }

                break;
            case 'playing':
                ctx.fillStyle = this.colors[this.currentColor];
                ctx.fillRect(0, 0, width, height);

                if(this.colorChange)
                {
                    this.colorChange = false;
                    this.lastTime = performance.now();
                }

                // draw prompt
                ctx.fillStyle = '#333333';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.font = "2em Arial";
                ctx.fillText(
                    this.colors[this.targetColor],
                    width / 2, 15);

                break;
        }
    }
}

export default PickColorGame;
