import React from "react";

export default function useWebSocket({ setConnection, handleMessage }) {
  const ws = React.useRef(null);

  React.useEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.75:8081");
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
      console.log("response from server", res);
      handleMessage(res);
    };
  }, []);
  return { ws };
}
