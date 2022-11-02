import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema.js";

const Category = model("categories", CategorySchema);

export class CategoryModel {
    async findByName(name) {
        const category = await Category.findOne({ name });
        return category;
      }
    async findAll() {
        const categories = await Category.find({});
        return categories;
      }
    async findById(categoryId) {
        const category = await Category.findOne({ _id: categoryId });
        return category;
    }
    async create(categoryInfo) {
        const createdNewCategory = await Category.create(categoryInfo);
        return createdNewCategory;
      }
    async update({ categoryId, update }) {
      const filter = { _id: categoryId };
      const option = { returnOriginal: false };
  
      const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
      console.log(updatedCategory);
      return updatedCategory;
    }
    async deleteOne(category){
      const deletecategory=await Category.deleteOne({_id: category.id});
      return deletecategory;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel };
