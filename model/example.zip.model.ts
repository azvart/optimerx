import mongoose, { Document, Schema, Model } from "mongoose";

interface IZip {
  zip: string;
  lat: string;
  lng: string;
  city: string;
  state_id: string;
  state_name: string;
  zcta: string;
  population: string;
  density: string;
  county_fips: string;
  county_name: string;
  county_weights: {};
  county_names_all: string;
  county_fips_all: string;
  imprecise: string;
  military: string;
  timezone: string;
}

interface IZipDocument extends IZip, Document {}
interface IZipModel extends Model<IZipDocument> {
  findByZip: (zip: string) => Promise<IZipDocument>;
  findAll: () => Promise<IZipDocument>;
}

const ZipSchema: Schema = new Schema(
  {
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
  },
  { versionKey: false }
);

ZipSchema.statics.findByZip = async function (zip: string) {
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
const Zip = mongoose.model<IZipDocument, IZipModel>("zipcodes", ZipSchema);
export default Zip;
