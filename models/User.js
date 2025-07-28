const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("users", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: "penulis",
  },
}, {
  timestamps: true
});

module.exports = User;
