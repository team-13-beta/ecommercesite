import { categoryModel } from "./category-model.js";
import { timeZone } from "../../services/timeZone.js";

const time = timeZone();

async function categoryModelTest() {
  if (!(await categoryModel.findByName("chicken")))
    categoryModel.create({
      categoryId: 1,
      name: "chicken",
      createdTime: time,
      updatedTime: time,
    });

  if (!(await categoryModel.findByName("vegetable")))
    categoryModel.create({
      categoryId: 2,
      name: "vegetable",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await categoryModel.findByName("fork")))
    categoryModel.create({
      categoryId: 3,
      name: "fork",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await categoryModel.findByName("drink")))
    categoryModel.create({
      categoryId: 4,
      name: "drink",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await categoryModel.findByName("steak")))
    categoryModel.create({
      categoryId: 5,
      name: "steak",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await categoryModel.findByName("salad")))
    categoryModel.create({
      categoryId: 6,
      name: "salad",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await categoryModel.findByName("mealkit")))
    categoryModel.create({
      categoryId: 7,
      name: "mealkit",
      createdTime: time,
      updatedTime: time,
    });

  return "[SampleData] : categoryModelTestData => Created";
}

export { categoryModelTest };
