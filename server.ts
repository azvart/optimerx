import App from "./app/app";
import Controllers from "./controllers/controllers";
const server = new App([new Controllers()], 8080);

server.listen();
