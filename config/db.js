const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MDATabase_URI);
    console.log(
      `MongoDb is connect successfully at  ${mongoose.connection.host}`.white
        .bgGreen
    );
  } catch (error) {
    console.log(`Error in connecting database`.white.bgRed);
  }
};

module.exports = connectDb;
