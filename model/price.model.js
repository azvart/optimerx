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
const PriceSchema = new mongoose_1.Schema({
    couponId: {
        type: String,
    },
    isLowestPrice: {
        type: Boolean,
    },
    pbmId: {
        type: String,
    },
    price: {
        type: Object,
    },
    priceLevel: {
        type: String,
    },
    retailer: {
        type: Object,
    },
    formId: {
        type: String,
    },
    location: {
        type: String,
    },
    quantity: {
        type: String,
    },
    data: {
        type: Array,
    },
}, { versionKey: false });
PriceSchema.statics.findPrice = async function (formId, quantity, location) {
    let price = await this.findOne({
        quantity: quantity,
        location: location,
        formId: formId,
    }).lean();
    return price;
};
const Price = mongoose_1.default.model("price", PriceSchema);
exports.default = Price;
