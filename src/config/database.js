const mongoose = require("mongoose");

const connectDatabase = async () => {
  const CONNECTION = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log("DB is CONNECTED", CONNECTION.connection.host);
};

module.exports = connectDatabase;
