import {categoryModel} from './category-model.js';
import {timeZone} from '../../services/timeZone.js';

const time = timeZone();

async function categoryModelTest(){
if(!await categoryModel.findByName("chicken"))
categoryModel.create({
    name:"chicken",
    createdTime:time,
    updatedTime:time
});

if(!await categoryModel.findByName("vegetable"))
categoryModel.create({
    name:"vegetable",
    createdTime:time,
    updatedTime:time
})
if(!await categoryModel.findByName("fork"))
categoryModel.create({
    name:"fork",
    createdTime:time,
    updatedTime:time
})
if(!await categoryModel.findByName("drink"))
categoryModel.create({
    name:"drink",
    createdTime:time,
    updatedTime:time
})
if(!await categoryModel.findByName("steak"))
categoryModel.create({
    name:"steak",
    createdTime:time,
    updatedTime:time
})
if(!await categoryModel.findByName("salad"))
categoryModel.create({
    name:"salad",
    createdTime:time,
    updatedTime:time
})
if(!await categoryModel.findByName("mealkit"))
categoryModel.create({
    name:"mealkit",
    createdTime:time,
    updatedTime:time
})

return "[SampleData] : categoryModelTestData => Created";
}


export {categoryModelTest};