
import { useState } from 'react';
import './GameScreen.css';

function GameScreen()
{

    const [canvas, setCanvas] = useState<CanvasRenderingContext2D | undefined>();

    return (
        <div className="GameScreen">

        </div>
    )
}

export default GameScreen;
