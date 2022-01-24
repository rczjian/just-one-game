export default function useSendMessage({ clientId, ws }) {
  const handleSetName = (name) => {
    if (!name) {
      name = "nameless";
    }
    const payload = {
      action: "setName",
      clientId: clientId,
      data: {
        name,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleCreate = () => {
    const payload = {
      action: "create",
      clientId: clientId,
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleJoin = (roomCode) => {
    const payload = {
      action: "join",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleNext = () => {
    console.log("ill go next!");
  };

  return { handleSetName, handleCreate, handleJoin, handleNext };
}
