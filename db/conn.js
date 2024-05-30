const mongoose = require("mongoose");

const uri = process.env.DATABASE

async function main() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

main();
