import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    categoryId:{
      type:Number,
    },
    name:{
        type:String,
        required:true,
    },
    createdTime : { 
      type: String
    },
    updatedTime : { 
      type: String
    }
  },
  {
    collection: "categories",
    timestamps: false,
  },
);

export { CategorySchema };
