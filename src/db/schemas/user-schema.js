import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userId:{
      type:Number,
      required:true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
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
    role: { // authority : user || admin
      type: String,
      default: "user",
    },
    access:{
      type:String,
      default:"general" 
    },
    createdTime : { 
      type: String
    },
    updatedTime : { 
      type: String
    }
  },
  {
    collection: "users",
    timestamps: false,
  }
);

export { UserSchema };

