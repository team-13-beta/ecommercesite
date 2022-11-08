import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema.js";
import { timeZone } from "../../services/timeZone.js";

const User = model("users", UserSchema);

export class UserModel { // 이메일 중복 검사
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(objId) {
    const user = await User.findOne({ _id: objId });
    return user;
  }

  async findByUserId(userId){
    const user = await User.findOne({userId});
    return user;
  }


 

  async create(userInfo) { 
    const num = await User.find({}).sort({userId:-1}).limit(1);
    console.log(num);
    const userId= (num[0])? num[0].userId+1: 1; 

    const time = timeZone();
    const timeInfo = {createdTime:time,updatedTime:time};
    const Info = {userId,...userInfo , ...timeInfo };
    const createdNewUser = await User.create(Info);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({}).sort({userId:1});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };
    const time = timeZone();
    const timeInfo = {createdTime:time,updatedTime:time};
    const updateInfo = {...userInfo , ...timeInfo };
    const updatedUser = await User.findOneAndUpdate(filter, updateInfo, option);
    return updatedUser;
  }

  async deleteById(userId){
    const state =  await User.deleteOne({_id:userId});
    return state; 
  }
  // "acknowledged:true, deletedcount : 1 or 0 "
}

const userModel = new UserModel();

export { userModel };
