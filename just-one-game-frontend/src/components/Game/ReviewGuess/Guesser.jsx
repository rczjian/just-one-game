export default function Guesser({ game, clientId, gameHandlers }) {
  return game.stage === "review" ? (
    <div>Waiting for the other players to compare their hints...</div>
  ) : (
    <div>guess stage; display hints + input guess</div>
  );
}
