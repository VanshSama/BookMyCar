const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database Connection Successfull");
    })
    .catch((error) => {
        console.log("Error in db connection :- ", error);
        process.exit(1);
    })
}