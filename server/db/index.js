import mongoose from "mongoose";

export default async (_nitroApp) => {
    try {
        mongoose.set("strictQuery", true);  // 嚴格模式
        await mongoose.connect(
            "mongodb+srv://xzgun89425:nthvfMX4h7wy2cuY@kai-nuxt3.2b0bkuq.mongodb.net/kai-test-nuxt3"
        );
        console.log("連接 MongoDB");
    } catch (e) {
        console.error("Error MongoDB =>", e);
    }
};
