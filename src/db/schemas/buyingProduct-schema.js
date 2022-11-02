import { Schema } from "mongoose";

const buyingProductSchema = new Schema(
  {
    productList:{},
    quantity:{type:Number},
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { buyingProductSchema };
