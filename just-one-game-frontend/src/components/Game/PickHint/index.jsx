import Guesser from "./Guesser";
import Hinter from "./Hinter";

export default function PickHint({ game, clientId, gameHandlers }) {
  return clientId === game.guesser.clientId ? (
    <Guesser game={game} clientId={clientId} gameHandlers={gameHandlers} />
  ) : (
    <Hinter game={game} clientId={clientId} gameHandlers={gameHandlers} />
  );
}
