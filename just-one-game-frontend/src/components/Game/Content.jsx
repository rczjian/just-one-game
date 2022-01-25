import Start from "./Start";

export default function Content({ game, clientId, gameHandlers }) {
  return (
    <>
      <Start game={game} clientId={clientId} gameHandlers={gameHandlers} />
    </>
  );
}
