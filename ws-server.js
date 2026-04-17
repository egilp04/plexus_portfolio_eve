import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 3002 });

wss.on("connection", (ws) => {
  ws.send(
    JSON.stringify({
      type: "notificacion",
      payload: "Conexión establecida",
    }),
  );
  ws.on("message", (msg) => {
    const texto = msg.toString();
    const data = JSON.parse(texto);
    ws.send(
      JSON.stringify({
        type: "chat",
        payload: data.payload,
      }),
    );
    ws.send(
      JSON.stringify({
        type: "notificacion",
        payload: "Mensaje recibido, te contestaremos lo antes posible",
      }),
    );
  });

  ws.on("close", () => {
    JSON.stringify({
      type: "notificacion",
      payload: "Conexión cerrada",
    });
  });
});
