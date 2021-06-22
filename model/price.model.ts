import mongoose, { Document, Schema, Model } from "mongoose";

interface IPriceObj {
  amount: string;
  currency: string;
  display: string;
  quantity: number;
}

interface IRetailer {
  id: string;
  isBigNameRetailer: boolean;
  isFavorite: boolean;
  isMembershipRequired: boolean;
  location: ILocation;
  logo: any;
  membershipDetailsUrl: null | string;
  name: string;
}

interface ILocation {
  adressLine1: null | string;
  addressLine2: null | string;
  city: string;
  coordinates: ICoordinates;
  hours: IHours[];
  id: string;
  isFavorite: boolean;
  phoneNumber: string;
  state: string;
  zipCode: string;
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IHours {
  close: IClose;
  open: IOpen;
}
interface IOpen {
  day: string;
  time: string;
}
interface IClose {
  day: string;
  time: string;
}

export interface IPrice {
  couponId: null | string;
  isLowestPrice: boolean;
  pbmId: string;
  price: IPriceObj;
  priceLevel: string;
  retailer: IRetailer;
  formId: string;
  location: string;
  quantity: string;
  data: any;
}

interface IPriceDocument extends IPrice, Document {}

interface IPriceModel extends Model<IPriceDocument> {
  findPrice: (
    formId: string,
    location: string,
    quantity: string
  ) => Promise<IPriceDocument>;
}

const PriceSchema: Schema = new Schema(
  {
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
  },
  { versionKey: false }
);
PriceSchema.statics.findPrice = async function (
  formId: string,
  quantity: string,
  location: string
) {
  let price = await this.findOne({
    quantity: quantity,
    location: location,
    formId: formId,
  }).lean();
  return price;
};
const Price = mongoose.model<IPriceDocument, IPriceModel>("price", PriceSchema);
export default Price;
