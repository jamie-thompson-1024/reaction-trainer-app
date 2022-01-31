import { Game } from "./Game";
import ColorChange from "./ColorChangeGame";
import OrbChaseGame from "./OrbChaseGame";

const games : Game[] = [
    new ColorChange(),
    new OrbChaseGame()
];

export default games;
