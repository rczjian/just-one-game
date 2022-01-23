export default function useSendMessage({ clientId, ws }) {
  const handleSetName = (name) => {
    if (!name) {
      name = "no name";
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

  return { handleSetName, handleCreate };
}
