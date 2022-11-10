import {categoryModel} from './category-model.js';
import {timeZone} from '../../services/timeZone.js';
import {categoryService} from '../../services/category-service.js';
const time = timeZone();

async function categoryModelTest(){
    if(!await categoryModel.findByName("chicken")){
        await categoryService.addCategory({
            name:"chicken"
            })
    }

    if(!await categoryModel.findByName("vegetable")){
        await categoryService.addCategory({
            name:"vegetable"
            })
    }

    if(!await categoryModel.findByName("fork")){
        await categoryService.addCategory({
            name:"fork"
            })
    }

    if(!await categoryModel.findByName("drink")){
        await categoryService.addCategory({
            name:"drink"
            }) 
    }

    if(!await categoryModel.findByName("steak")){
        await categoryService.addCategory({
            name:"steak"
            })
    }

    if(!await categoryModel.findByName("salad")){
        await categoryService.addCategory({
            name:"salad"
            })
    }

    if(!await categoryModel.findByName("mealkit")){
        await categoryService.addCategory({
            name:"mealkit"
            })
    }

return "[SampleData] : categoryModelTestData => Created";
}


export {categoryModelTest};

