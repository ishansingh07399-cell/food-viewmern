const express = require('express');
const foodController = require("../controllers/food");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

/* POST /api/food/ [food partner protected] */
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFood);

/* GET /api/food [user protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

/* GET /api/food/saved [user protected] */
router.get("/saved", authMiddleware.authUserMiddleware, foodController.getSavedItems);

/* POST /api/food/:id/like [user protected] */
router.post("/:id/like", authMiddleware.authUserMiddleware, foodController.toggleLike);

/* POST /api/food/:id/save [user protected] */
router.post("/:id/save", authMiddleware.authUserMiddleware, foodController.toggleSave);

module.exports = router;