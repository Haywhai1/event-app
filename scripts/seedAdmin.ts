
import bcrypt from "bcryptjs";
import User from "../models/User";
import { connectDB } from "../lib/db";

async function seedAdmin() {
  try {
    await connectDB();

    const email = "admin@example.com"; // 🔥 change later
    const password = "12345";       // 🔥 change later

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashed,
      role: "admin", // 🔥 IMPORTANT
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();