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

  const handleNext = (roomCode) => {
    const payload = {
      action: "next",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleStart = (roomCode) => {
    const payload = {
      action: "start",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handlePick = (roomCode, num) => {
    const payload = {
      action: "pick",
      clientId: clientId,
      data: {
        gameId: roomCode,
        picked: num,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleHint = (roomCode, hint) => {
    const payload = {
      action: "hint",
      clientId: clientId,
      data: {
        gameId: roomCode,
        hint,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleReview = (roomCode) => {
    const payload = {
      action: "review",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  return {
    handleSetName,
    handleCreate,
    handleJoin,
    handleNext,
    handleStart,
    handlePick,
    handleHint,
    handleReview,
  };
}
