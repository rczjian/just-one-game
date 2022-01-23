import React from "react";

export default function useWebSocket(handleMessage) {
  const ws = React.useRef(null);

  React.useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8081");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    return () => ws.current.close();
  }, []);

  React.useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      console.log("response from server", res);
      handleMessage(res);
    };
  }, []);
  return { ws };
}
