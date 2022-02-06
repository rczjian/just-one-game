import React from "react";

export default function useWebSocket({ setConnection, handleMessage }) {
  const ws = React.useRef(null);
  const wsProtocol = process.env.REACT_APP_SECURE_WS ? "wss://" : "ws://";
  const host = process.env.REACT_APP_BACKEND_HOST || "192.168.1.75:8080";

  React.useEffect(() => {
    ws.current = new WebSocket(`${wsProtocol}${host}`);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => {
      console.log("ws closed");
      setConnection((prevState) => {
        return { ...prevState, ws: "CLOSED" };
      });
    };
    return () => ws.current.close();
  }, []);

  React.useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (message) => {
      const res = JSON.parse(message.data);
      console.log("message from server", res);
      handleMessage(res);
    };
  }, []);
  return { ws };
}
