const express = require('express');
const foodPartnerController = require("../controllers/food-partner");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

/* GET /api/food-partner/profile [protected - food partner only] */
router.get(
    "/profile",
    authMiddleware.authFoodPartnerMiddleware,
    foodPartnerController.getProfile
);

module.exports = router;
