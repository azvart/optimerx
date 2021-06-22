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
const ExampleSchema = new mongoose_1.Schema({
    data: {
        type: Array,
    },
    price: {
        type: Array,
    },
}, { versionKey: false });
ExampleSchema.statics.findByName = async function (pharm) {
    // let names: any = await this.findOne({ "data.name": pharm });
    let name = await this.aggregate([
        { $match: { "data.name": pharm } },
        {
            $project: {
                "data.name": 1,
                "data.variants": 1,
                "data.formulations": 1,
                "data.drugType": 1,
            },
        },
    ]);
    return name;
};
ExampleSchema.statics.findAllPharm = async function () {
    let all = await this.find({}).lean();
    return all;
};
ExampleSchema.statics.searchPharm = async function (pharm) {
    let name = await this.find({}).select("data.name data.variants").lean();
    return name;
};
const Example = mongoose_1.default.model("Example", ExampleSchema);
exports.default = Example;
