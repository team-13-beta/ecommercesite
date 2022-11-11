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
    },
    createdTime : { 
      type: String
    },
    updatedTime : { 
      type: String
    }
  },
  {
    collection: "baskets",
    timestamps: false,
  }
);

export { basketSchema };
