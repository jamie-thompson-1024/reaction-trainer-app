
import { useState } from 'react';
import Game from '../games/Game';
import './GameScreen.css';

function GameScreen(props: { game: Game, onEnd: () => void })
{
    const [canvas, setCanvas] = useState<CanvasRenderingContext2D | undefined>();

    return (
        <div className="GameScreen">

        </div>
    )
}

export default GameScreen;
