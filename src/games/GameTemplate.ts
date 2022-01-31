import { Game, InputData } from "./Game";

class TestGame extends Game
{
    name: string = "Color Change";
    description: string = "In this exercise you must click the screen as soon as it turns red. \n The lower the score the better";
    averageScore: number = 400;
    topScore: number = localStorage["rta-" + this.name] ?? -1;

    private state: undefined | 'start' | 'playing' | 'restart';
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
                
                break;
        }
    }

    override renderTick(ctx: CanvasRenderingContext2D, width: number, height: number, inputData: InputData)
    {
        switch(this.state)
        {
            case 'start':
            case 'restart':

                break;
            case 'playing':
                
                break;
        }
    }
}

export default TestGame;
