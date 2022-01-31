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

  const handleCancel = (roomCode) => {
    const payload = {
      action: "cancel",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleRestore = (roomCode) => {
    const payload = {
      action: "restore",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleAccept = (roomCode) => {
    const payload = {
      action: "accept",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleAnswer = (roomCode, answer) => {
    const payload = {
      action: "answer",
      clientId: clientId,
      data: {
        gameId: roomCode,
        answer,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleReveal = (roomCode) => {
    const payload = {
      action: "reveal",
      clientId: clientId,
      data: {
        gameId: roomCode,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  const handleEnd = (roomCode) => {
    const payload = {
      action: "end",
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
    handleCancel,
    handleRestore,
    handleAccept,
    handleAnswer,
    handleReveal,
    handleEnd,
  };
}
