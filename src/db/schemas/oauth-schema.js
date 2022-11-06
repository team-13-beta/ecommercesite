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
    }
  },
  {
    collection: "Oauths",
    timestamps: true,
  }
);

export { OauthSchema };
