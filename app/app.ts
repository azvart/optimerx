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
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(express.static("build"));
  }
  private controller(controllers: []) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }
  // `mongodb://localhost:27017/Example`
  // `mongodb+srv://optimerx:3377@example.3acev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/Example`
  private connectedToDb() {
    mongoose
      .connect(
        `mongodb+srv://optimerx:3377@example.3acev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/Example`,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      )
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
