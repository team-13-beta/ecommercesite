import { model } from "mongoose";
import { basketSchema } from "../schemas/basket-schema.js";


const Basket = model("baskets", basketSchema);

export class BasketModel {
    async create() {
        const createdNewBasket = await Basket.create({});
        return createdNewBasket;
      }

    
    async findById(basketId) {
        const basket = await Basket.findOne({ _id: basketId }).populate("productList");
        return basket;
    }
    async findIndex(basketId, productId){
        const basket = await Basket.findOne({ _id: basketId}).findOne({
            productList:productId,
         });
        console.log(basket);
        return basket;
    }

    async findProduct(basketId,productId) {
        const basket = await Basket.findOne({ _id: basketId}).findOne({
            productList:productId,
         });
        console.log(basket);
        return basket;
    }

    async update({ productId, basketId }) {
        const filter = { _id: basketId };
        const option = { returnOriginal: false };
    
        const updatedBasket = await Basket.findOneAndUpdate(filter, {
            $push: {
                productList : {_id : productId},
                quantity:1,
            }

        }, option);
        console.log(updatedBasket);
        return updatedBasket;
      }
    async updateQuantity({ basketId,productCountArr }) {
        const filter = { _id: basketId };
        const option = { returnOriginal: false };
        //const updatedBasket = await Basket.findOne({ _id: basketId}).update({ quantity: productIndex }, { 'quantity.$': productCount });
        const updatedBasket = await Basket.findOneAndUpdate(filter, {
            quantity:productCountArr,
        }, option);
        console.log(updatedBasket);
        return updatedBasket;
    }
}

const basketModel = new BasketModel();

export { basketModel };
