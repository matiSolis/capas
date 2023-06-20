import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true
    }
});
const userModel = mongoose.model(collection, schema);
export default userModel;
