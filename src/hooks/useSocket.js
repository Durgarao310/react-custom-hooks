import { useState, useEffect } from "react";
import io from "socket.io-client";

function useSocket(url, options) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(url, options);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url, options]);

  return socket;
}

export default useSocket;
