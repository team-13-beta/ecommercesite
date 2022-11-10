import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema.js";
import {timeZone} from '../../services/timeZone.js';
const Product = model("products", ProductSchema);

export class ProductModel {
  async findByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }
  async findById(productId) {
    const product = await Product.findOne({ productId }).populate("categoryId");
    console.log('findById')
    console.log(product);
    return product;
  }
  async findByCategory(categoryId){
    const product = await Product.find({categoryId});
    if(!product[0]) throw new Error("선택하신 카테고리에 해당하는 품목들은 없습니다.");
    return product;
  }

  
  async create(productInfo) {
    const num = await Product.find().sort({productId:-1}).limit(1);
    console.log(num.productId);
    const productId = (num[0])? num[0].productId+1 : 1 ;
    
    const time = timeZone();
    const timeInfo = {'createdTime':time,'updatedTime':time};
    const info = {productId, ...productInfo , ...timeInfo};
    const createdNewProduct = await Product.create(info);
    return createdNewProduct;
  }
  async findAll() {
    const products = await Product.find().sort({productId:1}).populate("categoryId");
    return products;
  }
 


  async update({ productId, update }) {
    const filter = { productId : productId }; 
    const option = { returnOriginal: false };
    const time = timeZone();
    const updateInfo = {...update, updatedTime:time}
    const updatedProduct = await Product.findOneAndUpdate(filter, updateInfo, option);
    console.log(updatedProduct);
    return updatedProduct;
  }

  async deleteOne(product){
    const deleteproduct=await Product.deleteOne({name: product.name});
    return deleteproduct;
  }
}

const productModel = new ProductModel();

export { productModel };
