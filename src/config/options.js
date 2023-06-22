import dotenv from "dotenv";

dotenv.config();

export const options = {
    mongoDB:{
        url: process.env.MONGO_URL
    },
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION
    }
};

// export const options = {
//     mongoDB:{
//         url: "mongodb+srv://solismatiasn:sarasacoco@cluster0.2g9gvye.mongodb.net/ecommerce?retryWrites=true&w=majority"
//     },
//     server:{
//         port: 8080,
//         secretSession: "CoderSecret"
//     }
// };