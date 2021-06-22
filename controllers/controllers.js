"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const example_model_1 = __importDefault(require("../model/example.model"));
const example_zip_model_1 = __importDefault(require("../model/example.zip.model"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
const price_model_1 = __importDefault(require("../model/price.model"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
class Controllers {
    constructor() {
        this.router = express_1.Router();
        this.get_name = async (req, res) => {
            const me = await example_model_1.default.findByName(req.body.pharm);
            const result = me[0].data.variants.concat({
                id: `2810001010|${me[0].data.name}`,
                name: me[0].data.name,
                drugType: me[0].data.drugType,
                urlSlug: me[0].data.name,
            });
            return res.status(200).json({
                variants: result.reverse(),
                formulations: me[0].data.formulations,
            });
        };
        this.get_all_pharm = async (req, res) => {
            const all = await fs_1.default.readFileSync("med.json", "utf-8");
            return res.status(200).json(JSON.parse(all));
        };
        this.get_all_zips = async (req, res) => {
            const all = await example_zip_model_1.default.findAll();
            return res.status(200).json(all);
        };
        this.get_current_zip = async (req, res) => {
            const current = await example_zip_model_1.default.findByZip(req.body.zip);
            return res.status(200).json(current);
        };
        this.get_price = async (req, res) => {
            const search = req.body.location !== undefined
                ? `&searchLocation=${req.body.location}`
                : "";
            const url = `https://api.perks.optum.com/api/optumperks/v1/prices?quantity=${req.body.quantity}&formulationId=${req.body.formId}${search}`;
            const price = await price_model_1.default.findPrice(req.body.formId, req.body.quantity, req.body.location);
            console.log(price);
            if (price === undefined || price === null) {
                const optumPrice = await axios_1.default({
                    method: "GET",
                    url: url,
                    headers: req.body.headers,
                });
                const newPrice = {
                    formId: req.body.formId,
                    location: req.body.location,
                    quantity: req.body.quantity,
                    ...optumPrice.data,
                };
                console.log("New Price :", newPrice);
                const dbPrice = await new price_model_1.default(newPrice).save();
                return res.status(200).json(dbPrice);
            }
            else {
                return res.status(200).json(price);
            }
        };
        this.Routes();
    }
    Routes() {
        this.router.post("/model", this.get_name);
        this.router.get("/model", this.get_all_pharm);
        this.router.get("/zips", this.get_all_zips);
        this.router.post("/zips", this.get_current_zip);
        this.router.post("/price", accessToken_1.default, this.get_price);
    }
}
exports.default = Controllers;
