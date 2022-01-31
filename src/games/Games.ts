import { Game } from "./Game";
import ColorChange from "./ColorChangeGame";
import OrbChaseGame from "./OrbChaseGame";
import PickColorGame from "./PickColorGame";

const games : Game[] = [
    new ColorChange(),
    new OrbChaseGame(),
    new PickColorGame()
];

export default games;
