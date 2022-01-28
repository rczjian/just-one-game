import Start from "./Start";
import PickHint from "./PickHint";
import ReviewGuess from "./ReviewGuess";

export default function Content({ game, clientId, gameHandlers }) {
  return (
    <>
      {game.stage === "init" && (
        <Start game={game} clientId={clientId} gameHandlers={gameHandlers} />
      )}
      {(game.stage === "pick" || game.stage === "hint") && (
        <PickHint game={game} clientId={clientId} gameHandlers={gameHandlers} />
      )}
      {(game.stage === "review" || game.stage === "guess") && (
        <ReviewGuess
          game={game}
          clientId={clientId}
          gameHandlers={gameHandlers}
        />
      )}
    </>
  );
}
