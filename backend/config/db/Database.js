const mongoose = require("mongoose");
const { DATABASE_CLOUD } = require("../../utils/variables");
const UserModel = require("../../models/users/UserModel");

const createDefaultUsers = async () => {
  try {
    let adminUser = await UserModel.findOne({ email: "fotoidol7@gmail.com" });
    if (!adminUser) {
      adminUser = await UserModel.create({
        name: "Admin",
        email: "fotoidol7@gmail.com",
        password: "Admin@123",
        role: "admin",
        isVerified: true,
        paid: true,
      });
    }

    let sunilUser = await UserModel.findOne({ email: "sunilbk962@gmail.com" });
    if (!sunilUser) {
      sunilUser = await UserModel.create({
        name: "Sunil",
        email: "sunilbk962@gmail.com",
        password: "Sunilbk@962",
        role: "admin",
        isVerified: true,
        paid: true,
      });
    }
  } catch (error) {
    console.error("Error creating default users:", error);
  }
};

const ConnectDB = () => {
  mongoose
    .connect(DATABASE_CLOUD)
    .then(async () => {
      console.log("Database connected");
      await createDefaultUsers();
    })
    .catch((error) => {
      console.log("Database connection failed");
      console.log(error);
    });
};

module.exports = ConnectDB;
