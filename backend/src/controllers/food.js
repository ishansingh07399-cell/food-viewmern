const foodModel = require("../models/food");
const likesModel = require("../models/likes");
const saveModel = require("../models/save");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
    try {
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "Food item created successfully",
            food: foodItem
        });
    } catch (err) {
        console.error("createFood error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({});
        return res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

async function toggleLike(req, res) {
    try {
        const userId = req.user._id;
        const foodId = req.params.id;

        const existingLike = await likesModel.findOne({ user: userId, food: foodId });

        if (existingLike) {
            // Already liked — unlike it
            await likesModel.deleteOne({ user: userId, food: foodId });
            await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
            return res.status(200).json({ message: "Unliked", liked: false });
        } else {
            // Not liked yet — like it
            await likesModel.create({ user: userId, food: foodId });
            await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
            return res.status(200).json({ message: "Liked", liked: true });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

async function toggleSave(req, res) {
    try {
        const userId = req.user._id;
        const foodId = req.params.id;

        const existingSave = await saveModel.findOne({ user: userId, food: foodId });

        if (existingSave) {
            // Already saved — unsave it
            await saveModel.deleteOne({ user: userId, food: foodId });
            await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: -1 } });
            return res.status(200).json({ message: "Unsaved", saved: false });
        } else {
            // Not saved — save it
            await saveModel.create({ user: userId, food: foodId });
            await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: 1 } });
            return res.status(200).json({ message: "Saved", saved: true });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

async function getSavedItems(req, res) {
    try {
        const userId = req.user._id;
        const savedDocs = await saveModel.find({ user: userId }).populate("food");
        const foodItems = savedDocs.map(doc => doc.food).filter(Boolean);
        return res.status(200).json(foodItems);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = {
    createFood,
    getFoodItems,
    toggleLike,
    toggleSave,
    getSavedItems,
};