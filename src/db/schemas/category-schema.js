import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    categoryId:{
      type:String,
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
