require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const foodPartnerModel = require('./src/models/foodpartner');
const foodModel = require('./src/models/food');

// Real Food Reel Video Files (Original repo videos)
const sampleFoodItems = [
  {
    name: 'Delicious Street Food Feast 🥟',
    description: 'Hot sizzling street food prepared fresh with aromatic Indian spices!',
    video: 'http://localhost:5173/videos/1583289-hd_712_1366_20fps.mp4',
    likeCount: 245,
    saveCount: 82,
  },
  {
    name: 'Juicy Cheese Burger 🍔',
    description: 'Crispy double patty burger loaded with melted cheddar cheese & veggies.',
    video: 'http://localhost:5173/videos/3198245-hd_720_1280_50fps.mp4',
    likeCount: 412,
    saveCount: 156,
  },
  {
    name: 'Freshly Baked Pizza Slices 🍕',
    description: 'Mouthwatering cheesy pizza with crispy crust and fresh toppings.',
    video: 'http://localhost:5173/videos/3298011-hd_1080_2048_25fps.mp4',
    likeCount: 389,
    saveCount: 120,
  },
  {
    name: 'Special Spicy Curry Bowl 🍲',
    description: 'Authentic rich gravy curry cooked with fresh herbs and butter naan.',
    video: 'http://localhost:5173/videos/5900834-hd_1080_2048_25fps.mp4',
    likeCount: 530,
    saveCount: 210,
  },
  {
    name: 'Refreshing Beverage Drink 🍹',
    description: 'Chilled fruit drink garnished with mint leaves, ice cubes & lime.',
    video: 'http://localhost:5173/videos/6202680-hd_1080_1920_25fps.mp4',
    likeCount: 178,
    saveCount: 45,
  },
];

async function seedData() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-view';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    // Clear old items
    await foodModel.deleteMany({});
    console.log('🧹 Cleared old placeholder videos from DB.');

    // 1. Create or find sample Food Partner
    let partner = await foodPartnerModel.findOne({ email: 'spicejunction@example.com' });
    if (!partner) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      partner = await foodPartnerModel.create({
        name: 'Spice Junction Restaurant',
        contactName: 'Chef Ankur',
        phone: '9876543210',
        address: '123 Food Street, Bangalore',
        email: 'spicejunction@example.com',
        password: hashedPassword,
      });
      console.log('✅ Created sample Food Partner:', partner.name);
    } else {
      console.log('ℹ️ Found existing Food Partner:', partner.name);
    }

    // 2. Insert real food reels
    for (const item of sampleFoodItems) {
      await foodModel.create({
        ...item,
        foodPartner: partner._id,
      });
    }

    console.log(`✅ Successfully seeded ${sampleFoodItems.length} REAL FOOD REELS into MongoDB!`);
    console.log('🎉 Open http://localhost:5173 to view the food reels feed.');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedData();
