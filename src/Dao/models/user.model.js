import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:["User", "Admin"],
        default: 'User'
    }
});
const userModel = mongoose.model(collection, schema);
export default userModel;
