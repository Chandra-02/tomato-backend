import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import path from 'path';

const foodRouter = express.Router();

// Image Storage Engine (Saving Image to uploads folder & rename it)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure uploads folder exists
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // Rename file to avoid conflicts (use current timestamp + original file name)
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const upload = multer({ storage: storage });

// API Routes
foodRouter.get("/list", listFood);  // List all food items
foodRouter.post("/add", upload.single('image'), addFood); // Add food item
foodRouter.post("/remove", removeFood); // Remove food item

export default foodRouter;
