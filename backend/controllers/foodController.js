import foodModel from '../model/FoodModel.js'
import fs from 'fs'

//add food item
export const addFoodItem = async (req, res) => {
    const image_fileName = `${req.file.filename}`

    const { name, price, description, category } = req.body;
    const newFoodItem = new foodModel({ name, price, description, category, image: image_fileName });

    try {
        await newFoodItem.save();
        res.status(200).json({ success: true, message: "Food item added successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

//get all food items
export const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await foodModel.find();
        res.status(200).json({ success: true, foodItems })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

//Delete food
export const deleteFood = async (req, res) => {
    const { id } = req.params
    try {
        const food = await foodModel.findById(id)
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Food deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Unable to delete food item" })
    }
}