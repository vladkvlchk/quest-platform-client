import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL_WS, {});

    socketInstance.on("connect", () => {
      const transport = socketInstance.io.engine.transport.name;

      socketInstance.io.engine.on("upgrade", () => {
        const upgradedTransport = socketInstance.io.engine.transport.name;
      });
      console.log("Connected at: ", new Date());
    });

    // socketInstance.emit("progressUpdate", "test");

    // socketInstance.on("userProgressUpdate", (arg) => {
    //   console.log("userProgressUpdate: ", arg);
    // });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
