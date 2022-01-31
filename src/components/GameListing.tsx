
import { Game } from '../games/Game';
import './GameListing.css';

function GameListing(props: { game: Game, onClick: () => void })
{
    return (
        <div className="GameListing" onClick={props.onClick}>
            <h2 className="GameListing-Header">{props.game.name}</h2>
            <div className="GameListing-Scores">
                <p>p Best: { props.game.topScore === -1 ?  '~': `${props.game.topScore}ms`}</p>
                <p>|</p>
                <p>Avg: {props.game.averageScore} - {props.game.averageScoreTouch}ms</p>
            </div>
        </div>
    )
}

export default GameListing;
