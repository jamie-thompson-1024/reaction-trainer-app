
interface InputData
{
    cursorPos: { x: number, y: number };
    cursorDown: boolean;
    keysDown: { [key: string]: boolean };
}

interface Game
{
    name: string;
    description: string;
    averageScore: number;
    topScore: number;

    setup();
    onClick(
        inputData: InputData);
    onKeyPress(
        inputData: InputData);
    updateTick(
        inputData: InputData);
    renderTick(
        ctx: CanvasRenderingContext2D, 
        inputData: InputData);
}

export default Game;

export {
    Game,
    InputData
};
