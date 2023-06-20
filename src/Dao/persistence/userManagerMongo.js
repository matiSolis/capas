import userModel from "../models/user.model.js"
import CartManagerMongo from "./cartManagerMongo.js";

const cartManagerMongo = new CartManagerMongo();

export default class UserManagerMongo {
    async addUser(userData){
        const cartUser = await cartManagerMongo.createNewCart();
        const cartId = cartUser._id;
        const {firstName, lastName, email, password} = userData;
        if (!firstName || !lastName || !email || !password) {
            throw new Error("Faltan datos");
        };
        const user = {firstName, lastName, email, password, cartId};
        const result = await userModel.create(user);
        return result;
    }
}