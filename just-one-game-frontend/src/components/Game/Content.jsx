import Start from "./Start";
import Number from "./Number";

export default function Content({ game, clientId, gameHandlers }) {
  return (
    <>
      {game.stage === "init" && (
        <Start game={game} clientId={clientId} gameHandlers={gameHandlers} />
      )}
      {game.stage === "pick" && (
        <Number game={game} clientId={clientId} gameHandlers={gameHandlers} />
      )}
    </>
  );
}
