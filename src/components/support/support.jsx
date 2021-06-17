import React, { useEffect } from "react";

const __socket_connector = () => {
  const __endpoint = "ws://localhost:8000/support/";
  const __support_websocket = new WebSocket(__endpoint);
  __support_websocket.onopen = (e) => {
    console.log(e);
  };

  useEffect(() => {
    __socket_connector();
  }, []);
  return <div></div>;
};

export default support;
