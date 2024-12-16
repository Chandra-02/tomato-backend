import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;


// middlewares
// Allow multiple origins (including your local dev and deployed frontend URLs)
const allowedOrigins = [
  'https://tomoto-admin.vercel.app', // Old frontend URL
  'https://tomoto-admin-gmf3qpwpc-chandra-02s-projects.vercel.app', // Current deployed frontend URL
  'http://localhost:3000', // For local development
  'https://tomato-frontend-jodc.vercel.app'
];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or server-side scripts)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))