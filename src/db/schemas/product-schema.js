import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productId:{
      type:Number,
      required:true,
    },
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
    categoryObjId:{
      type: Schema.Types.ObjectId,
      requried: true,
      ref: 'categories',
    },  
      
    categoryId:{
      type:Number,
      required:true,
    },
    categoryName:{
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
    collection: "products",
    timestamps: false,
  }
);

export { ProductSchema };

