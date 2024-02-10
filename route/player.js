const mongoose = require("mongoose");

// Connect to the MongoDB Atlas database
mongoose
  .connect(
    "mongodb+srv://rish3ha:qqkdlcVLcyjuFZk5@cluster0.t9a2fd4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const playerSchema = new mongoose.Schema({
  image:String,
  firstname: String,
  lastname: String,
  age: Number,
  team: String,
  totalMatches: Number,
});

module.exports = mongoose.model("Player", playerSchema);