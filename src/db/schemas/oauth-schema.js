import { Schema } from "mongoose";

const OauthSchema = new Schema(
  {
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    password:{ // password -> google에서 받는 고유Id
      type:String,
      required:true
    },
    role:{
      type:String,
      default:"user"
    },
    access:{
      type:String,
      default:"oauth"
    },
    createdTime : { 
      type: String
    },
    updatedTime : { 
      type: String
    }
  },
  {
    collection: "Oauths",
    timestamps: false,
  }
);

export { OauthSchema };
