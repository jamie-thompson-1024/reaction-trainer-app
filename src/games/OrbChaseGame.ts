import { Game, InputData } from "./Game";

class OrbChaseGame extends Game
{
    name: string = "Orb Chase";
    description: string = "In this exercise you must click multi color orbs away as they appear on the screen. \n 10 orbs must be clicked before the game ends";
    averageScore: number = 800;
    averageScoreTouch: number = 500;

    private state: undefined | 'start' | 'playing' | 'restart';
    private exitSize: number = parseFloat(getComputedStyle(document.body).fontSize) * 3;
    private score: number = -1;
    private backgroundColor: string = 'white';

    private orbPosition: {x: number, y: number } = {x:0,y:0};
    private orbSize: number = parseFloat(getComputedStyle(document.body).fontSize) * 2;
    private spawnOrb: boolean = false;
    private orbAppearTime: number = 0;
    private orbColor: string = '';
    private times: number[] = [];

    constructor()
    { 
        super();
        this.getHighScore();
    }
    
    override start() {
        this.state = 'start';
        this.score = -1;
    }

    override end() {
        
    }

    startGame()
    {
        this.state = 'playing';
        this.spawnOrb = true;
        this.times = [];
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
                if(Math.sqrt((inputData.cursorPos.x-this.orbPosition.x)**2 + (inputData.cursorPos.y-this.orbPosition.y)**2) <= this.orbSize)
                {
                    this.spawnOrb = true;
                    this.times.push(performance.now() - this.orbAppearTime);

                    if(this.times.length === 10)
                    {
                        this.score = this.times.reduce((a, e) => a + e, 0) / this.times.length;
                        if(this.score < this.topScore || this.topScore === -1)
                            this.setHighScore(Math.round(this.score));
                        this.state = 'restart';
                    }
                }
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
                if(this.spawnOrb)
                {
                    this.orbPosition = { 
                        x: Math.random() * (width - this.orbSize * 2) + this.orbSize, 
                        y: Math.random() * (height - this.orbSize * 2) + this.orbSize };
                    
                    this.orbColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                }

                break;
        }
    }

    override renderTick(ctx: CanvasRenderingContext2D, width: number, height: number, inputData: InputData)
    {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, width, height);

        switch(this.state)
        {
            case 'start':
            case 'restart':

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
                if(this.spawnOrb)
                {
                    this.spawnOrb = false;
                    this.orbAppearTime = performance.now();
                }

                ctx.fillStyle = this.orbColor;
                ctx.beginPath();
                ctx.moveTo(this.orbPosition.x, this.orbPosition.y);
                ctx.ellipse(
                    this.orbPosition.x, this.orbPosition.y,
                    this.orbSize, this.orbSize,
                    0, 0, Math.PI * 2);
                ctx.fill();

                break;
        }
    }
}

export default OrbChaseGame;
