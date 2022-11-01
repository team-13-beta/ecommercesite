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
    // userSchema 참고해보니 new Schema를 통해 객체로 구현하였는데 
    // 어느것이 나을까ㅏㅏ
    // 근데 new Schema를 해서 하는게 나을지도?
    // 규격을 맞춰서 데이터를 삽입해야하니깐
    description:{
        type:Schema.Types.Mixed,
    },
    company:{
        type:String,
        required:true,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { ProductSchema };
