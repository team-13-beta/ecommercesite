import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId:{
      type : Number,
      required:true,      
    },
    userName:{
      type:String,
      required:true
    },
    userId:{
        type : Schema.Types.ObjectId,
        ref : "users"
    },
    buyingProduct:{
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
      required: true,
    },
    phoneNumber:{
      type:String,
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

