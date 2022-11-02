import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:Schema.Types.Mixed,
    },
    company:{
        type:String,
        required:true,
    },
    categoryId:{
      type: Schema.Types.ObjectId,
      requried: true,
      ref: 'categories',
    }
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { ProductSchema };
