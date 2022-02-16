
import GameListing from './GameListing';
import games from '../games/Games';

import './GameList.css';
import { useNavigate } from 'react-router-dom';

function GameList()
{
    const nav = useNavigate()

    return (
        <div className="GameList">
            <h1 className="GameList-Header">
                Reaction Time Exercises
            </h1>
            { games.map((g, i) =>
                <GameListing 
                    key={i}
                    game={g} 
                    onClick={() => { 
                        nav({ pathname: "/game", search:"?s="+g.name }) }}/>
            )}
            <button 
                className="GameList-WipeData" 
                onClick={() => { games.forEach(g => g.resetTopScore()); nav('/'); }}>
                    Wipe Scores
            </button>
        </div>
    )
}

export default GameList;
