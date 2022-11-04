import { Schema } from "mongoose";

const basketSchema = new Schema(
  { 
    productList:{
        type:[Schema.Types.ObjectId],
        index:true,
        ref:'products'
    },
    quantity:{
        type:[Number]
    }
  },
  {
    collection: "baskets",
    timestamps: true,
  }
);

export { basketSchema };
