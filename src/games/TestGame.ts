import Game, { InputData } from "./Game";

class TestGame implements Game
{
    name: string = "Test Game";
    description: string = "A Game description where stuff is written about the game";
    averageScore: number = 0;;
    topScore: number = 10000;

    constructor()
    {

    }

    setup() {
        
    }

    onClick(inputData: InputData) {
        
    }

    onKeyPress(inputData: InputData) {
        
    }

    updateTick(inputData: InputData) {
        
    }

    renderTick(ctx: CanvasRenderingContext2D, inputData: InputData) {
        
    }
}

export default TestGame;
