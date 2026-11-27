import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import httpError from "./middleware/httpError.js"
import authRoutes from "./routes/authRouter.js"

dotenv.config({path:"./.env"});
const app = express();

app.set("view engine","ejs")
app.use(express.json());
app.use("/auth",authRoutes)

app.get("/",(req,res)=>{

    res.render("home")

})

app.use((req, res, next) => {
    return next(new httpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res
        .status(error.statusCode || 500)
        .json({ message: error.message || "internal server error" });
});

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        const connect = await connectDB();

        if (!connect) {
            throw new Error("failed to connect db");
        }
        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message);
            }

            console.log(`server running port ${port}`);
        });
    } catch (error) {
        console.log(error.message);

        process.exit(1);
    }
}


startServer();
