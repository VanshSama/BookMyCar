const express = require("express")
const app = express();
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 4000

// Routes
const userRoutes = require("./Routers/User");
const productRoutes = require('./Routers/Product');
const profileRoutes = require("./Routers/Profile");
const paymentRoutes = require("./Routers/Payment");

const cookieParser = require("cookie-parser");

const {dbConnect} = require("./Config/database");
dbConnect();

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

const {cloudinaryConnect} = require("./Config/Cloudinary");
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);


app.get("/", (req, res) => {
    return res.json({
        message: "Your server is up and running...."
    })
})

app.listen(port, () => {
    console.log(`App is successfully started at Port :- ${port}`)
})