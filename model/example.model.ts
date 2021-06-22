import mongoose, { Document, Schema, Model } from "mongoose";

interface IExample {
  data: [];
  price: [];
}
interface IExampleDocument extends IExample, Document {}

interface IExampleModel extends Model<IExampleDocument> {
  findByName: (pharm: string) => Promise<IExampleDocument>;
  findAllPharm: () => Promise<IExampleDocument>;
  searchPharm: () => Promise<IExampleDocument>;
}

const ExampleSchema: Schema = new Schema(
  {
    data: {
      type: Array,
    },
    price: {
      type: Array,
    },
  },
  { versionKey: false }
);

ExampleSchema.statics.findByName = async function (pharm: string) {
  // let names: any = await this.findOne({ "data.name": pharm });
  let name: any = await this.aggregate([
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
ExampleSchema.statics.searchPharm = async function (pharm: string) {
  let name: any = await this.find({}).select("data.name data.variants").lean();

  return name;
};
const Example = mongoose.model<IExampleDocument, IExampleModel>(
  "Example",
  ExampleSchema
);
export default Example;
