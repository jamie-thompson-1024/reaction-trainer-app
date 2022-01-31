
import { useCallback, useEffect, useRef, useState } from 'react';
import { Game, InputData } from '../games/Game';
import './GameScreen.css';

function GameScreen(props: { game: Game, onEnd: () => void })
{
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvas.current)
        {
            props.game.addEventListener('exit', props.onEnd);
            props.game.setup(canvas.current);
        }
        return () => {
            props.game.removeEventListener('exit', props.onEnd);
        };
    }, [props.game, props.onEnd, canvas]);

    return (
        <div className="GameScreen">
            <canvas ref={canvas} />
        </div>
    )
}

export default GameScreen;
