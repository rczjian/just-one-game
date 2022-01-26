import Start from "./Start";
import PickHint from "./PickHint";

export default function Content({ game, clientId, gameHandlers }) {
  return (
    <>
      {game.stage === "init" && (
        <Start game={game} clientId={clientId} gameHandlers={gameHandlers} />
      )}
      {(game.stage === "pick" || game.stage === "hint") && (
        <PickHint game={game} clientId={clientId} gameHandlers={gameHandlers} />
      )}
    </>
  );
}
