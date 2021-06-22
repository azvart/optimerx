"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ZipSchema = new mongoose_1.Schema({
    zip: {
        type: String,
    },
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    city: {
        type: String,
    },
    state_id: {
        type: String,
    },
    state_name: {
        type: String,
    },
    zcta: {
        type: String,
    },
    population: {
        type: String,
    },
    density: {
        type: String,
    },
    county_fips: {
        type: String,
    },
    county_name: {
        type: String,
    },
    county_weigths: {
        type: Object,
    },
    county_names_all: {
        type: String,
    },
    county_fips_all: {
        type: String,
    },
    imprecise: {
        type: String,
    },
    military: {
        type: String,
    },
    timezone: {
        type: String,
    },
}, { versionKey: false });
ZipSchema.statics.findByZip = async function (zip) {
    let zips = await this.aggregate([
        {
            $match: {
                $or: [
                    { zip: { $regex: `.*${zip}.*`, $options: "i" } },
                    { city: { $regex: `.*${zip}.*`, $options: "i" } },
                ],
            },
        },
        {
            $project: {
                label: { $concat: ["$zip", " ", "$city"] },
                location: { $concat: ["$lat", ",", "$lng"] },
            },
        },
    ]);
    return zips;
};
ZipSchema.statics.findAll = async function () {
    let zips = await this.aggregate([
        {
            $project: {
                label: { $concat: ["$zip", " ", "$city"] },
                location: { $concat: ["$lat", ",", "$lng"] },
            },
        },
    ]);
    return zips;
};
const Zip = mongoose_1.default.model("zipcodes", ZipSchema);
exports.default = Zip;
