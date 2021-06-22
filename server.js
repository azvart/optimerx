"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const controllers_1 = __importDefault(require("./controllers/controllers"));
const server = new app_1.default([new controllers_1.default()], 8080);
server.listen();
