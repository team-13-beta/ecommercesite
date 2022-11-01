import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema.js";

const Product = model("products", ProductSchema);

export class ProductModel {
  async findByName(name) {
    const product = await Product.findOne({ name });
    return product;
  }
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }
  async findAll() {
    const products = await Product.find({});
    return products;
  }


  async update({ productId, update }) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
    console.log(updatedProduct);
    return updatedProduct;
  }

  async deleteOne(productName){
    const deleteproduct=await Product.deleteOne({productName});
    return deleteproduct;
  }
}

const productModel = new ProductModel();

export { productModel };
