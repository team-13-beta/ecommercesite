import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema.js";
import { timeZone } from "../../services/timeZone.js";

const Category = model("categories", CategorySchema);

export class CategoryModel {
  async findByName(categoryName) {
    const category = await Category.findOne({ name: categoryName });
    return category;
  }
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }
  async findById(Id) {
    const category = await Category.findOne({ categoryId: Id });
    return category;
  }
  async findByObjId(Id) {
    const category = await Category.findOne({ _id: Id });
    return category;
  }

  async create(categoryInfo) {
    const num2 = await Category.find().sort({ categoryId: -1 }).limit(1);
    //console.log(num2[0].categoryId);
    //const num = await Category.find()
    const categoryId = num2[0] ? num2[0].categoryId + 1 : 1;
    const time = timeZone();
    const timeInfo = { createdTime: time, updatedTime: time };
    const info = { categoryId, ...categoryInfo, ...timeInfo };
    const createdNewCategory = await Category.create(info);

    return createdNewCategory;
  }
  async update({ category, update }) {
    console.log(category, update);
    const filter = { _id: category._id };
    const option = { returnOriginal: false };
    const time = timeZone();
    const updateInfo = { ...update, updatedTime: time };
    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      updateInfo,
      option,
    );
    console.log(updatedCategory);
    return updatedCategory;
  }
  async deleteOne(category) {
    const deletecategory = await Category.deleteOne({ _id: category.id });
    return deletecategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
