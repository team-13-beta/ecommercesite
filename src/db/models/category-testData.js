import {categoryModel} from './category-model.js';

async function categoryModelTest(){
if(!await categoryModel.findByName("chicken"))
categoryModel.create({
    name:"chicken"
});

if(!await categoryModel.findByName("vegetable"))
categoryModel.create({
    name:"vegetable"
})
if(!await categoryModel.findByName("fork"))
categoryModel.create({
    name:"fork"
})
if(!await categoryModel.findByName("drink"))
categoryModel.create({
    name:"drink"
})
if(!await categoryModel.findByName("steak"))
categoryModel.create({
    name:"steak"
})
if(!await categoryModel.findByName("salad"))
categoryModel.create({
    name:"salad"
})
if(!await categoryModel.findByName("mealkit"))
categoryModel.create({
    name:"mealkit"
})

return "[SampleData] : categoryModelTestData => Created";
}


export {categoryModelTest};