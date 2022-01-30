import { useState } from 'react';

import GameScreen from './GameScreen';

import './GameDetails.css';
import { Link, useSearchParams } from 'react-router-dom';
import games from '../games/Games';

function GameDetails()
{
    const [gameActive, setGameActive] = useState(false);
    const gameName = useSearchParams()[0].get('s');
    const game = games.find(g => g.name === gameName);

    if(game)
    {
        if(!gameActive)
            return (
                <div className="GameDetails">
                    <Link to="/" className="GameDetails-Back">{ '<' }</Link>
                    <h1 className="GameDetails-Header">{ game.name }</h1>
                    <p className="GameDetails-Description">{ game.description }</p>
                    <div className="GameDetails-Scores">
                        <p>personal best: {game.topScore}</p>
                        <p>average score: {game.averageScore}</p>
                    </div>
                    <button 
                        className="GameDetails-Play" 
                        onClick={() => { setGameActive(true); }}>
                            Start Game
                    </button>
                </div>
            )
        else
            return (
                <GameScreen game={game} onEnd={() => { setGameActive(false); }}/>
            )
    }
    else
        return (
            <div className="GameDetails">
                <Link to="/" className="GameDetails-Back">{ '<' }</Link>
                <h1 className="GameDetails-Header">{ gameName }</h1>
                <h2 className="GameDetails-NotFound"> Game not found... </h2>
            </div>
        )
}

export default GameDetails;