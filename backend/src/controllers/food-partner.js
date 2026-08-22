const foodPartnerModel = require("../models/foodpartner");

async function getProfile(req, res) {
    try {
        // req.foodPartner is set by authFoodPartnerMiddleware
        const foodPartner = await foodPartnerModel
            .findById(req.foodPartner._id)
            .select("-password"); // don't send password

        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        return res.status(200).json(foodPartner);
    } catch (err) {
        console.error("getProfile error:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = { getProfile };
