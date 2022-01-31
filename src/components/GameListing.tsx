
import { Game } from '../games/Game';
import './GameListing.css';

function GameListing(props: { game: Game, onClick: () => void })
{
    return (
        <div className="GameListing" onClick={props.onClick}>
            <h2 className="GameListing-Header">{props.game.name}</h2>
            <div className="GameListing-Scores">
                <p>High: {props.game.topScore}</p>
                <p>|</p>
                <p>Avg: {props.game.averageScore}</p>
            </div>
        </div>
    )
}

export default GameListing;
