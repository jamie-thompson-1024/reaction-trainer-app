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
                    <p className="GameDetails-Description" dangerouslySetInnerHTML={{__html: game.description.replaceAll('\n', '<br/>')}}></p>
                    <div className="GameDetails-Scores">
                        <p>personal best: { game.topScore === -1 ?  '~': `${game.topScore}ms`}</p>
                        <p>average score: {game.averageScore}ms</p>
                        <p>average score mobile: {game.averageScoreTouch}ms</p>
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
