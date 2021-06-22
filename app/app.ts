import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Token from "../middleware/accessToken";
class App {
  private app: Application;
  private port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
    this.middleware();
    this.connectedToDb();
    this.controller(controllers);
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }
  private controller(controllers: []) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  private connectedToDb() {
    mongoose
      .connect(`mongodb://localhost:27017/Example`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`Connected to DB successfull`);
      });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App running on port: ${this.port}`);
    });
  }
}

export default App;
