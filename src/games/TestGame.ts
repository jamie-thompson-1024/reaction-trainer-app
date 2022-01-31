import { Game, InputData } from "./Game";

class TestGame extends Game
{
    name: string = "Test Game";
    description: string = "A Game description where stuff is written about the game";
    averageScore: number = 0;

    constructor()
    {
        super();
    }
    
    override onClick(inputData: InputData)
    {
        this.exit();
    }

    override onKeyPress(inputData: InputData, key: string)
    {

    }
    
    override updateTick(inputData: InputData)
    {

    }

    override renderTick(ctx: CanvasRenderingContext2D, width: number, height: number, inputData: InputData)
    {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
    }
}

export default TestGame;
