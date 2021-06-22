"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.middleware();
        this.connectedToDb();
        this.controller(controllers);
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.static('build'));
        this.app.use("/", express_1.default.static(__dirname + '/build'));
    }
    controller(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    connectedToDb() {
        mongoose_1.default
            .connect(`mongodb+srv://optimerx:3377@example.3acev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/Example`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
            .then(() => {
            console.log(`Connected to DB successfull`);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App running on port: ${this.port}`);
        });
    }
}
exports.default = App;
