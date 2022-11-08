import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId:{
      type:Number,
      required:true,      
    },
    userId:{
        type : Schema.Types.ObjectId,
        ref : "users"
    },
    buying_product:{
        type : [Schema.Types.Mixed],
        required:true,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
    status:{
        type:String, 
        required:true, 
        default: '주문 중'
    },
    totalPrice:{
        type:Number,
        default:0,
    },
    createdTime : { 
      type: String
    },
    updatedTime : { 
      type: String
    }
  },
  {
    collection: "orders",
    timestamps: false,
  }
);

export { OrderSchema };
